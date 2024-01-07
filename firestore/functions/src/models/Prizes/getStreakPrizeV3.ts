import { mergeUserActivityReconcileV2 } from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
import { Activity, ActivityUserPts } from "../Activity/Activity";
import { getUserActivityAfter } from "../Activity/getUtils";
import {
  getMonthlyBucketForUser,
  // getMonthlyBucketForUserV2,
  // getMonthlyTaskBucketForUser,
  getWeeklyBucketForUser,
} from "./getPodiumFinishes";
import { Post } from "../Post/Post";
import * as admin from "firebase-admin";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
// import { Task } from "../Task/Task";
// import { getTaskProgress } from "../Task/getUtils";
// import { TEAM_ALPHABET_GAME } from "../../constants/challenge";
// import { getFormattedDateFormat2ForUnix } from "../../main/PubSub/activityTracker/utils";

export const getStreakPrizeV3 = async (
  uid: string,
  after: number,
  fitPointTh: number,
  daysElapsed: number,
  activityAfter: number,
  activityBefore: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  gameId: string,
  sprintId: string,
  prevCalObj: { [day: string]: number },
  prevPointObj: { [day: string]: number },
  prevMonthActPts?: { [month: string]: ActivityUserPts[] },
  filteredState?: boolean,
) => {
  // throw new Error("PAUSED");
  // console.log("activityAfter", activityAfter);
  // console.log("activityBefore", activityBefore);

  let postActivities: Activity[] = [];
  if (filteredState) {
    postActivities = await getUserActivityAfter(
      uid,
      activityAfter,
      activityBefore,
    );
  }

  // console.log(
  //   "USER ACTIVITIES READ",
  //   uid,
  //   postActivities.length,
  //   new Date(activityAfter),
  //   new Date(activityBefore),
  // );

  const userActivities = await filterActivities(postActivities, gameId, uid);

  // console.log("userActivities", userActivities.length);
  // let fp: number = 0;
  // const taskPts: { [taskId: string]: number } = {};
  // if (uid === "Ng3E1hNiBGdlk4vkq6DFDgOcqn43") {
  //   for (const act of userActivities) {
  //     console.log(
  //       act.activityName,
  //       act.postId,
  //       act.source,
  //       act.taskId,
  //       act.calories,
  //     );
  //     if (act.taskId) {
  //       const taskObj = await admin
  //         .firestore()
  //         .collection("tasks")
  //         .doc(act.taskId)
  //         .get();
  //       const taskUser = taskObj.data() as Task;
  //       const taskProgress = await getTaskProgress(uid, act.taskId);
  //       console.log("taskUser", taskUser.games);
  //       // console.log("taskProgress", taskProgress?.gameSprintKPIValues);
  //       taskPts[act.taskId] =
  //         taskProgress?.gameSprintKPIValues[TEAM_ALPHABET_GAME][
  //           "month-6"
  //         ].fit_points;
  //       console.log("");
  //     }

  //     fp += act.calories ? act.calories : 0;
  //   }

  //   console.log("fp", fp / 300);

  //   console.log(
  //     "fpProg",
  //     Object.values(taskPts).reduce((a, b) => a + b, 0),
  //   );
  //   throw new Error("j");
  // }

  // }

  // if (uid === "40OqdGRJ0rQdUbSaZDyj9zm36uU2") {

  //   //
  // }

  // all user pts

  const {
    totalFPoints,
    dayFitPoints,
    totalCalories,
    dayCals,
    monthUserWithActs,
  } = mergeUserActivityReconcileV2(
    prevCalObj,
    prevPointObj,

    userActivities,
    fitPointTh,
    activityAfter,
    activityBefore,
    sprintId,
    prevMonthActPts,
  );

  // if (uid === "W1mm9HjTo8apZ11Qes9Mt8ckhpD3") {
  //   for (const act of userActivities) {
  //     console.log(
  //       "act",
  //       act.activityName,
  //       act.calories,
  //       act.createdOn ? new Date(act.createdOn) : null,
  //     );
  //   }

  //   console.log("dayFitPoints", dayFitPoints);
  //   throw new Error("HI");
  // }

  // console.log("dayFitPoints HERE", dayFitPoints);

  const weekFitPoints = getWeeklyBucketForUser(
    dayFitPoints,
    daysElapsed,
    after,
    rounds,
  );
  // console.log("weekFitPoints", weekFitPoints);
  const monthPointObj = getMonthlyBucketForUser(
    dayFitPoints,
    daysElapsed,
    after,
    sprints,
  );

  // const monthPointObjNew = getMonthlyBucketForUserV2(
  //   dayTaskPts,
  //   daysElapsed,
  //   after,
  //   sprints,
  // );

  // const monthPointObj = mergeUserMonthlyPts(monthPointObjDep, monthPointObjNew);

  // console.log("monthPointObjDep", monthPointObjDep);
  // console.log("monthPointObj", monthPointObjNew);
  // console.log("mergedMonthly", monthPointObj);

  // throw new Error("PAUSED");

  // const monthTaskObj = getMonthlyTaskBucketForUser(
  //   dayTaskPts,
  //   daysElapsed,
  //   after,
  //   sprints,
  // );
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
    monthUserWithActs,
    // monthTaskObj,
    actReads: postActivities.length,
    allUserActivities: postActivities,
  };
};

// const mergeUserMonthlyPts = (
//   oldObj: { [day: string]: number },
//   newObj: { [day: string]: number },
// ) => {
//   const returnObj: { [day: string]: number } = {};
//   for (const key of Object.keys(oldObj)) {
//     if (newObj[key]) {
//       returnObj[key] = newObj[key];
//     } else {
//       returnObj[key] = oldObj[key];
//     }
//   }
//   return returnObj;
// };

export const getDaysElapsed = (start: number, end: number) => {
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const addActivityToGame = async (
  actRef: admin.firestore.DocumentReference,
  gameId: string,
) => {
  await actRef.update({
    games: admin.firestore.FieldValue.arrayUnion(gameId),
  });
};

export const filterActivities = async (
  activities: Activity[],
  gameId: string,
  uid: string,
) => {
  const filteredActivities: Activity[] = [];
  for (const act of activities) {
    // console.log("act", act);
    if (act.source === "terra") {
      // console.log("terra");
      // filteredActivities.push(act);
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
    } else if (!act.games && act.postId) {
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
    } else if (!act.games && act.postId && act.eventId) {
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
    } else if (!act.games && act.calories) {
      console.log("act", act, act.postRef, "NOT ADDED");
      // throw new Error("PAUSED HERE");
    } else {
      // console.log("error");
      // throw new Error("ERRRORRR");
    }
  }

  return filteredActivities;
};
