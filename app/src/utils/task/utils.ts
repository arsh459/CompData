import axios from "axios";
import { AlgoliaSearchResponse } from "@models/Algolia/Algolia";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
// import {
//   doc,
//   // onSnapshot,
//   query,
//   where,
//   collection,
//   Query,
//   getDocs,
//   QuerySnapshot,
//   DocumentData,
//   collectionGroup,
// } from "firebase/firestore";
import { Task } from "@models/Tasks/Task";
import {
  isFinaleLocked,
  // isLevelLocked,
  // isLevelOnlyLocked,
  isRankLocked,
} from "@models/Tasks/taskValidity";
import { Activity, AlgoliaActivity } from "@models/Activity/Activity";
// import { db } from "@config/firebase";
import { API_BASE_URL } from "react-native-dotenv";
import { gameTypes } from "@models/Event/Event";
import { activityQuery } from "@providers/task/hooks/useIsTaskAllowedV2";

export const getFitPointsForActivity = (activities: Activity[]) => {
  for (const act of activities) {
    if (act.reviewStatus === "REVIEWED" || act.reviewStatus === "SAVED") {
      const cals = act.calories ? act.calories : 0;
      return Math.round(cals / 300);
    }
  }
  return 0;
};

export const getUserActivitiesForDay = async (
  uid: string,
  taskId: string,
  taskDay: number,
  gameId: string
) => {
  const acts: Activity[] = [];
  try {
    const userActivityDocs = await firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("taskId", "==", taskId)
      .where("taskDay", "==", taskDay)
      .where("games", "array-contains", gameId)
      .get();

    for (const userAct of userActivityDocs.docs) {
      const remoteAct = userAct.data() as Activity;
      acts.push(remoteAct);
    }
  } catch (error: any) {
    console.log("error");
    crashlytics().recordError(error);
  }

  return acts;
};

export const getActivitiiesMain = async (
  q: activityQuery,
  baseTaskId: string,
  taskName?: string,
  gameTypes?: gameTypes
) => {
  if (gameTypes === "team") {
    return getTeamActivitiesFirestore(q, baseTaskId, taskName);
  }

  return getAUserActivitiesFirestore(q, baseTaskId, taskName);
};

export const getAUserActivitiesFirestore = async (
  q: activityQuery,
  baseTaskId: string,
  taskName?: string
) => {
  const acts: Activity[] = [];
  const parentActs: Activity[] = [];
  if (q.player && q.taskIds && q.game) {
    const userRef = firestore().collection("users").doc(q.player); // doc(db, "users", q.player);

    const firestorePromises: Promise<
      FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    >[] = [];
    for (const taskId of q.taskIds) {
      let firestoreQuery: FirebaseFirestoreTypes.Query;
      if (q.dS) {
        firestoreQuery = userRef
          .collection("activities")
          .where("createdOn", ">=", parseInt(q.dS))
          .where("taskId", "==", taskId);
      } else {
        firestoreQuery = userRef
          .collection("activities")
          .where("taskId", "==", taskId);
      }

      firestorePromises.push(firestoreQuery.get());
    }

    const remDocs = await Promise.all(firestorePromises);

    for (const remDocSet of remDocs) {
      for (const indDoc of remDocSet.docs) {
        const indAct = indDoc.data() as Activity;

        if (
          (indAct.postRef || indAct.source === "checkin") &&
          indAct.games?.includes(q.game) &&
          indAct.reviewStatus !== "TRY_AGAIN" &&
          indAct.reviewStatus !== "NEED_MORE_DATA"
        ) {
          if (indAct.taskId === baseTaskId) {
            acts.push(indAct);
          } else {
            parentActs.push(indAct);
          }
        }
      }
    }
  }

  return {
    parentActs,
    acts,
  };
};

export const getAlgoliaActivities = async (query: activityQuery) => {
  const response = (
    await axios.get(`${API_BASE_URL}/api/algolia/activity`, {
      params: query,
    })
  ).data as AlgoliaSearchResponse;

  return response;
};

export const hasParentTask = (
  tasks: (AlgoliaActivity | Activity)[],
  currentId: string
) => {
  for (const task of tasks) {
    if (task.id !== currentId) {
      return true;
    }
  }

  return false;
};

export const checkForAvailStatus = (
  task: Task,
  userLevel?: number,
  userRank?: number,
  isFinaleActive?: boolean
) => {
  // if (isLevelLocked(userLevel, task.level, task.onLevelOnly)) {
  //   return "LEVEL_LOCKED";
  // } else if (isLevelLocked(userLevel, task.level, task.levelBoosterTask)) {
  //   return "LEVEL_LOCKED";
  // } else if (isLevelOnlyLocked(userLevel, task.level, task.onLevelOnly)) {
  //   return "LEVEL_ONCE_LOCKED";
  // } else

  if (isFinaleLocked(task.finaleTask, isFinaleActive)) {
    return "FINALE_LOCKED";
  } else if (isRankLocked(task.unlocksAtRank, userRank)) {
    return "RANK_LOCKED";
  }

  return undefined;
};

export const getSoonestDay = (days: number[]) => {
  // const currentDayA = typeof currentDay === 'number' ? currentDay : -1;

  let smallestDay = Number.POSITIVE_INFINITY;

  for (const day of days) {
    if (day >= 0 && smallestDay > day) {
      smallestDay = day;
    }
  }

  return smallestDay;
};

export const getNearestProgramDay = (days: number[], currentDay: number) => {
  // const currentDayA = typeof currentDay === 'number' ? currentDay : -1;

  let smallestDiff = Number.POSITIVE_INFINITY;
  let nearestDay = -1;
  for (const day of days) {
    if (day >= 0) {
      const diff = day - currentDay;

      if (diff === 0) {
        return { diff, day };
      }

      if (diff > 0 && smallestDiff > diff) {
        smallestDiff = diff;
        nearestDay = day;
      }
    }
  }

  return {
    diff: smallestDiff,
    day: nearestDay,
  };
};

export const getTeamActivitiesFirestore = async (
  q: activityQuery,
  baseTaskId: string,
  taskName?: string
) => {
  const acts: Activity[] = [];
  const parentActs: Activity[] = [];
  if (q.teamId && q.taskIds && q.game) {
    const actRef = firestore().collectionGroup("activities"); // collectionGroup(db, "activities");

    const firestorePromises: Promise<
      FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    >[] = [];
    for (const taskId of q.taskIds) {
      let firestoreQuery: FirebaseFirestoreTypes.Query;
      if (q.dS) {
        firestoreQuery = // query(
          actRef
            .where("teamId", "==", q.teamId)
            .where("createdOn", ">=", parseInt(q.dS))
            .where("taskId", "==", taskId);
      } else {
        firestoreQuery = //query(
          actRef.where("teamId", "==", q.teamId).where("taskId", "==", taskId);
      }

      firestorePromises.push(firestoreQuery.get());
    }

    const remDocs = await Promise.all(firestorePromises);

    for (const remDocSet of remDocs) {
      for (const indDoc of remDocSet.docs) {
        const indAct = indDoc.data() as Activity;

        if (
          (indAct.postRef || indAct.source === "checkin") &&
          indAct.games?.includes(q.game) &&
          indAct.reviewStatus !== "TRY_AGAIN" &&
          indAct.reviewStatus !== "NEED_MORE_DATA"
        ) {
          if (indAct.taskId === baseTaskId) {
            acts.push(indAct);
          } else {
            parentActs.push(indAct);
          }
        }
      }
    }
  }

  return {
    parentActs,
    acts,
  };
};
