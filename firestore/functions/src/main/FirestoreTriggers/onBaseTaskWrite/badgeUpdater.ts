import { NutritionFacts, Task } from "../../../models/Task/Task";
import * as admin from "firebase-admin";
import { Badge, WorkoutLevel } from "../../../models/Prizes/Badges";
import {
  STUDENT_OLYMPICS,
  TEAM_ALPHABET_GAME,
} from "../../../constants/challenge";
import { getBadge } from "../onBadgeProgressUpdate/userBadgeProg";
import { removeOrphanBadgeIds } from "./removeOrphanBadgeIds";

export const badgeProgressReconcile = async (badge: Badge, log?: boolean) => {
  const allTasks = await getAllTasksForBadge(badge.id);
  log && console.log("ALL TASKS LENGTH", allTasks.length);
  const { allDays, orphanedTaskIds } = getDaysForBadge(badge.id, allTasks);
  log && console.log("ALL Days", allDays);
  log && console.log("Orphaned Task Ids:", orphanedTaskIds);
  const wkLevelObj = await createWorkoutLevelsForDay(badge.id, allDays);
  log && console.log("wkLevelObj", wkLevelObj);
  const gameIds = await getGameIdsForBadge(badge.id);
  log && console.log("gameIds", gameIds);

  // console.log("wkLevelObj", wkLevelObj);

  for (const gameId of gameIds) {
    await saveWKLevels(gameId, badge.id, wkLevelObj);
  }

  // remove orphans
  await removeOrphanBadgeIds(badge.id, orphanedTaskIds);
};

export const badgeProgressUpdaterV2 = async (task: Task) => {
  // to get all badges where this task is used
  const badgeDaysObj = getTaskDaysByBadgeId(task);

  console.log("badgeDaysObj", badgeDaysObj);

  for (const badgeId of Object.keys(badgeDaysObj)) {
    // console.log();
    console.log("##");

    console.log("badgeId", badgeId);
    const wkLevelObj = await createWorkoutLevelsForDay(
      badgeId,
      badgeDaysObj[badgeId],
    );

    console.log("wkLevelObj", wkLevelObj);

    const gameIds = await getGameIdsForBadge(badgeId);

    console.log("gameIds", gameIds);

    for (const gameId of gameIds) {
      await mergeWKLevel(gameId, badgeId, wkLevelObj);
    }
    // console.log("##");
    // console.log();
  }
};

// export const badgeProgressUpdater = async (task: Task) => {
//   const badgeId = task.badgeId;

//   if (badgeId) {
//     const gameIds = await getGameIdsForBadge(badgeId);
//     // get all tasks
//     await updateProgressForBadge(badgeId, gameIds);
//   }
// };

const getGameIdsForBadge = async (badgeId: string) => {
  const gameIds: string[] = [];
  for (const gameId of [TEAM_ALPHABET_GAME, STUDENT_OLYMPICS]) {
    const remoteBadge = await admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("badges")
      .doc(badgeId)
      .get();

    if (remoteBadge.exists) {
      gameIds.push(gameId);
    }
  }

  return gameIds;
};

export const saveWKLevels = async (
  gameId: string,
  badgeId: string,
  newWkLevels: { [day: number]: WorkoutLevel },
) => {
  const wkLevels = Object.values(newWkLevels);
  const sorted = wkLevels.sort((a, b) => a.day - b.day);
  await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .doc(badgeId)
    .update({
      workoutLevels: sorted,
    });
};

export const mergeWKLevel = async (
  gameId: string,
  badgeId: string,
  newWkLevels: { [day: number]: WorkoutLevel },
) => {
  const previousBadge = await getBadge(badgeId, gameId);

  // if (previousBadge?.liveBadge) {
  // if badge is live
  // } else {
  const newDays = Object.keys(newWkLevels).map((item) => parseInt(item));

  const wkLevels = Object.values(newWkLevels);
  if (previousBadge?.workoutLevels) {
    const previousDaysRemoved = previousBadge.workoutLevels.filter((item) =>
      newDays.includes(item.day) ? false : true,
    );
    wkLevels.push(...previousDaysRemoved);
  }

  const sorted = wkLevels.sort((a, b) => a.day - b.day);

  await admin
    .firestore()
    .collection("sbEvents")
    .doc(gameId)
    .collection("badges")
    .doc(badgeId)
    .update({
      workoutLevels: sorted,
    });
  // }

  // console.log("newDays", newDays);

  // console.log("sorted", sorted, badgeId);

  // update badge progress
};

// export const updateProgressForBadge = async (
//   badgeId: string,
//   gameIds: string[],
// ) => {
//   const allTasks = await getAllTasksForBadge(badgeId);

//   const newWorkoutLevels = createWorkoutLevels(allTasks);

//   // update badge levels
//   for (const gameId of gameIds) {
//     // update badges
//     await admin
//       .firestore()
//       .collection("sbEvents")
//       .doc(gameId)
//       .collection("badges")
//       .doc(badgeId)
//       .update({
//         workoutLevels: newWorkoutLevels,
//       });
//   }
// };

export const getAllTasksForBadge = async (badgeId: string) => {
  // get all tasks for the badgeId
  const allTasksForBadge = await admin
    .firestore()
    .collection("tasks")
    .where("badgeIds", "array-contains", badgeId)
    .get();

  const allTasks: Task[] = [];
  for (const remTask of allTasksForBadge.docs) {
    allTasks.push(remTask.data() as Task);
  }

  return allTasks;
};

