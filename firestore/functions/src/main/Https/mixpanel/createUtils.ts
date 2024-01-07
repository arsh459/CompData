import { getUserById } from "../../../models/User/Methods";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import {
  getCohort,
  getCohortMembers,
  getOffsetValueFromString,
  getTempCohortMembers,
} from "./getUtils";
import {
  MixPanelCohort,
  MixpanelMember,
  MixpanelMemberFirstore,
  mixpanelPageInfo,
  MixPanelRequest,
  NotificationStatus,
} from "./interface";
import * as admin from "firebase-admin";

export const createSend = (
  mixpanel_distinct_id: string,
  uid: string,
  notificationId: string,
  id: string,
): NotificationStatus => {
  return {
    mixpanel_distinct_id,
    uid,
    sentUnix: Date.now(),
    notificationId,
    id,
  };
};

export const createCohort = (
  req: MixPanelRequest,
  now: number,
  numMembers: number,
): MixPanelCohort => {
  return {
    cohortDescription: req.parameters.mixpanel_cohort_id,
    cohortName: req.parameters.mixpanel_cohort_name,
    cohortId: req.parameters.mixpanel_cohort_id,

    numMembers: numMembers,
    lastSync: now,
  };
};

export const createMemberList = async (
  req: MixPanelRequest,
  now: number,
): Promise<MixpanelMemberFirstore[]> => {
  const firestoreMixpanelUsers: MixpanelMemberFirstore[] = [];
  for (const mixpanelMember of req.parameters.members) {
    // console.log("new member user id", mixpanelMember.user_id);
    // console.log("new member distinct id", mixpanelMember.mixpanel_distinct_id);
    const userTZ = mixpanelMember.$timezone;

    // console.log("mixpanel tz", userTZ);

    if (userTZ) {
      const tz = getUserTimezone(userTZ);
      const offset = getOffsetValueFromString(tz);

      firestoreMixpanelUsers.push({
        ...mixpanelMember,
        lastSync: now,
        lastSent: -1,
        timezoneOffset: offset,
      });
    } else {
      const user = await getUserById(
        mixpanelMember.user_id
          ? mixpanelMember.user_id
          : mixpanelMember.mixpanel_distinct_id,
      );

      // console.log("fetched user", user?.uid);

      if (user?.recommendationConfig?.timezone) {
        const tz = getUserTimezone(user.recommendationConfig.timezone.tzString);
        const offset = getOffsetValueFromString(tz);

        // console.log("db tz", tz);

        firestoreMixpanelUsers.push({
          ...mixpanelMember,
          lastSync: now,
          lastSent: -1,
          timezoneOffset: offset,
        });
      }
    }
  }

  return firestoreMixpanelUsers;
};

export const replaceMainCohort = async (cohortId: string) => {
  const updatedCohort = await getCohort(cohortId);

  console.log("updatedCohort", updatedCohort);

  if (
    updatedCohort &&
    updatedCohort.resync &&
    updatedCohort.resync.donePages.length === updatedCohort.resync.totalPages
  ) {
    await sleep(2000);
    await admin.firestore().collection("mixpanelCohorts").doc(cohortId).update({
      resync: admin.firestore.FieldValue.delete(),
    });

    console.log("removing old");

    // get temp users

    const oldCohortMembers = await getCohortMembers(cohortId);
    console.log("old members deleted", oldCohortMembers.length);
    for (const oldMember of oldCohortMembers) {
      try {
        await admin
          .firestore()
          .collection("mixpanelCohorts")
          .doc(cohortId)
          .collection("members")
          .doc(oldMember.mixpanel_distinct_id)
          .delete();
      } catch (error) {
        console.log("error deleting oldMember");

        console.log("oldMember", oldMember);
      }
    }

    const tempMembers = await getTempCohortMembers(cohortId);
    console.log("temp members added", tempMembers.length);
    for (const member of tempMembers) {
      try {
        await admin
          .firestore()
          .collection("mixpanelCohorts")
          .doc(cohortId)
          .collection("members")
          .doc(member.mixpanel_distinct_id)
          .set(member);
      } catch (error) {
        console.log("error in saveCohort");
        console.log("member", member);
      }
    }

    // update cohort details
    await admin.firestore().collection("mixpanelCohorts").doc(cohortId).update({
      numMembers: tempMembers.length,
      lastSync: Date.now(),
    });

    console.log("temp members deleted", tempMembers.length);
    for (const oldTempMember of tempMembers) {
      try {
        await admin
          .firestore()
          .collection("mixpanelCohorts")
          .doc(cohortId)
          .collection("tempMembers")
          .doc(oldTempMember.mixpanel_distinct_id)
          .delete();
      } catch (error) {
        console.log("error deleting oldTempMember");

        console.log("oldMember", oldTempMember);
      }
    }
  }
};

