import {
  // goalResolutionStrategy,
  KPIValue,
  Task,
  TaskProgress,
} from "@models/Tasks/Task";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { db } from "@config/firebase";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "@models/Activities/Activity";
import { KPIConfig, SystemKPIs } from "./SystemKPIs";
import { getEvent } from "@models/Event/getUtils";
import {
  // getCurrentMonth,
  // getCurrentMonthV2,
  getCurrentMonthV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

export const createNewTask = (uid: string): Task => {
  const now = Date.now();
  return {
    id: uuidv4(),
    createdOn: now,
    updatedOn: now,
    type: "standard",
    priority: 1,
    durationMinutes: 30,
    level: 0,
    games: [TEAM_ALPHABET_GAME],
  };
};

const getCurrentProgress = async (taskId: string, uid: string) => {
  const taskProgressRef = doc(doc(db, "tasks", taskId), "taskProgress", uid);

  const currentProgress = await getDoc(taskProgressRef);
  const currentData = currentProgress.data();

  if (currentData) {
    return currentData as TaskProgress;
  }

  return undefined;
};

export const getSumKPIValue = (
  currentValue: number,
  newVal: number,
  previousKPIValue: number
) => {
  // console.log(currentValue, previousKPIValue, newVal);
  const newFinal = currentValue - previousKPIValue + newVal;
  return newFinal ? newFinal : 0;
};

export const getAvgKPIValue = (
  currentAvg: number,
  newItem: number,
  previousItemValue: number,
  numberOfItems: number
) => {
  // avg = sum/n
  const newSum = currentAvg * numberOfItems - previousItemValue + newItem;
  if (newSum) {
    return newSum / numberOfItems;
  }

  return 0;
};

export const getAllUserActivitiesForTask = async (
  taskId: string,
  uid: string,
  after: number,
  before: number
) => {
  const q = query(
    collection(doc(db, "users", uid), "activities"),
    where("taskId", "==", taskId),
    where("createdOn", ">=", after),
    where("createdOn", "<=", before)
  );
  const docs = await getDocs(q);

  const acts: Activity[] = [];
  for (const doc of docs.docs) {
    acts.push(doc.data() as Activity);
  }

  return acts;
};

export const getPreviousActivityValue = async (
  actId: string,
  uid: string,
  kpiValue: SystemKPIs
) => {
  const actRef = doc(doc(db, "users", uid), "activities", actId);
  const previousActivity = (await getDoc(actRef)).data();

  if (previousActivity) {
    const act = previousActivity as Activity;

    if (act.goalScores && act.goalScores[kpiValue]) {
      return act.goalScores[kpiValue];
    }
  }

  return 0;
};

const reconcileForSum = (acts: Activity[], kpi: SystemKPIs) => {
  // const actsThatCount: Activity[] = []
  let sum: number = 0;
  let count: number = 0;
  for (const act of acts) {
    if (act.goalScores && act.goalScores[kpi]) {
      const val = act.goalScores[kpi];
      if (val) {
        sum += val;
        count += 1;
      }
    }
  }

  return {
    updatedValue: sum,
    updatedCount: count,
  };
};

const reconcileForAvg = (acts: Activity[], kpi: SystemKPIs) => {
  // const actsThatCount: Activity[] = []
  const { updatedValue, updatedCount } = reconcileForSum(acts, kpi);

  return {
    updatedValue: updatedCount > 0 ? updatedValue / updatedCount : 0,
    updatedCount: updatedCount,
  };
};

const reconcileForMax = (acts: Activity[], kpi: SystemKPIs) => {
  let max: number = 0;
  let count: number = 0;
  for (const act of acts) {
    const val =
      act.goalScores && act.goalScores[kpi] ? act.goalScores[kpi] : undefined;
    if (val && max < val) {
      max = val;
    }

    if (val) {
      count += 1;
    }
  }

  return {
    updatedValue: max,
    updatedCount: count,
  };
};

const reconcileForMin = (acts: Activity[], kpi: SystemKPIs) => {
  let min: number = Number.POSITIVE_INFINITY;
  let count: number = 0;
  for (const act of acts) {
    const val =
      act.goalScores && act.goalScores[kpi] ? act.goalScores[kpi] : undefined;
    if (val && min > val) {
      min = val;
    }

    if (val) {
      count += 1;
    }
  }

  return {
    updatedValue: min,
    updatedCount: count,
  };
};

export const reconcileUpdatedValues = async (
  finalActivities: Activity[],
  kpi: SystemKPIs
  // uid:string,
  // taskId: string,
  // kpi: string
) => {
  // get strategy
  const strategy = KPIConfig[kpi]?.strategy;

  if (strategy === "sum") {
    return reconcileForSum(finalActivities, kpi);
  } else if (strategy === "max") {
    return reconcileForMax(finalActivities, kpi);
  } else if (strategy === "min") {
    return reconcileForMin(finalActivities, kpi);
  } else if (strategy === "avg") {
    return reconcileForAvg(finalActivities, kpi);
  }

  return { updatedValue: 0, updatedCount: 0 };
};

// export const getUpdatedValue = async (
//   actId: string,
//   uid: string,
//   kpiValue: string,
//   strategy: goalResolutionStrategy,
//   currentValue: number,
//   updatedValue: number,
//   numberOfItems: number
// ) => {
//   const previousActivityValue = await getPreviousActivityValue(
//     actId,
//     uid,
//     kpiValue
//   );

//   if (strategy === "sum") {
//     return {
//       updatedValue: getSumKPIValue(
//         currentValue,
//         updatedValue,
//         previousActivityValue
//       ),
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "max") {
//     return {
//       updatedValue: updatedValue > currentValue ? updatedValue : currentValue,
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "min") {
//     return {
//       updatedValue: updatedValue < currentValue ? updatedValue : currentValue,
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "avg") {
//     return {
//       updatedValue: getAvgKPIValue(
//         currentValue,
//         updatedValue,
//         previousActivityValue,
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1
//       ),
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   }