export const getAllTasksForBadgeDay = async (badgeId: string, day: number) => {
  const keyStr = `${badgeId}_${day}`;

  // console.log("keyStr", keyStr);

  // get all tasks for the badgeId
  const allTasksForBadge = await admin
    .firestore()
    .collection("tasks")
    .where("badgeDays", "array-contains", keyStr)
    .get();

  // console.log("all", allTasksForBadge.docs.length);

  const allTasks: Task[] = [];
  for (const remTask of allTasksForBadge.docs) {
    const remTaskObj = remTask.data() as Task;
    // console.log("rem", remTaskObj.name, remTaskObj.preview);
    if (!remTaskObj.preview && remTaskObj.taskType !== "steps") {
      allTasks.push(remTaskObj);
    }
  }

  const sorted = allTasks.sort((a, b) =>
    a.badgeDayPriority && b.badgeDayPriority
      ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
      : 0,
  );

  return sorted;
};

const getTaskDaysByBadgeId = (task: Task) => {
  const badgeDays = task.badgeDays;
  const badgeDaysObj: { [badgeId: string]: number[] } = {};

  if (badgeDays) {
    for (const badgeDay of badgeDays) {
      const badgeDayList = badgeDay.split("_");
      if (badgeDayList.length === 2) {
        const badgeId = badgeDayList[0];
        const day = parseInt(badgeDayList[1]);

        if (badgeDaysObj[badgeId]) {
          badgeDaysObj[badgeId].push(day);
        } else {
          badgeDaysObj[badgeId] = [day];
        }
      }
    }
  }

  return badgeDaysObj;
};

const createWorkoutLevelsForDay = async (
  badgeId: string,
  days: number[],
): Promise<{ [day: number]: WorkoutLevel }> => {
  const levels: { [day: number]: WorkoutLevel } = {};
  for (const day of days) {
    const tasksForDay = await getAllTasksForBadgeDay(badgeId, day);
    // console.log("tasksForDay", tasksForDay.length);

    let wkLevel: WorkoutLevel = {
      day,
      nbFitpoints: 0,
      nbWorkouts: 0,
    };

    for (const task of tasksForDay) {
      // console.log("task", task.name, task.fitPoints);
      const tkFPs = task.fitPoints ? task.fitPoints : 0;
      wkLevel.nbFitpoints += tkFPs;
      wkLevel.nbWorkouts += 1;

      if (task.nutritionFacts) {
        wkLevel = addNutritionFacts(task.nutritionFacts, wkLevel, task.kcal);
      }
    }

    levels[day] = wkLevel;
  }

  return levels;
};

const addNutritionFacts = (
  nutritionFacts: NutritionFacts,
  wkLevelI: WorkoutLevel,
  kcal?: number,
) => {
  let wkLevel = wkLevelI;
  if (!wkLevel.nutrition) {
    wkLevel.nutrition = { carbs: 0, fats: 0, protein: 0, fiber: 0, kcal: 0 };
  }

  wkLevel.nutrition.carbs += nutritionFacts.carbs ? nutritionFacts.carbs : 0;
  wkLevel.nutrition.protein += nutritionFacts.protein
    ? nutritionFacts.protein
    : 0;
  wkLevel.nutrition.fats += nutritionFacts.fats ? nutritionFacts.fats : 0;
  wkLevel.nutrition.fiber += nutritionFacts.fibre ? nutritionFacts.fibre : 0;
  wkLevel.nutrition.kcal += kcal ? kcal : 0;

  return wkLevel;
};

const getDaysForBadge = (badgeIdToCheck: string, allTasks: Task[]) => {
  const days: { [day: number]: number } = {};
  const orphanedTaskIds: string[] = [];
  for (const task of allTasks) {
    if (task.badgeDays?.length) {
      let orphaned: boolean = true;

      for (const badgeDay of task.badgeDays) {
        const badgeDayList = badgeDay.split("_");

        if (badgeDayList.length === 2) {
          const badgeId = badgeDayList[0];
          const day = parseInt(badgeDayList[1]);

          if (badgeIdToCheck === badgeId) {
            orphaned = false;
            days[day] = day;
          }
        }
      }

      if (orphaned) {
        console.log("ORPHANED TASK 2", task.name);
        orphanedTaskIds.push(task.id);
      }
    } else {
      console.log("ORPHANED TASK", task.name);
      orphanedTaskIds.push(task.id);
    }
  }
  return { allDays: Object.values(days), orphanedTaskIds };
};

// const createWorkoutLevels = (tasks: Task[]): WorkoutLevel[] => {
//   const levels: { [day: number]: WorkoutLevel } = {};
//   for (const task of tasks) {
//     const tkFPs = task.fitPoints ? task.fitPoints : 0;
//     // program days
//     if (task.programDays) {
//       for (const day of task.programDays) {
//         console.log("tk", task.name, "fps", tkFPs, "day", day);

//         // createWorkout Level
//         if (!levels[day]) {
//           levels[day] = {
//             day: day,
//             nbWorkouts: 0,
//             nbFitpoints: 0,
//           };
//         }

//         // increment Level
//         levels[day] = {
//           ...levels[day],
//           nbWorkouts: levels[day].nbWorkouts + 1,
//           nbFitpoints: levels[day].nbFitpoints + tkFPs,
//         };
//       }
//     }
//   }

//   console.log("levels", levels);

//   const finalLevels = Object.values(levels);
//   return finalLevels.sort((a, b) => a.day - b.day);
// };
