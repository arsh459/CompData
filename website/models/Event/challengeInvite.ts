import { EventInterface } from "./Event";
import { v4 as uuidv4 } from "uuid";
import { Post } from "@models/Posts/Post";
import { writeBatch, doc, arrayUnion } from "@firebase/firestore";
import { db } from "@config/firebase";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  createEnrolledWithTime,
  createParticipatingWith,
} from "@models/User/createUtils";
import { CoachRank, UserRank } from "@models/Activities/Activity";

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
  baseCohortId?: string
) => {
  const batch = writeBatch(db);
  const eventRef = doc(db, "sbEvents", challenge.id);
  batch.set(eventRef, challenge);

  const postRef = doc(eventRef, "postsV2", post.id);
  batch.set(postRef, post);

  if (challenge.parentId) {
    const userRef = doc(db, "users", challenge.ownerUID);
    batch.update(userRef, {
      teamCreateMessage: arrayUnion(challenge.id), // team create message
      enrolledCommunities: arrayUnion(baseCommmunityId),
      enrolledEvents: arrayUnion(challenge.parentId),
      enrolledEventsWithTime: arrayUnion(
        createEnrolledWithTime(challenge.parentId, challenge.createdOn)
      ),
      [`participatingInGameWithTeam.${challenge.parentId}`]:
        createParticipatingWith(
          challenge.id,
          challenge.ownerUID,
          challenge.createdOn
        ),
      [`participatingWithObj.${challenge.parentId}`]: baseCommmunityId,

      ...(baseCohortId ? { enrolledCohorts: arrayUnion(baseCohortId) } : {}),
    });

    // add coach to team
    batch.update(userRef, {
      enrolledEvents: arrayUnion(challenge.id),
      enrolledEventsWithTime: arrayUnion(
        createEnrolledWithTime(challenge.id, challenge.createdOn)
      ),
    });
  }

  await batch.commit();
};

export const saveCopiedChallengeV2 = async (
  baseCommmunityId: string,
  challenge: EventInterface,
  post: Post,
  userRank: UserRank,
  coachRank: CoachRank
  // baseCohortId?: string
) => {
  const batch = writeBatch(db);

  const eventRef = doc(db, "sbEvents", challenge.id);
  batch.set(eventRef, challenge);

  const postRef = doc(eventRef, "postsV2", post.id);
  batch.set(postRef, post);

  if (challenge.parentId) {
    const userRef = doc(db, "users", challenge.ownerUID);
    batch.update(userRef, {
      teamCreateMessage: arrayUnion(challenge.id), // team create message
      enrolledCommunities: arrayUnion(baseCommmunityId),
      enrolledEvents: arrayUnion(challenge.parentId),
      enrolledEventsWithTime: arrayUnion(
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
      //   ? { enrolledCohorts: arrayUnion(baseCohortId) }
      //   : {}),
    });

    // create base user and coach ranks
    if (challenge.parentId) {
      const gameRef = doc(db, "sbEvents", challenge.parentId);

      const userRankRef = doc(gameRef, "userRanks", `rank-${userRank.uid}`);
      batch.set(userRankRef, userRank);

      const coachRankRef = doc(gameRef, "coachRanks", `rank-${userRank.uid}`);
      batch.set(coachRankRef, coachRank);
    }

    // add coach to team
    batch.update(userRef, {
      enrolledEvents: arrayUnion(challenge.id),
      enrolledEventsWithTime: arrayUnion(
        createEnrolledWithTime(challenge.id, challenge.createdOn)
      ),
    });
  }

  await batch.commit();
};
