import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";
import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  AWSMedia,
  CloudinaryMedia,
} from "../../../models/sbEvent/CloudinaryMedia";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import {
  createEnrolledWithTime,
  createParticipatingWith,
} from "../../../models/User/createUtils";
import { genderType } from "../../../models/User/User";

export const copyChallengeForCreator = (
  challenge: sbEventInterface,
  creatorUid: string,
  newDesc?: string,
  name?: string,
): sbEventInterface => {
  const { challengeType, ...rest } = challenge;

  const now = Date.now();
  return {
    ...rest,
    eventKey: `${name ? name : challenge.eventKey}-${Math.round(
      Math.random() * 10000,
    )}`,
    ownerUID: creatorUid,
    enrolledUserUIDs: [creatorUid],
    createdOn: now,
    updatedOn: now,
    media: [],

    // ...(newMedia ? { media: [...newMedia, ...challenge.media] } : {}),
    ...(newDesc ? { description: newDesc } : { description: "" }),
    ...(name ? { name: name } : { name: "" }),

    earnings: 0,
    views: 0,
    students: 0,
    parentId: challenge.id,
    id: uuidv4(),
  };
};

export const createBaseUserRank = (
  uid: string,
  userProgress: number,
  teamName: string,
  teamKey: string,
  teamId: string,
  userLevelV2: number,
  coachCommunityId: string,
  gender: genderType,
  name?: string,
  img?: AWSMedia | CloudinaryMedia,
): UserRank => {
  return {
    authorName: name ? name : "",
    ...(img ? { authorImg: img } : {}),
    uid: uid,
    rank: -1,
    communityRank: -1,
    coachCommunityId,
    coachEventId: teamId,
    numActivities: 0,
    prizes: [],
    fitPointsV2: 0,
    totalCalories: 0,
    progressV2: userProgress,
    updatedOn: Date.now(),
    teamName,
    teamKey,
    userLevelV2,
    gender,
  };
};

export const createBaseCoachRank = (
  uid: string,
  teamName: string,
  teamKey: string,
  teamId: string,
  name?: string,
  img?: AWSMedia | CloudinaryMedia,
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

export const saveCopiedChallenge = async (
  baseCommmunityId: string,
  challenge: sbEventInterface,
  userRank: UserRank,
  coachRank: CoachRank,
  // baseCohortId?: string
) => {
  const batch = admin.firestore().batch();

  // const batch = writeBatch(db);
  const eventRef = admin.firestore().collection("sbEvents").doc(challenge.id); // doc(db, "sbEvents", challenge.id);
  batch.set(eventRef, challenge);

  //   const postRef = eventRef.collection("postsV2").doc(post.id); // doc(eventRef, "postsV2", post.id);
  //   batch.set(postRef, post);

  if (challenge.parentId) {
    const userRef = admin
      .firestore()
      .collection("users")
      .doc(challenge.ownerUID); // doc(db, "users", challenge.ownerUID);
    batch.update(userRef, {
      teamCreateMessage: admin.firestore.FieldValue.arrayUnion(challenge.id), // team create message
      enrolledCommunities:
        admin.firestore.FieldValue.arrayUnion(baseCommmunityId),
      enrolledEvents: admin.firestore.FieldValue.arrayUnion(challenge.parentId),
      enrolledEventsWithTime: admin.firestore.FieldValue.arrayUnion(
        createEnrolledWithTime(challenge.parentId, challenge.createdOn),
      ),
      [`participatingInGameWithTeam.${challenge.parentId}`]:
        createParticipatingWith(
          challenge.id,
          challenge.ownerUID,
          challenge.createdOn,
        ),
      [`participatingWithObj.${challenge.parentId}`]: baseCommmunityId,

      // ...(baseCohortId
      //   ? { enrolledCohorts: firestore.FieldValue.arrayUnion(baseCohortId) }
      //   : {}),
    });

    // create base user and coach ranks
    if (challenge.parentId) {
      const gameRef = admin
        .firestore()
        .collection("sbEvents")
        .doc(challenge.parentId);

      const userRankRef = gameRef
        .collection("userRanks")
        .doc(`rank-${userRank.uid}`);
      batch.set(userRankRef, userRank);

      const coachRankRef = gameRef
        .collection("coachRanks")
        .doc(`rank-${userRank.uid}`);
      batch.set(coachRankRef, coachRank);
    }

    // add coach to team
    batch.update(userRef, {
      enrolledEvents: admin.firestore.FieldValue.arrayUnion(challenge.id),
      enrolledEventsWithTime: admin.firestore.FieldValue.arrayUnion(
        createEnrolledWithTime(challenge.id, challenge.createdOn),
      ),
    });
  }

  await batch.commit();
};
