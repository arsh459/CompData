import {
  ParticipatingWithTeamObj,
  EnrolledEventWithTime,
  UserInterface,
} from "./User";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { db } from "config/firebase";
import * as Sentry from "@sentry/browser";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { CoachRank, UserRank } from "@models/Activities/Activity";
import axios from "axios";

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

export const addGiftFlag = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), { gifter: true });
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
  socialBoat: boolean,
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
    socialBoat,
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

export const updateInvitePageId = async (uid: string, org: string) => {
  await updateDoc(doc(db, "users", uid), {
    invitedPageId: org,
  });
};

export const updateOrigin = async (
  uid: string,
  origin: string
  // coach: string
) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...(origin ? { origins: arrayUnion(origin) } : {}),
      hasOrigin: true,
      invitedPageId: origin,
    });
  } catch (error) {
    console.log("ERROR UPDATING ORIGIN");
  }
};

export const updateMotivator = async (
  uid: string,
  coach: string,
  adSource: string
) => {
  try {
    await axios({
      url: `/api/updateMotivator/add`,
      method: "POST",
      params: {
        uid,
        coach,
        adSource,
      },
    });
  } catch (error) {
    console.log("error in motivator funx", error);
  }
};

export const writeUserObj = async (
  //   firestore: firebase.default.firestore.Firestore,
  user: UserInterface,
  mergeCondition: boolean
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await setDoc(
    doc(db, "users", user.uid),
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

export const createBaseUserRank = (
  uid: string,
  userProgress: number,
  teamName: string,
  teamKey: string,
  teamId: string,
  userLevelV2: number,
  coachCommunityId: string,
  name?: string,
  img?: CloudinaryMedia | AWSMedia
): UserRank => {
  return {
    authorName: name ? name : "",
    ...(img ? { authorImg: img } : {}),
    uid,
    rank: -1,
    communityRank: -1,
    coachCommunityId,
    coachEventId: teamId,
    eventId: teamId,
    numActivities: 0,
    prizes: [],
    fitPointsV2: 0,
    totalCalories: 0,
    progressV2: userProgress,
    updatedOn: Date.now(),
    teamName,
    teamKey,
    userLevelV2,
  };
};

export const createBaseCoachRank = (
  uid: string,
  teamName: string,
  teamKey: string,
  teamId: string,
  name?: string,
  img?: AWSMedia | CloudinaryMedia
): CoachRank => {
  return {
    authorName: name ? name : "",
    ...(img ? { authorImg: img } : {}),
    uid: uid,
    rank: -1,
    coachEventId: teamId,
    prizes: [],
    totalCalories: 0,
    updatedOn: Date.now(),
    teamName,
    teamKey,
  };
};

export const updateSocialBoatUser = async (
  //   firestore: firebase.default.firestore.Firestore,
  uid: string
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await updateDoc(doc(db, "users", uid), {
    socialBoat: true,
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
  await updateDoc(doc(db, "users", uid), {
    ...(seriesId
      ? {
          enrolledCourses: arrayUnion(seriesId),
          welcomeMessagesForCourses: arrayUnion(seriesId),
        }
      : {}),
    ...(eventId
      ? {
          enrolledEvents: arrayUnion(eventId),
          enrolledEventsWithTime: arrayUnion({
            eventId: eventId,
            enrolledTime: Date.now(),
          }),
        }
      : {}),
    ...(communityId ? { enrolledCommunities: arrayUnion(communityId) } : {}),
  });
};

export const addUserToTeam = async (
  //   firestore: firebase.default.firestore.Firestore,
  uid: string,
  communityId: string,
  gameId: string,
  teamId: string,
  // eventId?: string
  // cohortId?: string
  user?: UserInterface,
  team?: EventInterface
) => {
  try {
    const now = Date.now();
    const batch = writeBatch(db);
    batch.update(doc(db, "users", uid), {
      enrolledCommunities: arrayUnion(communityId),
      enrolledEvents: arrayUnion(teamId),
      enrolledEventsWithTime: arrayUnion({
        eventId: teamId,
        enrolledTime: now,
      }),
      [`participatingInGameWithTeam.${gameId}`]: createParticipatingWith(
        teamId,
        communityId,
        now
      ),
      [`participatingWithObj.${gameId}`]: communityId,
      welcomeMessagesForEvents: arrayUnion(teamId),
    });

    // if (eventId) {
    batch.update(doc(db, "sbEvents", teamId), {
      enrolledUserUIDs: arrayUnion(uid),
      updatedOn: Date.now(),
    });

    if (user && team && team.parentId) {
      const userRank = createBaseUserRank(
        user.uid,
        user.progressV2 ? user.progressV2 : 0,
        team.name,
        team.eventKey ? team.eventKey : "",
        team.id,
        user.userLevelV2 ? user.userLevelV2 : 0,
        team.ownerUID,
        user.name,
        user.profileImage
      );

      // add base rank

      const eventRef = doc(db, "sbEvents", team?.parentId);
      const rankRef = doc(eventRef, "userRanks", `rank-${userRank.uid}`);
      batch.set(rankRef, userRank);
    }
    await batch.commit();
  } catch (error) {
    console.log("error", error);
    Sentry.captureException(error);
  }
};

export const getTeam = async (id: string) => {
  const eventRef = doc(db, "sbEvents", id); // firestore().collection("sbEvents").doc(id);

  const team = await getDoc(eventRef);
  if (team.data()) {
    return team.data() as EventInterface;
  }

  return undefined;
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
  socialBoat: boolean,
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
    ...(socialBoat ? { socialBoat: socialBoat } : {}),
  };
};

export const updateUserObjOnAuth = async (
  uid: string,
  os: "android" | "ios" | "windows" | "macos" | "web",
  socialBoat: boolean,
  phone?: string,
  email?: string,
  referrerId?: string
  // eventId?: string,
  // cohortId?: string,
  // communityId?: string
) => {
  await setDoc(
    doc(db, "users", uid),
    {
      uid: uid,
      ...(os ? { os: os } : {}),
      ...(phone ? { phone: phone } : {}),
      ...(email ? { email: email } : {}),
      ...(referrerId ? { referrerId: referrerId } : {}),
      ...(socialBoat ? { socialBoat: socialBoat } : {}),
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
