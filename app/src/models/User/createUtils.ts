import {
  ParticipatingWithTeamObj,
  EnrolledEventWithTime,
  UserInterface,
  dailyWeightObj,
  dailyMoodObj,
  dailyEnergyObj,
  dailySleepObj,
} from "./User";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   writeBatch,
// } from "firebase/firestore";
// import { db } from "@config/firebase";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { boatParamsV2 } from "@modules/JoinBoatMain/hooks/useJoinBoatParamsV2";
import { createBaseUserRank } from "@models/Activity/createUtils";
import { EventInterface } from "@models/Event/Event";
import crashlytics from "@react-native-firebase/crashlytics";
import { format } from "date-fns";

export const updatePermissionDoc = (uid: string) => {
  firestore()
    .collection("users")
    .doc(uid)
    .update({
      permissionUpdate: firestore.FieldValue.increment(1),
    });
};

export const createParticipatingWith = (
  teamId: string,
  ownerUID: string,
  enrolledTime: number
): ParticipatingWithTeamObj => {
  return {
    teamId,
    ownerUID,
    enrolledTime,
  };
};

export const createEnrolledWithTime = (
  eventId: string,
  // gameId: string,
  enrolledTime: number
  // ownerUID: string
): EnrolledEventWithTime => {
  return {
    eventId,
    // gameId,
    enrolledTime,
    // ownerUID,
  };
};

export const addNewUserObj = async (
  //   firestore: firebase.default.firestore.Firestore,
  uid: string,
  os: "android" | "ios" | "windows" | "macos" | "web",
  socialboat: boolean,
  referrerId?: string,
  phone?: string,
  email?: string,
  mergeCondition?: boolean
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  const newUser = createNewUserObj(
    uid,
    os,
    socialboat,
    referrerId,
    phone,
    email
  );
  await writeUserObj(
    newUser,
    mergeCondition ? true : false
    // eventId,
    // cohortId,
    // communityId
  );
};

export const updateLastGameId = async (uid: string, lastGameId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ lastGameId: lastGameId });
};

export const writeUserObj = async (
  //   firestore: firebase.default.firestore.Firestore,
  user: UserInterface,
  mergeCondition: boolean
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await firestore()
    .collection("users")
    .doc(user.uid)
    .set(
      // doc(db, "users", user.uid),
      {
        ...user,
        // ...(eventId
        //   ? {
        //       enrolledEvents: arrayUnion(eventId),
        //       // enrolledEventsWithTime: arrayUnion({
        //       //   eventId: eventId,
        //       //   enrolledTime: Date.now(),
        //       // }),
        //     }
        //   : {}),
        // ...(cohortId ? { enrolledCohorts: arrayUnion(cohortId) } : {}),
        // ...(communityId ? { enrolledCommunities: arrayUnion(communityId) } : {}),
      },
      { merge: mergeCondition }
    );
};

export const updateSocialBoatUser = async (
  //   firestore: firebase.default.firestore.Firestore,
  uid: string
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await firestore().collection("users").doc(uid).update({
    socialboat: true,
    // ...(eventId
    //   ? {
    //       enrolledEvents: arrayUnion(eventId),
    //       // enrolledEventsWithTime: arrayUnion({
    //       //   eventId: eventId,
    //       //   enrolledTime: Date.now(),
    //       // }),
    //     }
    //   : {}),
    // ...(cohortId ? { enrolledCohorts: arrayUnion(cohortId) } : {}),
    // ...(communityId ? { enrolledCommunities: arrayUnion(communityId) } : {}),
  });
};

export const updateSocialBoatCourseUser = async (
  uid: string,
  communityId: string,
  seriesId?: string,
  eventId?: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      ...(seriesId
        ? {
            enrolledCourses: firestore.FieldValue.arrayUnion(seriesId),
            welcomeMessagesForCourses:
              firestore.FieldValue.arrayUnion(seriesId),
          }
        : {}),
      ...(eventId
        ? {
            enrolledEvents: firestore.FieldValue.arrayUnion(eventId),
            enrolledEventsWithTime: firestore.FieldValue.arrayUnion({
              eventId: eventId,
              enrolledTime: Date.now(),
            }),
          }
        : {}),
      ...(communityId
        ? { enrolledCommunities: firestore.FieldValue.arrayUnion(communityId) }
        : {}),
    });
};
export const navBeforeSubscription = (
  subscriptionStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus,
  freeGame?: boolean
): boatParamsV2 => {
  if (
    freeGame ||
    subscriptionStatus === "SUBSCRIBED" ||
    basePlanStatus === "SUBSCRIBED" ||
    basePlanStatus === "PAID_ONE"
  ) {
    return "join";
  }

  return "subscription";
};

