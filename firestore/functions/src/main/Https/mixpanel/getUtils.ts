import * as admin from "firebase-admin";
import { getDayStartIST } from "../../PubSub/activityTracker/utils";
import { createSend } from "./createUtils";
import {
  MixPanelCohort,
  MixpanelMemberFirstore,
  NotificationStatus,
} from "./interface";
import moment = require("moment");

export const savePushSend = async (
  mixpanel_distinct_id: string,
  uid: string,
  notificationId: string,
  id: string,
) => {
  const newSend = createSend(mixpanel_distinct_id, uid, notificationId, id);

  await admin.firestore().collection("sends").doc(newSend.id).set(newSend);
};

export const updateSend = async (
  id: string,
  status: "sent" | "delivered" | "read" | "failed",
) => {
  await admin
    .firestore()
    .collection("sends")
    .doc(id)
    .set(
      {
        ...(status === "sent" ? { sent: true } : {}),
        ...(status === "delivered" ? { delivered: true } : {}),
        ...(status === "read" ? { read: true } : {}),
        ...(status === "failed" ? { failed: true } : {}),
      },
      { merge: true },
    );
};

export const getUserSendsForToday = async (mixpanel_distinct_id: string) => {
  const now = Date.now();
  const st = getDayStartIST(now);

  const docs = await admin
    .firestore()
    .collection("sends")
    .where("mixpanel_distinct_id", "==", mixpanel_distinct_id)
    // .where("sentUnix", ">=", st)
    .get();

  const notifStatusArray: NotificationStatus[] = [];
  for (const doc of docs.docs) {
    const notMessage = doc.data() as NotificationStatus;

    if (notMessage.sentUnix >= st) {
      notifStatusArray.push(notMessage);
    }
  }

  return notifStatusArray;
};

export const getCohort = async (id: string) => {
  const remoteCohort = await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(id)
    .get();

  if (remoteCohort.exists) {
    return remoteCohort.data() as MixPanelCohort;
  }

  return undefined;
};

export const getCohortMembers = async (cohortId: string) => {
  const members = await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohortId)
    .collection("members")
    .get();

  const mixpanelMembers: MixpanelMemberFirstore[] = [];
  for (const memberDoc of members.docs) {
    mixpanelMembers.push(memberDoc.data() as MixpanelMemberFirstore);
  }
  return mixpanelMembers;
};

export const getTempCohortMembers = async (cohortId: string) => {
  const members = await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohortId)
    .collection("tempMembers")
    .get();

  const mixpanelMembers: MixpanelMemberFirstore[] = [];
  for (const memberDoc of members.docs) {
    mixpanelMembers.push(memberDoc.data() as MixpanelMemberFirstore);
  }
  return mixpanelMembers;
};

export const getCohortMembersToSend = async (
  cohortId: string,
  afterTime: number,
  minOffset: number,
  maxOffset: number,
  minMSInCohort: number,
) => {
  const members = await admin
    .firestore()
    .collection("mixpanelCohorts")
    .doc(cohortId)
    .collection("members")
    .where("lastSent", "<=", afterTime)
    .get();

  const mixpanelMembers: MixpanelMemberFirstore[] = [];
  for (const memberDoc of members.docs) {
    const doc = memberDoc.data() as MixpanelMemberFirstore;
    if (
      doc.timezoneOffset &&
      doc.timezoneOffset >= minOffset &&
      doc.timezoneOffset <= maxOffset &&
      doc.lastSync <= minMSInCohort // added at least 1 hour back
    ) {
      mixpanelMembers.push(memberDoc.data() as MixpanelMemberFirstore);
    }
  }

  console.log("READ cohort members", mixpanelMembers.length);

  return mixpanelMembers;
};

/**
 * 11am - 8pm (messages to send)
 *
 * offset.
 *
 *
 */

export const getOffsetRange = (
  minHour: number,
  maxHour: number,
  unix: number,
) => {
  const offsetsArray: number[] = [];
  for (let offset = -720; offset <= 840; offset += 30) {
    const momentObj = moment(unix);
    const hourUTC = momentObj.hours();
    const hourLocal = hourUTC + offset / 60;

    if (hourLocal >= minHour && hourLocal < maxHour) {
      // console.log(offset, hourLocal);
      offsetsArray.push(offset);
    }

    // console.log("offset", offset, momentObj.hour(), momentObj.minutes());
  }

  return {
    min: offsetsArray[0],
    max: offsetsArray[offsetsArray.length - 1],
  };
};

export function getOffsetValueFromString(timezone: string): number {
  // Get the current date
  const now = new Date();

  // Convert the date to a string with the given timezone
  const dateString = now.toLocaleString("en-US", { timeZone: timezone });

  // Convert the string back to a date object
  const tzDate = new Date(dateString);

  // Get the offset in minutes
  const offset = (tzDate.getTime() - now.getTime()) / (60 * 1000);

  return Math.round(offset);
}
