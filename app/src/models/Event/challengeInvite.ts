import { EventInterface } from "./Event";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// import { writeBatch, doc, arrayUnion } from "@firebase/firestore";
// import { db } from "@config/firebase";
import firestore from "@react-native-firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Post } from "@models/Post/Post";
import {
  createEnrolledWithTime,
  createParticipatingWith,
} from "@models/User/createUtils";
import { CoachRank, UserRank } from "@models/Activity/Activity";

export const copyChallengeForCreator = (
  challenge: EventInterface,
  creatorUid: string,
  newMedia?: (CloudinaryMedia | AWSMedia)[],
  newDesc?: string,
  name?: string
): EventInterface => {
  const { challengeType, ...rest } = challenge;

  const now = Date.now();
  return {
    ...rest,
    eventKey: `${name ? name : challenge.eventKey}-${Math.round(
      Math.random() * 10000
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

export const saveCopiedChallenge = async (
  baseCommmunityId: string,
  challenge: EventInterface,
  post: Post,
  userRank: UserRank,
  coachRank: CoachRank
  // baseCohortId?: string
) => {
  const batch = firestore().batch();

  // const batch = writeBatch(db);
  const eventRef = firestore().collection("sbEvents").doc(challenge.id); // doc(db, "sbEvents", challenge.id);
  batch.set(eventRef, challenge);

  const postRef = eventRef.collection("postsV2").doc(post.id); // doc(eventRef, "postsV2", post.id);
  batch.set(postRef, post);

  if (challenge.parentId) {
    const userRef = firestore().collection("users").doc(challenge.ownerUID); // doc(db, "users", challenge.ownerUID);
    batch.update(userRef, {
      teamCreateMessage: firestore.FieldValue.arrayUnion(challenge.id), // team create message
      enrolledCommunities: firestore.FieldValue.arrayUnion(baseCommmunityId),
      enrolledEvents: firestore.FieldValue.arrayUnion(challenge.parentId),
      enrolledEventsWithTime: firestore.FieldValue.arrayUnion(
        createEnrolledWithTime(challenge.parentId, challenge.createdOn)
      ),
      [`participatingInGameWithTeam.${challenge.parentId}`]:
        createParticipatingWith(
          challenge.id,
          challenge.ownerUID,
          challenge.createdOn
        ),
      [`participatingWithObj.${challenge.parentId}`]: baseCommmunityId,

      // ...(baseCohortId
      //   ? { enrolledCohorts: firestore.FieldValue.arrayUnion(baseCohortId) }
      //   : {}),
    });

    // create base user and coach ranks
    if (challenge.parentId) {
      const gameRef = firestore()
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
      enrolledEvents: firestore.FieldValue.arrayUnion(challenge.id),
      enrolledEventsWithTime: firestore.FieldValue.arrayUnion(
        createEnrolledWithTime(challenge.id, challenge.createdOn)
      ),
    });
  }

  await batch.commit();
};
