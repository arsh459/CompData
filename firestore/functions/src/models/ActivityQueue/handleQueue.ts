// import { getDayBucket } from "../../main/Https/refreshUserLevels/handleUserLevelReconcile";
import { getDayStartIST } from "../../main/PubSub/activityTracker/utils";
import { ActivityQueueItem } from "./ActivityQueue";

export const aggregateQueueTasks = (tasks: ActivityQueueItem[]) => {
  const userGameDeltas: {
    [gameId: string]: { [uid: string]: { [day: string]: number } };
  } = {};

  const gameBuckets = bucketTasksForGame(tasks);
  for (const bucket of Object.keys(gameBuckets)) {
    const userBuckets = bucketTasksForUser(tasks);
    const userDeltas: { [uid: string]: { [day: string]: number } } = {};
    for (const uid of Object.keys(userBuckets)) {
      const userDayBuckets = bucketTasksForUserOnDay(userBuckets[uid]);
      // console.log("userDayBuckets", userDayBuckets);
      for (const day of Object.keys(userDayBuckets)) {
        const daySumCals = aggregateCaloriesForUser(userDayBuckets[day]);

        if (userDeltas[uid]) {
          userDeltas[uid][day] = daySumCals;
        } else {
          userDeltas[uid] = { [day]: daySumCals };
        }
      }
    }

    userGameDeltas[bucket] = userDeltas;
  }

  return userGameDeltas;
};

const bucketTasksForGame = (tasks: ActivityQueueItem[]) => {
  const gameBuckets: { [gameId: string]: ActivityQueueItem[] } = {};
  for (const task of tasks) {
    if (gameBuckets[task.gameId]) {
      gameBuckets[task.gameId].push(task);
    } else {
      gameBuckets[task.gameId] = [task];
    }
  }

  return gameBuckets;
};

const bucketTasksForUser = (tasks: ActivityQueueItem[]) => {
  const userBuckets: { [uid: string]: ActivityQueueItem[] } = {};
  for (const task of tasks) {
    if (userBuckets[task.uid]) {
      userBuckets[task.uid].push(task);
    } else {
      userBuckets[task.uid] = [task];
    }
  }

  return userBuckets;
};

const bucketTasksForUserOnDay = (tasks: ActivityQueueItem[]) => {
  const dayBuckets: { [day: string]: ActivityQueueItem[] } = {};
  for (const task of tasks) {
    const dayBucket = getDayStartIST(task.effectiveUnix);
    // const dayBucket = getDayBucket(task.effectiveUnix);
    if (dayBuckets[dayBucket]) {
      dayBuckets[dayBucket].push(task);
    } else {
      dayBuckets[dayBucket] = [task];
    }
  }

  return dayBuckets;
};

const aggregateCaloriesForUser = (tasks: ActivityQueueItem[]) => {
  let deltaCalories: number = 0;
  for (const task of tasks) {
    const taskDelta = task.nowCalories - task.previousCalories;
    deltaCalories += taskDelta;
  }

  return deltaCalories;
};
