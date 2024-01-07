import { CoachRank, UserRank } from "@models/Activities/Activity";
import { GameKPITarget, gameTypes } from "@models/Event/Event";
import { KPIConfig, SystemKPIs } from "@models/Tasks/SystemKPIs";
import { GoalKPI } from "@models/Tasks/Task";

export interface GoalKPIList extends GoalKPI {
  actualValue: number;
  progress: number;
  color: string;
}

// const getProgressValue = (
//   progress: { [taskId: string]: TaskProgress },
//   taskId: string
// ) => {
//   if (progress[taskId]) {
//     return progress[taskId];
//   }

//   return undefined;
// };

const getKPIProgress = (
  kpi: SystemKPIs,
  value: number,
  targetValue: number
) => {
  const config = KPIConfig[kpi];
  if (config?.strategy === "min") {
    if (value && value <= targetValue) {
      return 1;
    } else if (value) {
      // console.log("value", value);
      // console.log("targetValue", targetValue);
      // console.log("diff", value - targetValue);
      const diff = value - targetValue;
      return (targetValue - diff) / targetValue;
    }
  }

  return targetValue ? (value ? value : 0) / targetValue : 0;
};

export const getGoalProgressParams = (
  kpis: GameKPITarget[],
  // progress: { [taskId: string]: TaskProgress },
  sprintId?: string,
  userRank?: UserRank,
  lastSprintId?: string,
  coachRank?: CoachRank,
  gameType?: gameTypes
) => {
  let rankObj: UserRank | CoachRank | undefined = userRank;
  if (gameType === "team") {
    rankObj = coachRank;
  }

  // console.log("co", coachRank?.kpiScoresV2, rankObj?.kpiScoresV2);

  const goalKPIList: GoalKPIList[] = [];
  let i: number = 0;
  for (const kpi of kpis) {
    const target = kpi.targetValue;
    // const label = KPIConfig[kpi.kpi].label;

    let val: number | undefined = 0;
    if (sprintId) {
      val =
        rankObj?.kpiScoresV2 &&
        sprintId &&
        rankObj.kpiScoresV2[sprintId] &&
        rankObj?.kpiScoresV2[sprintId][kpi.kpi]
          ? rankObj?.kpiScoresV2[sprintId][kpi.kpi]
          : 0;
    } else if (lastSprintId) {
      val =
        rankObj?.kpiScoresV2 &&
        lastSprintId &&
        rankObj.kpiScoresV2[lastSprintId] &&
        rankObj?.kpiScoresV2[lastSprintId][kpi.kpi]
          ? rankObj?.kpiScoresV2[lastSprintId][kpi.kpi]
          : 0;
    }

    const prog = getKPIProgress(kpi.kpi, val ? val : 0, target);

    goalKPIList.push({
      actualValue: val ? val : 0,
      progress: prog,
      color:
        // gameType === "team"
        // ? getAzadiGameColor(i)
        // :

        i === 0 ? "#2096E8" : i === 1 ? "#F19B38" : "#F15454",
      targetVal: target ? target : 0,
      // label: label,
      systemKPI: kpi.kpi,
    });

    i++;

    if (i === 3) {
      return goalKPIList;
    }
  }

  return goalKPIList;

  // for (const task of tasks) {
  //   if (task.goalKPIs)
  //     for (const singleKPI of task?.goalKPIs) {
  //       const progressValues = getProgressValue(progress, task.id);
  //       // const progressValues = progress[task.id];

  //       // if (progressValues) {
  //       const targetVal = singleKPI.targetVal ? singleKPI.targetVal : 1;

  //       const unitValue =
  //         progressValues && progressValues.values[singleKPI.unitLabel]
  //           ? progressValues.values[singleKPI.unitLabel]
  //           : 0;
  //       const percentProgress = unitValue / targetVal;

  //       goalKPIList.push({
  //         ...singleKPI,
  //         actualValue: unitValue ? unitValue : 0,
  //         progress: percentProgress,
  //         color: i === 0 ? "#2096E8" : i === 1 ? "#F19B38" : "#F15454",
  //       });

  //       i++;

  //       if (i === 3) {
  //         return goalKPIList;
  //       }
  //       // }
  //     }
  // }

  // return goalKPIList;
};

// const getAzadiGameColor = (index: number) => {
//   if (index === 0) {
//     return "#FF9933";
//   } else if (index === 1) {
//     return "#FFFFFF";
//   } else {
//     return "#138808";
//   }
// };

export const getPace = (seconds: number) => {
  const minutes = Math.round(seconds / 60);
  const resSec = seconds - minutes * 60;

  // console.log(minutes, resSec);

  return `${minutes}:${resSec >= 10 ? resSec : `0${resSec}`}`;
};