//   return {
//     updatedValue: 0,
//     updatedCount: 0,
//   };
// };

export const getUpdatedValues = async (
  newActivity: Activity,
  task: Task,
  uid: string,
  // sprintId: string,
  sprintStart: number,
  sprintEnd: number
) => {
  const finalGoalKPIs: Partial<Record<SystemKPIs, number>> = {};
  const finalCount: Partial<Record<SystemKPIs, number>> = {};

  const acts = await getAllUserActivitiesForTask(
    task.id,
    uid,
    sprintStart,
    sprintEnd
  );

  const actsWithoutNew = acts.filter((item) => item.id !== newActivity.id);
  const finalActivities = [...actsWithoutNew, newActivity];
  if (task.goalKPIs) {
    for (const kpi of task.goalKPIs) {
      // console.log("kpi", kpi);

      const { updatedValue, updatedCount } = await reconcileUpdatedValues(
        finalActivities,
        kpi.systemKPI
        // kpi.strategy,
        // kpi.unitLabel
      );

      // current value
      // const currentProgressVal =
      //   currentProgress && currentProgress.values[kpi.unitLabel]
      //     ? currentProgress.values[kpi.unitLabel]
      //     : 0;

      // console.log("currentProgressVal", currentProgressVal);

      // new value
      // const kpiValue = formValues[kpi.unitLabel];

      // console.log("kpiValue", kpiValue);

      // const numberOfItems =
      //   currentProgress && currentProgress?.numberOfItems[kpi.unitLabel]
      //     ? currentProgress?.numberOfItems[kpi.unitLabel]
      //     : 0;

      // console.log("numberOfItems", numberOfItems);

      // const { updatedValue, updatedCount } = await getUpdatedValue(
      //   actId,
      //   uid,
      //   kpi.unitLabel,
      //   kpi.strategy,
      //   currentProgressVal,
      //   kpiValue,
      //   numberOfItems
      // );

      finalGoalKPIs[kpi.systemKPI] = updatedValue;
      finalCount[kpi.systemKPI] = updatedCount;
    }
  }

  return {
    finalGoalKPIs,
    finalCount,
  };
};

