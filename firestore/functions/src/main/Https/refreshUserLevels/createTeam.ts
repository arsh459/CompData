import {
  AWSMedia,
  CloudinaryMedia,
} from "../../../models/sbEvent/CloudinaryMedia";
import {
  sbEventInterface,
  sessionTypes,
} from "../../../models/sbEvent/sbEvent";
import {
  EnrolledEventWithTime,
  genderType,
  UserInterface,
} from "../../../models/User/User";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../../../models/Post/Post";
import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import * as admin from "firebase-admin";
import { createParticipatingWith } from "../../../models/User/createUtils";

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
    gender,
  };
};

export const createEnrolledWithTime = (
  eventId: string,
  // gameId: string,
  enrolledTime: number,
  // ownerUID: string
): EnrolledEventWithTime => {
  return {
    eventId,
    // gameId,
    enrolledTime,
    // ownerUID,
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

export const createNewPost = (
  communityId: string | undefined,
  eventId: string | undefined,
  creatorId: string,
  view: "public" | "private",
  gameId: string,
  cohortId?: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia | AWSMedia,
  byAdmin?: boolean,
  score?: number,
  // sessionId?: string,
  sessionName?: string,
  initalSessionType?: sessionTypes,
  taskId?: string,
  streamId?: string,
  streamMedia?: (CloudinaryMedia | AWSMedia)[],
): Post => {
  return {
    id: uuidv4(),
    text: "",
    media: streamMedia ? streamMedia : [],
    updatedOn: Date.now(),

    // communityId,
    // eventId,
    creatorId,
    // gameId,
    ...(communityId ? { communityId: communityId } : {}),
    ...(gameId ? { gameId: gameId } : {}),
    ...(eventId ? { eventId: eventId } : {}),
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(initalSessionType ? { sessionType: initalSessionType } : {}),
    ...(creatorName ? { creatorName: creatorName } : {}),
    ...(creatorImg ? { creatorImg: creatorImg } : {}),
    ...(score ? { score: score } : { score: 0 }),
    ...(byAdmin ? { byAdmin: byAdmin } : {}),
    // ...(sessionId ? { sessionId: sessionId } : {}),
    ...(sessionName ? { sessionName: sessionName } : {}),
    view,

    ...(taskId ? { taskId: taskId } : {}),
    ...(streamId ? { streamId: streamId } : {}),
  };
};

export const copyChallengeForCreator = (
  challenge: sbEventInterface,
  creatorUid: string,
  newMedia?: (CloudinaryMedia | AWSMedia)[],
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

export const createNewTeam = async (
  eventToJoin: sbEventInterface,
  user: UserInterface,
  teamDesc: string,
  teamName: string,
  localUserName: string | undefined,
  localUserImg: CloudinaryMedia | AWSMedia | undefined,
  communityId: string,
) => {
  const toCopyEvent = copyChallengeForCreator(
    eventToJoin,
    user.uid,
    [],
    teamDesc,
    teamName,
  );

  const newPost = createNewPost(
    user.uid,
    toCopyEvent.id,
    user.uid,
    "public",
    eventToJoin.id, // gameId
    undefined,
    localUserName,
    localUserImg,
    true,
    undefined,
    undefined,
    "post",
  );

  const userRank = createBaseUserRank(
    user.uid,
    user.progressV2 ? user.progressV2 : 0,
    toCopyEvent.name,
    toCopyEvent.eventKey ? toCopyEvent.eventKey : "",
    toCopyEvent.id,
    user.userLevelV2 ? user.userLevelV2 : 0,
    toCopyEvent.ownerUID,
    user.gender ? user.gender : "notSpecified",
    user.name,
    user.profileImage,
  );

  const coachRank = createBaseCoachRank(
    user.uid,
    toCopyEvent.name,
    toCopyEvent.eventKey ? toCopyEvent.eventKey : "",
    toCopyEvent.id,
    user.name,
    user.profileImage,
  );

  await saveCopiedChallenge(
    communityId,
    toCopyEvent,
    {
      ...newPost,
      text: teamDesc ? teamDesc : "",
    },
    userRank,
    coachRank,
  );

  return toCopyEvent;
};

export const saveCopiedChallenge = async (
  baseCommmunityId: string,
  challenge: sbEventInterface,
  post: Post,
  userRank: UserRank,
  coachRank: CoachRank,
  // baseCohortId?: string
) => {
  const batch = admin.firestore().batch();

  // const batch = writeBatch(db);
  const eventRef = admin.firestore().collection("sbEvents").doc(challenge.id); // doc(db, "sbEvents", challenge.id);
  batch.set(eventRef, challenge);

  const postRef = eventRef.collection("postsV2").doc(post.id); // doc(eventRef, "postsV2", post.id);
  batch.set(postRef, post);

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