export const addUserToTeam = async (
  //   firestore: firebase.default.firestore.Firestore,
  uid: string,
  communityId: string,
  gameId: string,
  teamId: string,
  user: UserInterface,
  team: EventInterface
  // eventId?: string
  // cohortId?: string
) => {
  try {
    const now = Date.now();
    const batch = firestore().batch(); // writeBatch(db);
    batch.update(firestore().collection("users").doc(uid), {
      enrolledCommunities: firestore.FieldValue.arrayUnion(communityId),
      enrolledEvents: firestore.FieldValue.arrayUnion(teamId),
      enrolledEventsWithTime: firestore.FieldValue.arrayUnion({
        eventId: teamId,
        enrolledTime: now,
      }),
      [`participatingInGameWithTeam.${gameId}`]: createParticipatingWith(
        teamId,
        communityId,
        now
      ),
      [`participatingWithObj.${gameId}`]: communityId,
      welcomeMessagesForEvents: firestore.FieldValue.arrayUnion(teamId),
    });

    // if (eventId) {
    batch.update(firestore().collection("sbEvents").doc(teamId), {
      enrolledUserUIDs: firestore.FieldValue.arrayUnion(uid),
      updatedOn: Date.now(),
    });

    if (team.parentId) {
      const userRank = createBaseUserRank(
        user.uid,
        user.progressV2 ? user.progressV2 : 0,
        team.name,
        team.eventKey ? team.eventKey : "",
        team.id,
        user?.userLevelV2 ? user.userLevelV2 : 0,
        team.ownerUID,
        user.name,
        user.profileImage
      );

      // add base rank
      batch.set(
        firestore()
          .collection("sbEvents")
          .doc(team.parentId)
          .collection("userRanks")
          .doc(`rank-${userRank.uid}`),
        userRank
      );
    }
    // }

    await batch.commit();
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
  }
};

// export const inviteSocialBoatCommunityUser = async (
//   //   firestore: firebase.default.firestore.Firestore,
//   uid: string,
//   communityId: string,
//   eventId?: string,
//   cohortId?: string
// ) => {
//   await updateDoc(doc(db, "users", uid), {
//     ...(eventId
//       ? {
//           enrolledEvents: arrayUnion(eventId),
//           // enrolledEventsWithTime: arrayUnion({
//           //   eventId: eventId,
//           //   enrolledTime: Date.now(),
//           // }),
//           inviteMessagesForEvents: arrayUnion(eventId),
//         }
//       : {}),
//     ...(cohortId ? { enrolledCohorts: arrayUnion(cohortId) } : {}),
//     ...(communityId ? { enrolledCommunities: arrayUnion(communityId) } : {}),
//   });
// };

export const createNewUserObj = (
  uid: string,
  os: "android" | "ios" | "macos" | "windows" | "web",
  socialboat: boolean,
  referrerId?: string,
  phone?: string,
  email?: string
): UserInterface => {
  return {
    uid: uid,
    ...(referrerId ? { referrerId: referrerId } : {}),
    ...(os ? { os: os } : {}),
    ...(phone ? { phone: phone } : {}),
    ...(email ? { email: email } : {}),
    ...(socialboat ? { socialboat: socialboat } : {}),
  };
};

export const updateUserObjOnAuth = async (
  uid: string,
  os: "android" | "ios" | "windows" | "macos" | "web",
  socialboat: boolean,
  phone?: string,
  email?: string,
  referrerId?: string
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .set(
      // doc(db, "users", uid),
      {
        uid: uid,
        ...(os ? { os: os } : {}),
        ...(phone ? { phone: phone } : {}),
        ...(email ? { email: email } : {}),
        ...(referrerId ? { referrerId: referrerId } : {}),
        ...(socialboat ? { socialboat: socialboat } : {}),
        // ...(eventId
        //   ? {
        //       enrolledEvents: arrayUnion(eventId),
        //       // enrolledEventsWithTime: arrayUnion({
        //       //   eventId: eventId,
        //       //   enrolledTime: Date.now(),
        //       // }),
        //     }
        //   : {}),
        // ...(cohortId ? { enrolledCohorts: arrayUnion(cohortId) } : {}),
        // ...(communityId ? { enrolledCommunities: arrayUnion(communityId) } : {}),
      },
      { merge: true }
    );
};

export const getUser = async (uid: string) => {
  const userDoc = await firestore().collection("users").doc(uid).get();
  if (userDoc) {
    return userDoc.data() as UserInterface;
  }

  return;
};

export const createDailyWeightObj = (weight: number): dailyWeightObj => {
  const now = Date.now();
  return {
    weight,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailyMoodObj = (mood: number): dailyMoodObj => {
  const now = Date.now();
  return {
    mood,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailyEnergyObj = (energy: number): dailyEnergyObj => {
  const now = Date.now();
  return {
    energy,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailySleepObj = (sleepHours: number): dailySleepObj => {
  const now = Date.now();
  return {
    sleepHours,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};