export const getUpdatedTaskProgress = async (
  task: Task,
  uid: string,
  // actId: string,
  activity: Activity

  // formValues: { [key: string]: number }
): Promise<TaskProgress | undefined> => {
  const currentProgress = await getCurrentProgress(task.id, uid);

  // console.log("currentProgress", currentProgress);

  // get game

  const gameId =
    activity.games && activity.games.length ? activity.games[0] : "";

  // console.log("g", gameId);

  const game = await getEvent(gameId);

  // console.log("game", game);

  if (game) {
    const { sprintId, sprintStartUnix, sprintEndUnix } = getCurrentMonthV3(
      game.configuration?.sprints,
      game.configuration?.starts,
      game.configuration?.challengeLength,
      game.configuration?.rounds,
      activity.createdOn
    );

    // console.log("sprintId", sprintId, sprintStartUnix, sprintEndUnix);

    if (sprintId && sprintStartUnix && sprintEndUnix) {
      const { finalCount, finalGoalKPIs } = await getUpdatedValues(
        activity,
        task,
        // formValues,
        uid,
        sprintStartUnix,
        sprintEndUnix
        // currentProgress
      );

      // console.log("finalCount", finalCount, finalGoalKPIs);

      if (currentProgress) {
        return {
          ...currentProgress,
          // values: finalGoalKPIs,
          gameSprintKPIValues: {
            ...(currentProgress.gameSprintKPIValues
              ? currentProgress.gameSprintKPIValues
              : {}),
            [gameId]: {
              ...(currentProgress.gameSprintKPIValues &&
              currentProgress.gameSprintKPIValues[gameId]
                ? currentProgress.gameSprintKPIValues[gameId]
                : {}),
              [sprintId]: finalGoalKPIs,
            },
          },
          gameSprintKPICount: {
            ...(currentProgress.gameSprintKPICount
              ? currentProgress.gameSprintKPICount
              : {}),
            [gameId]: {
              ...(currentProgress.gameSprintKPICount &&
              currentProgress.gameSprintKPICount[gameId]
                ? currentProgress.gameSprintKPICount[gameId]
                : {}),
              [sprintId]: finalCount,
            },
          },
          // numberOfItems: finalCount,
          updatedOn: Date.now(),
        };
      } else {
        return createTaskProgrss(
          finalGoalKPIs,
          finalCount,
          uid,
          gameId,
          sprintId
        );
      }
    }
  }

  return undefined;
};

export const createTaskProgrss = (
  values: KPIValue,
  count: KPIValue,
  uid: string,
  gameId: string,
  sprintId: string
): TaskProgress => {
  const now = Date.now();
  return {
    // values: values,
    // numberOfItems: count,
    gameSprintKPIValues: { [gameId]: { [sprintId]: values } },
    gameSprintKPICount: { [gameId]: { [sprintId]: count } },
    uid: uid,
    updatedOn: now,
    createdOn: now,
  };
};

export const saveNewTask = async (task: Task, gptGenerated?: boolean) => {
  try {
    const now = Date.now();
    const taskRef = doc(db, gptGenerated ? "gptTasks" : "tasks", task.id);
    await setDoc(taskRef, {
      ...task,
      level: task.level ? task.level : 0,
      updatedOn: now,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    // const now = Date.now();
    const taskRef = doc(db, "tasks", taskId);
    const taskObj = await getDoc(taskRef);
    const taskData = taskObj.data();
    if (taskData) {
      return taskData as Task;
    }

    return undefined;
  } catch (error) {
    console.log("error", error);
  }
};
