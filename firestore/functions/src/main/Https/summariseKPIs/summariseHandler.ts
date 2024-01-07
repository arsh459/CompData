// import { ActivityKPIScore } from "../../../models/Activity/Activity";
// import { getCurrentMonth } from "../../../models/Activity/handleRanking";
import { getUserRankForUID } from "../../../models/Activity/getUtils";
import {
  kpiRankUpdate,
  kpiCoachRankUpdate,
} from "../../../models/Activity/kpiRankUpdate";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
import {
  getAllGameTasks,
  getTaskProgress,
} from "../../../models/Task/getUtils";
import {
  goalResolutionStrategy,
  KPIConfig,
  SystemKPIs,
} from "../../../models/Task/SystemKPIs";
import { KPIValue } from "../../../models/Task/Task";
import { getUserById } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import {
  getChallengeEndTime,
  getCurrentSprint,
} from "../../FirestoreTriggers/onActivityWrite/utils";
// import { TaskProgress } from "../../../models/Task/Task";

// task - progress -> for each task -> summaryOn game, sprint, kpi

// getAllTasks for game
// use each summary and summary
// rank -> summaryOn sprint, kpi

export const getSprintId = async (gameId: string) => {
  const { after, before, sprints, challengeLength, gameType } =
    await getEventMetrics(gameId);
  if (after && before && sprints && challengeLength) {
    const now = Date.now();
    const days = getDaysElapsed(
      after,
      getChallengeEndTime(now, before, challengeLength),
    );

    const sprintId = getCurrentSprint(days, sprints);

    return { sprintId, gameType };
  }

  return { sprintId: "", gameType };
};

export const summariseForTeam = async (
  uid: string,
  gameId: string,
  sprintId: string,
) => {
  const user = await getUserById(uid);
  const participatingObj =
    user?.participatingInGameWithTeam &&
    user?.participatingInGameWithTeam[gameId];

  // console.log("user", user?.name);
  // console.log("participatingObj", participatingObj);

  // throw new Error("HI");

  const summaryHolder: Partial<Record<SystemKPIs, number[]>> = {};
  if (participatingObj?.ownerUID) {
    const teamId = participatingObj.teamId;
    const coachUID = participatingObj.ownerUID;

    // console.log("teamId", teamId);
    // console.log("coachUID", coachUID);

    const team = await getSbEventById(teamId);

    // console.log("team", team?.name);
    if (team?.enrolledUserUIDs) {
      for (const teamUID of team.enrolledUserUIDs) {
        // console.log("teamUID", teamUID);

        const userRank = await getUserRankForUID(gameId, teamUID);
        const userKPIProgress = userRank?.kpiScoresV2;

        // console.log("userRank", userRank?.authorName);
        // console.log("userKPIProgress", userKPIProgress);
        // console.log("sprintId", sprintId);

        if (userKPIProgress) {
          if (userKPIProgress[sprintId]) {
            const gameSummaryValues = userKPIProgress[sprintId];
            for (const kpi of Object.keys(gameSummaryValues)) {
              const kpiType = kpi as SystemKPIs;

              const val = gameSummaryValues[kpiType];

              if (summaryHolder[kpiType]) {
                summaryHolder[kpiType]?.push(val ? val : 0);
              } else if (!summaryHolder[kpiType]) {
                summaryHolder[kpiType] = [];
                summaryHolder[kpiType]?.push(val ? val : 0);
              }
            }
          }
        }

        // console.log("summaryHolder", summaryHolder);
      }
    }

    // update scores
    const kpiScores = getKPIScores(summaryHolder);

    // console.log("kpiScores", kpiScores);

    await kpiCoachRankUpdate(gameId, coachUID, kpiScores, sprintId);
  }
};

export const summariseForUser = async (
  uid: string,
  gameId: string,
  sprintId: string,

  // sprintId: string,
) => {
  // console.log("s", sprintId);
  // throw new Error("Pause");
  const gameTasks = await getAllGameTasks(gameId);
  const summaryHolder: Partial<Record<SystemKPIs, number[]>> = {};
  for (const task of gameTasks) {
    const progress = await getTaskProgress(uid, task.id);
    // console.log("p", progress?.gameSprintKPIValues, task.name);
    if (progress) {
      const summaryValues = progress.gameSprintKPIValues;
      if (
        summaryValues &&
        summaryValues[gameId] &&
        summaryValues[gameId][sprintId]
      ) {
        const gameSummaryValues = summaryValues[gameId][sprintId];

        for (const kpi of Object.keys(gameSummaryValues)) {
          const kpiType = kpi as SystemKPIs;

          const val = gameSummaryValues[kpiType];

          if (summaryHolder[kpiType]) {
            summaryHolder[kpiType]?.push(val ? val : 0);
          } else if (!summaryHolder[kpiType]) {
            summaryHolder[kpiType] = [];
            summaryHolder[kpiType]?.push(val ? val : 0);
          }
        }
      }
    }
  }

  const kpiScores = getKPIScores(summaryHolder);

  await kpiRankUpdate(gameId, uid, kpiScores, sprintId);
};

const getKPIScores = (summaryHolder: Partial<Record<SystemKPIs, number[]>>) => {
  // sumarise all tasks and add to rank
  const kpiScores: KPIValue = {};

  for (const kpi of Object.keys(summaryHolder)) {
    const sysKPIFinal = kpi as SystemKPIs;
    const values = summaryHolder[sysKPIFinal];

    if (values) {
      const strategy = KPIConfig[sysKPIFinal].strategy;

      const finalValue = summariseAsPerStrategy(values, strategy);
      kpiScores[sysKPIFinal] = finalValue;
    }
  }

  return kpiScores;
};

