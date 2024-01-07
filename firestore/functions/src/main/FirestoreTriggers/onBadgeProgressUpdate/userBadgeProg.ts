import { Task } from "../../../models/Task/Task";
import * as admin from "firebase-admin";
import {
  Badge,
  BadgeProgress,
  WorkoutLevel,
  WorkoutLevelProgress,
} from "../../../models/Prizes/Badges";
import { Activity } from "../../../models/Activity/Activity";
import { getTask } from "../../../models/Task/getUtils";
import { getAllTasksForBadgeDay } from "../onBaseTaskWrite/badgeUpdater";

/**
 *
 * Make different tasks for each day
 * Update taskId for old activities
 *
 */

export const userBadgeProg = async (uid: string, activity: Activity) => {
  const taskId = activity.taskId;
  const taskDay = activity.taskDay;
  const games = activity.games;
  // const games = task.games;

  if (taskId && typeof taskDay === "number" && games?.length) {
    const task = await getTask(taskId);

    if (task?.badgeId) {
      await updateUserProgressForBadge(uid, taskDay, games, task.badgeId);
    }
  }
};

export const updateUserProgressForBadge = async (
  uid: string,
  taskDay: number,
  games: string[],
  badgeId: string,
) => {
  if (uid && typeof taskDay === "number" && games?.length) {
    // get current badge
    for (const gameId of games) {
      await userBadgeProgByBadgeId(uid, gameId, badgeId);
    }
  }
};

const saveBadgeProgress = async (
  gameId: string,
  badgeId: string,
  badgeProgress: BadgeProgress,
) => {
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .doc(badgeId)
    .collection("badgeProgress")
    .doc(badgeProgress.uid)
    .set(badgeProgress);
};

export const createBadgeProgress = (
  uid: string,
  currentDay: number,
  progress: WorkoutLevelProgress[],
): BadgeProgress => {
  return {
    currentDay,
    uid,
    progress,
  };
};

const getCurrentDay = (badgeWorkoutProgress: WorkoutLevelProgress[]) => {
  let day: number = 0;
  for (const prog of badgeWorkoutProgress) {
    if (prog.nbFPEarnt) {
      day = prog.day;
    }
  }

  return day;
};

const getUserWorkoutProgresV2 = async (
  badgeId: string,
  workoutLevel: WorkoutLevel,
  uid: string,
  gameId: string,
) => {
  const progLevel: WorkoutLevelProgress = {
    ...workoutLevel,
    nbWorkoutsDone: 0,
    nbFPEarnt: 0,
  };

  // console.log("fetching tasks");
  const dayTasks = await getAllTasksForBadgeDay(badgeId, workoutLevel.day);

  // console.log("dayTasks", dayTasks.length);
  const { nbFitpoints, nbWorkoutsDone } = await handleUserDayProgress(
    dayTasks,
    uid,
    workoutLevel.day,
    gameId,
  );

  progLevel.nbFPEarnt = nbFitpoints;
  progLevel.nbWorkoutsDone = nbWorkoutsDone;

  // add progress level
  return progLevel;
};

export const getUserWorkoutProgres = async (
  badgeId: string,
  workoutLevel: WorkoutLevel,
  uid: string,
  gameId: string,
) => {
  const progLevel: WorkoutLevelProgress = {
    ...workoutLevel,
    nbWorkoutsDone: 0,
    nbFPEarnt: 0,
  };

  // console.log("fetching tasks");
  const dayTasks = await getTasksForBadgeDay(badgeId, workoutLevel.day);

  // console.log("dayTasks", dayTasks.length);
  const { nbFitpoints, nbWorkoutsDone } = await handleUserDayProgress(
    dayTasks,
    uid,
    workoutLevel.day,
    gameId,
  );

  progLevel.nbFPEarnt = nbFitpoints;
  progLevel.nbWorkoutsDone = nbWorkoutsDone;

  // add progress level
  return progLevel;
};

const handleUserDayProgress = async (
  dayTasks: Task[],
  uid: string,
  day: number,
  gameId: string,
) => {
  let nbWorkoutsDone: number = 0;
  let nbFitpoints: number = 0;
  for (const task of dayTasks) {
    const remoteActs = await getActivityForTaskDay(task.id, uid, day, gameId);

    // console.log("task", task.name, remoteActs.length);

    if (remoteActs.length) {
      nbWorkoutsDone++;

      nbFitpoints += getMaxFP(remoteActs);
    }
  }

  return {
    nbFitpoints,
    nbWorkoutsDone,
  };
};

const getMaxFP = (acts: Activity[]) => {
  let fp: number = 0;
  for (const act of acts) {
    const actCals = act.calories ? act.calories : 0;
    const fpAct = Math.round(actCals / 300);

    // console.log("fpAct", fpAct, actCals);

    if (fp < fpAct) {
      fp = fpAct;
    }
  }

  return fp;
};

const getActivityForTaskDay = async (
  taskId: string,
  uid: string,
  day: number,
  gameId: string,
) => {
  const userActWithPts = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("taskId", "==", taskId)
    .where("taskDay", "==", day)
    // .where("calories", ">=", 0)
    .get();

  const acts: Activity[] = [];
  for (const act of userActWithPts.docs) {
    if (act.exists) {
      const remoteAct = act.data() as Activity;
      if (remoteAct.calories && remoteAct.games?.includes(gameId)) {
        acts.push(remoteAct);
      }
    }
  }

  return acts;
};

const getTasksForBadgeDay = async (badgeId: string, selectedDay: number) => {
  const badgeTasks = await admin
    .firestore()
    .collection("tasks")
    .where("badgeId", "==", badgeId)
    .where("programDays", "array-contains", selectedDay)
    .get();

  const dayTasks: Task[] = [];
  for (const badgeTask of badgeTasks.docs) {
    if (badgeTask.exists) {
      const tk = badgeTask.data() as Task;

      dayTasks.push(tk);
    }
  }

  return dayTasks;
};

export const getBadge = async (badgeId: string, gameId: string) => {
  const badgeObj = await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .doc(badgeId)
    .get();

  if (badgeObj.exists) {
    return badgeObj.data() as Badge;
  }

  return undefined;
};

export const userBadgeProgByBadgeId = async (
  uid: string,
  badgeId: string,
  gameId: string,
) => {
  const remoteBadge = await getBadge(badgeId, gameId);
  // console.log("remo", remoteBadge?.name);
  // if remote badge exists
  if (remoteBadge && remoteBadge?.workoutLevels) {
    const badgeWorkoutProgress: WorkoutLevelProgress[] = [];
    for (const workoutLevel of remoteBadge.workoutLevels) {
      // console.log("here");
      const progLevel = await getUserWorkoutProgresV2(
        badgeId,
        workoutLevel,
        uid,
        gameId,
      );

      // console.log("progLevel", progLevel);

      // add to array
      badgeWorkoutProgress.push(progLevel);
    }

    const unlockedDay = getCurrentDay(badgeWorkoutProgress);

    // console.log("unlockedDay", unlockedDay);

    // create badge progress
    const badgeProgress = createBadgeProgress(
      uid,
      unlockedDay,
      badgeWorkoutProgress,
    );

    // console.log("badgeProgress", badgeProgress);

    // save badge progress
    await saveBadgeProgress(gameId, badgeId, badgeProgress);
  }
};
