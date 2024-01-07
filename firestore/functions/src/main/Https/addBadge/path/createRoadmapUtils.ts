import {
  goalActionType,
  transformationIconTypes,
  workType,
} from "../../../../models/User/User";
import { updateRoadmapParams } from "./updateRoadmapParams";

export const WEIGHT_PER_MONTH = 2;

export const getWeightlossMonths = (work: workType) => {
  if (work.delta <= 10) {
    return Math.ceil(work.delta / WEIGHT_PER_MONTH);
  } else if (work.delta > 10 && work.delta < 18) {
    return Math.ceil(work.delta / 3);
  } else {
    return Math.ceil(work.delta / 4);
  }
};

const getCycleLengthMonths = (work: workType) => {
  if (work.delta < 15) {
    return 3;
  } else if (work.delta >= 15 && work.delta < 30) {
    return 6;
  } else {
    return 12;
  }
};

const getMonthsForMood = () => {
  return 4;
};

const getMonthsForEnergy = () => {
  return 2;
};

const getMonthsForSkin = () => {
  return 6;
};

const getMonthsForSleep = (work: workType) => {
  if (work.delta <= 2) {
    return 3;
  } else if (work.delta > 2 && work.delta < 6) {
    return 6;
  } else {
    return 12;
  }
};

export interface kpiGoalObj {
  type: transformationIconTypes;
  target: number;
  delta: number;
  comparisonType: goalActionType;
  perc: number;

  // minimum number of values in month
  countNeeded: number; // minimum 3 times, targetValue
}

export interface monthGoalObj {
  monthNumber: number;
  goals: Partial<Record<transformationIconTypes, kpiGoalObj>>;
}

export type roadmapActionType = "everyMonth" | "atEnd" | "everyThreeMonth";

// const updateMonthObj = (months: number) => {
//   for (let i: number = 0; i < months; i++) {}
// };

export const handleIncMonth = (
  totalMonths: number,
  userMonthObj: {
    [monthNumber: number]: monthGoalObj;
  },
  monthIncNeeded: boolean,
) => {
  if (monthIncNeeded) {
    const zeroMonthObj = userMonthObj[0];
    // console.log("zeroMonthObj", zeroMonthObj);

    if (zeroMonthObj) {
      const updatedMonthObj: { [monthNum: number]: monthGoalObj } = {};

      const zeroMonthGoals: Partial<
        Record<transformationIconTypes, kpiGoalObj>
      > = {};

      for (const key of Object.keys(zeroMonthObj.goals)) {
        const goal = key as transformationIconTypes;

        if (goal === "bad_mood" || goal === "mood") {
          zeroMonthGoals[goal] = {
            type: goal,
            target: 5,
            delta: 0,
            comparisonType: "maintain",
            perc: 0,

            // minimum number of values in month
            countNeeded: 1,
          };
        } else if (goal === "energy" || goal === "fatigue") {
          zeroMonthGoals[goal] = {
            type: goal,
            target: 3,
            delta: 0,
            comparisonType: "maintain",
            perc: 0,

            // minimum number of values in month
            countNeeded: 1,
          };
        }

        // console.log("goal", goal, zeroMonthGoals);
      }

      // console.log("zeroMonthGoals", zeroMonthGoals);

      const newZeroethMonthObj: monthGoalObj = {
        monthNumber: 0,
        goals: zeroMonthGoals,
      };

      for (const monthNumber of Object.keys(userMonthObj)) {
        const monthCt = parseInt(monthNumber);
        updatedMonthObj[monthCt + 1] = {
          ...userMonthObj[monthCt],
          monthNumber: monthCt + 1,
        };
      }

      updatedMonthObj[0] = newZeroethMonthObj;

      console.log("");
      console.log("");
      console.log("ZERO MONTH INCREMENTED");
      console.log("Zeroeth month", newZeroethMonthObj.goals);
      console.log("");
      console.log("");

      return {
        totalMonths: totalMonths + 1,
        updatedMonthObj,
      };
    }
  }

  return {
    totalMonths: totalMonths,
    updatedMonthObj: userMonthObj,
  };
};

export const getMonthsNeeded = (
  workToBeDone: workType[],
): {
  totalMonths: number;
  monthsObj: { [monthNumber: number]: monthGoalObj };
} => {
  let months: number = 0;

  let monthsObj: { [monthNumber: number]: monthGoalObj } = {};
  for (const work of workToBeDone) {
    console.log();
    console.log(
      "work",
      work.type,
      " month target",
      work.target,
      " count",
      work.countNeeded,
      " delta",
      work.delta,
      " minValue",
      work.minValue,
      " action",
      work.action,
    );
    if (work.delta)
      if (work.type === "weight") {
        const monthsForWeightloss = getWeightlossMonths(work);

        monthsObj = updateRoadmapParams(
          monthsForWeightloss,
          "weight",
          monthsObj,
          "everyMonth",
          work,
        );

        if (monthsForWeightloss > months) {
          months = monthsForWeightloss;
        }
      } else if (work.type === "cycleLength") {
        const monthsForCycleLength = getCycleLengthMonths(work);

        monthsObj = updateRoadmapParams(
          monthsForCycleLength,
          "cycleLength",
          monthsObj,
          "everyThreeMonth",
          work,
        );

        if (monthsForCycleLength > months) {
          months = monthsForCycleLength;
        }
      } else if (work.type === "bad_mood" || work.type === "mood") {
        const monthsForMood = getMonthsForMood();

        monthsObj = updateRoadmapParams(
          monthsForMood,
          work.type,
          monthsObj,
          "everyMonth",
          work,
        );

        if (monthsForMood > months) {
          months = monthsForMood;
        }
      } else if (work.type === "energy" || work.type === "fatigue") {
        const monthsForEnergy = getMonthsForEnergy();

        monthsObj = updateRoadmapParams(
          monthsForEnergy,
          work.type,
          monthsObj,
          "everyMonth",
          work,
        );

        if (monthsForEnergy > months) {
          months = monthsForEnergy;
        }
      } else if (
        work.type === "acne" ||
        work.type === "darkening_skin" ||
        work.type === "facial_and_excess_hair" ||
        work.type === "hairfall"
      ) {
        const monthsForSkin = getMonthsForSkin();

        monthsObj = updateRoadmapParams(
          monthsForSkin,
          work.type,
          monthsObj,
          "everyThreeMonth",
          work,
        );

        if (monthsForSkin > months) {
          months = monthsForSkin;
        }
      } else if (work.type === "sleep") {
        const monthsForSleep = getMonthsForSleep(work);

        monthsObj = updateRoadmapParams(
          monthsForSleep,
          work.type,
          monthsObj,
          "everyThreeMonth",
          work,
        );

        if (monthsForSleep > months) {
          months = monthsForSleep;
        }
      }
  }

  return {
    totalMonths: months,
    monthsObj,
  };
};
