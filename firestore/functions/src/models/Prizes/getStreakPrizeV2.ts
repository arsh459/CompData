import {
  // getUserMonthActs,
  handleUserActivityReconcile,
} from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
import { Activity } from "../Activity/Activity";
import { getUserActivityAfter } from "../Activity/getUtils";
import {
  getMonthlyBucketForUser,
  getWeeklyBucketForUser,
} from "./getPodiumFinishes";
import { Post } from "../Post/Post";
import * as admin from "firebase-admin";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
// import { getFormattedDateFormat2ForUnix } from "../../main/PubSub/activityTracker/utils";

export const getStreakPrizeV2 = async (
  uid: string,
  after: number,
  // before: number,
  fitPointTh: number,
  daysElapsed: number,
  activityAfter: number,
  activityBefore: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  gameId: string,
) => {
  // console.log(
  //   "activityAfter",
  //   activityAfter,
  //   "activityBefore:",
  //   activityBefore,
  // );

  // throw new Error("PAUSED");
  const postActivities = await getUserActivityAfter(
    uid,
    activityAfter,
    activityBefore,
  );

  console.log("USER ACTIVITIES READ: RECONCILE", postActivities.length);

  const userActivities = await filterActivities(postActivities, gameId, uid);
  // for (const act of userActivities) {
  // console.log(
  //   uid,
  //   act.source,
  //   act.activityName,
  //   act.games?.length,
  //   act.calories,
  //   act.createdOn ? getFormattedDateFormat2ForUnix(act.createdOn) : "No date",
  //   `https://socialboat.live/feed/${gameId}?postId=${act.postId}`,
  // );
  // }

  // const monthUserWithActs = getUserMonthActs(userActivities);

  // console.log("userActivities", userActivities.length);

  const { totalFPoints, dayFitPoints, totalCalories, dayCals } =
    handleUserActivityReconcile(userActivities, fitPointTh);

  const weekFitPoints = getWeeklyBucketForUser(
    dayFitPoints,
    daysElapsed,
    after,
    rounds,
  );

  // console.log("week", weekFitPoints);

  // throw new Error("PAUSED");

  const monthPointObj = getMonthlyBucketForUser(
    dayFitPoints,
    daysElapsed,
    after,
    sprints,
  );

  // console.log("monthPointObj", monthPointObj);

  const monthCalObj = getMonthlyBucketForUser(
    dayCals,
    daysElapsed,
    after,
    sprints,
  );

  const weekCalObj = getWeeklyBucketForUser(
    dayCals,
    daysElapsed,
    after,
    rounds,
  );

  return {
    totalFPoints,
    weekFitPoints,
    dayFitPoints,
    weekCalObj,
    totalCalories,
    dayCals,
    monthPointObj,
    monthCalObj,
  };
};

export const getDaysElapsed = (start: number, end: number) => {
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
};

const addActivityToGame = async (
  actRef: admin.firestore.DocumentReference,
  gameId: string,
) => {
  await actRef.update({
    games: admin.firestore.FieldValue.arrayUnion(gameId),
  });
};

const filterActivities = async (
  activities: Activity[],
  gameId: string,
  uid: string,
) => {
  const filteredActivities: Activity[] = [];
  for (const act of activities) {
    // console.log("act", act);
    if (act.source === "terra") {
      // console.log("terra");
      filteredActivities.push(act);
    } else if (act.games && act.games.includes(gameId)) {
      // console.log("contains gameId");
      filteredActivities.push(act);
    } else if (!act.games && act.postRef) {
      // console.log("contains postRef");
      const postDoc = await act.postRef.get();
      if (postDoc.exists) {
        const post = postDoc.data() as Post;
        if (post.gameId === gameId) {
          filteredActivities.push(act);

          // add activity to game
          await addActivityToGame(
            admin
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("activities")
              .doc(act.id ? act.id : act.postId),
            gameId,
          );
        }
      }
    } else if (act.postId) {
      // console.log("contains postId");
      const postDoc = await admin
        .firestore()
        .collectionGroup("postsV2")
        .where("id", "==", act.postId)
        .get();

      // console.log("postDoc", postDoc.docs.length);
      if (postDoc.docs && postDoc.docs.length) {
        const post = postDoc.docs[0].data() as Post;
        // console.log("post.gameId", post.gameId);
        if (post.gameId === gameId) {
          filteredActivities.push(act);
        }

        if (post.gameId) {
          // add activity to game
          await addActivityToGame(
            admin
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("activities")
              .doc(act.id ? act.id : act.postId),
            post.gameId,
          );
        }
      }
    } else if (act.postId && act.eventId) {
      // console.log("contains eventId");
      const postDoc = await admin
        .firestore()
        .collection("sbEvents")
        .doc(act.eventId)
        .collection("postsV2")
        .doc(act.postId)
        .get();
      if (postDoc.exists) {
        const post = postDoc.data() as Post;
        if (post.gameId === gameId) {
          filteredActivities.push(act);
        }

        if (post.gameId) {
          // add activity to game
          await addActivityToGame(
            admin
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("activities")
              .doc(act.id ? act.id : act.postId),
            post.gameId,
          );
        }
      }
    } else if (act.calories) {
      console.log("act", act, act.postRef, "NOT ADDED");
      // throw new Error("PAUSED HERE");
    } else {
      // console.log("error");
      // throw new Error("ERRRORRR");
    }
  }

  return filteredActivities;
};