export const saveTempCohort = async (
  cohort: MixPanelCohort,
  members: MixpanelMemberFirstore[],
  page_info: mixpanelPageInfo,
) => {
  // const batch = admin.firestore().batch();
  console.log("base cohort saved");

  // if updating all members

  // batch.set(
  //   admin.firestore().collection("mixpanelCohorts").doc(cohort.cohortId),
  //   cohort,
  // );

  for (const member of members) {
    try {
      await admin
        .firestore()
        .collection("mixpanelCohorts")
        .doc(cohort.cohortId)
        .collection("tempMembers")
        .doc(member.mixpanel_distinct_id)
        .set(member);
    } catch (error) {
      console.log("error in saveCohort");
      console.log("member", member);
    }
  }

  console.log("members saved");

  await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohort.cohortId)
    .set(cohort, { merge: true });

  // update doc
  await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohort.cohortId)
    .update({
      [`resync.totalPages`]: page_info.total_pages,
      [`resync.donePages`]: admin.firestore.FieldValue.arrayUnion(
        page_info.page_count,
      ),
    });

  console.log("base cohort updated with pages");
};

export const updateCohort = async (
  cohortId: string,
  members: MixpanelMemberFirstore[],
  now: number,
  cohortName: string,
  cohortDescription: string,
) => {
  // const batch = admin.firestore().batch();

  try {
    await admin
      .firestore()
      .collection("mixpanelCohorts")
      .doc(cohortId)
      .update({
        lastSync: now,
        numMembers: admin.firestore.FieldValue.increment(members.length),
        cohortName: cohortName ? cohortName : "",
        cohortDescription: cohortDescription ? cohortDescription : "",
      });
  } catch (error) {
    console.log("error updating updateCohort");
    console.log("Error in updating cohort");
    console.log("now", now);
    console.log("members.length", members.length);
    console.log("cohortName", cohortName);
    console.log("cohortDescription", cohortDescription);
  }

  for (const member of members) {
    try {
      await admin
        .firestore()
        .collection("mixpanelCohorts")
        .doc(cohortId)
        .collection("members")
        .doc(member.mixpanel_distinct_id)
        .set(member);
    } catch (error) {
      console.log("error updating updateCohort");
      console.log("member", member);
    }
  }
};

export const removeMembersFromCohort = async (
  cohortId: string,
  members: MixpanelMember[],
  now: number,
  cohortName: string,
  cohortDescription: string,
) => {
  // const batch = admin.firestore().batch();
  try {
    await admin
      .firestore()
      .collection("mixpanelCohorts")
      .doc(cohortId)
      .update({
        lastSync: now,
        numMembers: admin.firestore.FieldValue.increment(-members.length),
        cohortName: cohortName ? cohortName : "",
        cohortDescription: cohortDescription ? cohortDescription : "",
      });
  } catch (error) {
    console.log("Error in updating cohort");
    console.log("now", now);
    console.log("members.length", members.length);
    console.log("cohortName", cohortName);
    console.log("cohortDescription", cohortDescription);
  }

  for (const member of members) {
    try {
      await admin
        .firestore()
        .collection("mixpanelCohorts")
        .doc(cohortId)
        .collection("members")
        .doc(member.mixpanel_distinct_id)
        .delete();
    } catch (error) {
      console.log("error");
      console.log("member", member);
    }
  }
};
