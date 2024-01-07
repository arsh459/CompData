import { format } from "date-fns";
import {
  AchievementPathData,
  AchievementPathDataItem,
  TitleInterface,
  transformationIconTypes,
  // AchievementPathDataItem,
  // transformationIconTypes,
} from "../../../../models/User/User";
// import { customisedPlanObj, icons } from "./constants";
import { kpiGoalObj, monthGoalObj } from "./createRoadmapUtils";
import { v4 as uuid } from "uuid";
import { customisedPlanObj, iconMap } from "./constants";

export const needsMonthInc = () => {
  const daysLeft = getDaysLeftToMonthEnd();

  if (daysLeft < 10) {
    return true;
  }
  return false;
};

export const createAchievementPath = (
  goalObj: monthGoalObj,
  monthInc: boolean,
  totalMonths: number,
): AchievementPathData => {
  const startTime = getStartTime(goalObj.monthNumber, monthInc);
  const endTime = getEndTime(goalObj.monthNumber, monthInc);

  console.log("Month Goals", format(new Date(startTime), "dd MMM yy"));

  return {
    id: uuid(),
    startTime: startTime,
    endTime: endTime,
    title: getTitleForGoalObj(goalObj.monthNumber, totalMonths, startTime),
    items: getMonthDataItemsV2(goalObj),
  };
};

const getStartTime = (monthNumber: number, monthInc: boolean) => {
  const startDate = getStartOfMonthXMonthsFromNow(
    monthNumber + (monthInc ? 1 : 0),
  );
  return startDate.getTime();
};

const getEndTime = (monthNumber: number, monthInc: boolean) => {
  const startDate = getEndOfMonthXMonthsFromNow(
    monthNumber + (monthInc ? 1 : 0),
  );
  return startDate.getTime();
};

function getDaysLeftToMonthEnd() {
  let now = new Date(); // Get current date
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const msLeft = end.getTime() - now.getTime();
  return Math.ceil(msLeft / (24 * 60 * 60 * 1000));
}

function getStartOfMonthXMonthsFromNow(x: number): Date {
  let now = new Date(); // Get current date
  // Create a new date object for the first day of the month that is x months from now
  return new Date(now.getFullYear(), now.getMonth() + x, 1);
}

function getEndOfMonthXMonthsFromNow(x: number): Date {
  let now = new Date(); // Get current date
  // Create a new date object for the last day of the month that is x months from now
  return new Date(now.getFullYear(), now.getMonth() + x + 1, 0);
}

const getTitleForGoalObj = (
  monthNumber: number,
  totalMonths: number,
  start: number,
): TitleInterface => {
  const perc = Math.round(((monthNumber + 1) / totalMonths) * 100);
  return {
    text: `${format(new Date(start), "MMMM yyyy")} (${perc}% goal)`,
  };
};

const getMonthDataItemsV2 = (goalObj: monthGoalObj) => {
  const items: AchievementPathDataItem[] = [];

  if (goalObj.monthNumber === 0) {
    items.push(customisedPlanObj);
  }

  const goals = goalObj.goals;
  for (const goal of Object.keys(goals)) {
    const goalStr = goal as transformationIconTypes;
    const kpiObj = goals[goalStr];

    if (kpiObj) {
      const monthGoal = {
        icon: iconMap[goalStr],
        text: getKPIString(kpiObj),
        type: goalStr,

        // delta: kpiObj.delta,
        comparisonType: kpiObj.comparisonType,
        target: kpiObj.target,
        countNeeded: kpiObj.countNeeded,
      };
      items.push(monthGoal);

      console.log("achievemnt path", monthGoal.text);
    }
  }

  return items;
};

const getPercImp = (kpiObj: kpiGoalObj) => {
  const monthTargetPerc = kpiObj.perc;
  return Math.round(monthTargetPerc * 100);
};

const getDaysObj = (kpiObj: kpiGoalObj) => {
  return kpiObj.countNeeded;
};

const getKPIString = (kpiObj: kpiGoalObj): string => {
  switch (kpiObj.type) {
    case "weight":
      return getWeightText(kpiObj);
    case "acne":
      return `Reduce acne: ${getPercImp(kpiObj)}%`;
    case "bad_mood":
    case "mood":
      const perc = getPercImp(kpiObj);
      // console.log("perc mood", perc);
      return perc >= 100 ? `Happy 24 x 7` : `Improve mood`; // `${getDaysObj(kpiObj)} Happy Days`;
    case "cycleLength":
      return `${kpiObj.target} day Cycle`;
    case "darkening_skin":
      return `Skin Lightning: ${getPercImp(kpiObj)}%`;
    case "energy":
    case "fatigue":
      const perc2 = getPercImp(kpiObj);
      // console.log("fatigue mood", perc2);
      return perc2 >= 100 ? `Energetic 24 x 7` : `Better energy`;
    // return `${getDaysObj(kpiObj)} Energetic Days`;
    case "facial_and_excess_hair":
      return `Fix Excess hair: ${getPercImp(kpiObj)}%`;
    case "hairfall":
      return `Fix hairfall: ${getPercImp(kpiObj)}%`;
    case "sleep":
      return `${kpiObj.target}Hrs sleep for ${getDaysObj(kpiObj)} days`;
    case "periodLength":
      return `${kpiObj.target} day Period`;
  }
};

const getWeightText = (kpiObj: kpiGoalObj): string => {
  return `${kpiObj.target} Kg Weight`;

  // return `${kpiObj.comparisonType === "reduce" ? "Reduce" : "Gain"} ${
  //   kpiObj.delta
  // } Kg${kpiObj.delta > 1 ? "s" : ""}`;
};