export const summariseKPIHandler = async (
  uid: string,
  gameId: string,
  overRideSprintId?: string,

  // sprintId: string,
) => {
  const { gameType, sprintId } = await getSprintId(gameId);
  // const sprintId = "month-1";
  // console.log("HHHH", gameType);
  // throw new Error("hi");
  // console.log("gameType", gameType, sprintId);
  // throw new Error("hi");

  if (gameType === "individual") {
    // console.log("HHHH 1");
    await summariseForUser(
      uid,
      gameId,
      overRideSprintId ? overRideSprintId : sprintId,
    );
  } else if (gameType === "team") {
    // console.log("team");
    await summariseForUser(
      uid,
      gameId,
      overRideSprintId ? overRideSprintId : sprintId,
    );

    // console.log("summariseForTeam");
    await summariseForTeam(
      uid,
      gameId,
      overRideSprintId ? overRideSprintId : sprintId,
    );
  }
};

export const summariseForEachTask = async (
  uid: string,
  gameId: string,
  taskId: string,
) => {
  const { sprintId } = await getSprintId(gameId);

  if (sprintId) {
    // const gameTasks = await getAllGameTasks(gameId);
    const summaryHolder: Partial<Record<SystemKPIs, number[]>> = {};
    // for (const task of gameTasks) {
    const progress = await getTaskProgress(uid, taskId);
    if (progress) {
      const summaryValues = progress.gameSprintKPIValues;
      if (
        summaryValues &&
        summaryValues[gameId] &&
        summaryValues[gameId][sprintId]
      ) {
        const gameSummaryValues = summaryValues[gameId][sprintId];

        for (const kpi of Object.keys(gameSummaryValues)) {
          const kpiType = kpi as SystemKPIs;

          const val = gameSummaryValues[kpiType];

          if (summaryHolder[kpiType]) {
            summaryHolder[kpiType]?.push(val ? val : 0);
          } else if (!summaryHolder[kpiType]) {
            summaryHolder[kpiType] = [];
            summaryHolder[kpiType]?.push(val ? val : 0);
          }
        }
      }
    }
    // }

    // sumarise all tasks and add to rank
    const kpiScores: KPIValue = {};

    for (const kpi of Object.keys(summaryHolder)) {
      const sysKPIFinal = kpi as SystemKPIs;
      const values = summaryHolder[sysKPIFinal];

      if (values) {
        const strategy = KPIConfig[sysKPIFinal].strategy;

        const finalValue = summariseAsPerStrategy(values, strategy);
        kpiScores[sysKPIFinal] = finalValue;
      }
    }

    await kpiRankUpdate(gameId, uid, kpiScores, sprintId);
  }
};

// export const sumariseHandler = async (uid: string, gameId: string) => {
//   // get all game tasks
//   const gameTasks = await getAllGameTasks(gameId);
//   // console.log("g", gameTasks.length);

//   //   const taskProgObj: { [taskId: string]: TaskProgress } = {};
//   const summaryObjList: Partial<Record<SystemKPIs, number[]>> = {};
//   // get summaries for all tasks
//   for (const task of gameTasks) {
//     const progress = await getTaskProgress(uid, task.id);

//     if (progress) {
//       // console.log("g", task.name, progress);

//       const alues = progress.gameSprintKPIValues;

//       if (values) {
//         for (const prog of Object.keys(values)) {
//           const sysKPI = prog as SystemKPIs;

//           // console.log("sysKPI", sysKPI);

//           if (summaryObjList[sysKPI]) {
//             const val = values[sysKPI];
//             summaryObjList[sysKPI] = [val ? val : 0];
//           } else {
//             const val = progress.values[sysKPI];
//             // console.log("v", val, progress.values);
//             summaryObjList[sysKPI] = [];
//             summaryObjList[sysKPI]?.push(val ? val : 0);
//           }
//         }
//       }

//       //   taskProgObj[task.id] = progress;
//     }
//   }

//   // console.log("summaryObjList", summaryObjList);

//   // sumarise all tasks and add to rank
//   const kpiScores: ActivityKPIScore = {};
//   for (const kpi of Object.keys(summaryObjList)) {
//     const sysKPIFinal = kpi as SystemKPIs;
//     const values = summaryObjList[sysKPIFinal];

//     if (values) {
//       const strategy = KPIConfig[sysKPIFinal].strategy;

//       const finalValue = summariseAsPerStrategy(values, strategy);
//       kpiScores[sysKPIFinal] = finalValue;
//     }
//   }

//   // update user rank
//   await kpiRankUpdate(gameId, uid, kpiScores);
// };

const summariseAsPerStrategy = (
  values: number[],
  strategy: goalResolutionStrategy,
) => {
  if (strategy === "avg") {
    return avgNumbers(values);
  } else if (strategy === "max") {
    return maxNumbers(values);
  } else if (strategy === "min") {
    return minNumbers(values);
  } else if (strategy === "sum") {
    return sumNumbers(values);
  }

  return 0;
};

const sumNumbers = (values: number[]) => {
  return values.reduce((acc, item) => acc + item, 0);
};

const maxNumbers = (values: number[]) => {
  let max: number = 0;

  for (const val of values) {
    if (val && max < val) {
      max = val;
    }
  }

  return max;
};

const minNumbers = (values: number[]) => {
  let min: number = Number.POSITIVE_INFINITY;

  for (const val of values) {
    // const val =
    //   act.goalScores && act.goalScores[kpi] ? act.goalScores[kpi] : undefined;
    if (val && min > val) {
      min = val;
    }
  }

  return min;
};

const avgNumbers = (values: number[]) => {
  return sumNumbers(values) / (values.length ? values.length : 1);
};
