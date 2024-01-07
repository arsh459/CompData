import { workType } from "../../../../models/User/User";
import { roadmapActionType } from "./createRoadmapUtils";
import { getGoalDeltaForMaintain } from "./getGoalDeltaForMaintain";

export const getStepsForMonth = (
  monthNumber: number,
  action: roadmapActionType,
  totalMonths: number,
) => {
  let steps: number = 1;
  let stepNumber: number = monthNumber + 1;

  if (action === "everyMonth") {
    steps = totalMonths;
    stepNumber = monthNumber + 1;
  } else if (action === "everyThreeMonth") {
    steps = Math.round(totalMonths / 3);
    stepNumber = Math.round((monthNumber + 1) / 3);
  } else if (action === "atEnd") {
    steps = 1;
    stepNumber = Math.round((monthNumber + 1) / totalMonths);
  }

  return {
    steps,
    stepNumber,
  };
};

export const getGoalDelta = (
  work: workType,
  //   workNeeded: number,
  //   finalValue: number,
  action: roadmapActionType,
  monthNumber: number,
  totalMonths: number,
  //   workAction: goalActionType,
): {
  delta: number;
  target: number;
  perc: number;
  countNeededForMonth: number;
} => {
  if (work.action === "maintain") {
    return getGoalDeltaForMaintain(work, action, monthNumber, totalMonths);
  }

  const { steps, stepNumber } = getStepsForMonth(
    monthNumber,
    action,
    totalMonths,
  );

  const workNeeded = work.delta;
  const finalValue = work.target;
  const workAction = work.action;

  const workPerStep = workNeeded / steps;
  // console.log("workPerStep", workPerStep);
  const workPerStepRound = Math.round(workPerStep);

  // console.log("workPerStepRound", workPerStepRound);

  const workDoneTillNow = stepNumber * workPerStepRound;

  // console.log("workDoneTillNow", workDoneTillNow);

  let startingValue = finalValue;
  let targetForMonth = finalValue;
  // console.log("finalValue", finalValue);

  if (workAction === "reduce") {
    startingValue = finalValue + workNeeded;
    const targetForMonthInt = startingValue - workDoneTillNow;
    // console.log("targetForMonthInt", targetForMonthInt);

    if (targetForMonthInt < finalValue) {
      targetForMonth = finalValue;
    } else {
      targetForMonth = targetForMonthInt;
    }
  } else if (workAction === "increase") {
    startingValue = finalValue - workNeeded;
    const targetForMonthInt = startingValue + workDoneTillNow;
    // console.log("targetForMonthInt", targetForMonthInt);

    if (targetForMonthInt > finalValue) {
      targetForMonth = finalValue;
    } else {
      targetForMonth = targetForMonthInt;
    }
  }

  // console.log("startingValue", startingValue);
  // console.log("targetForMonth", targetForMonth);

  return {
    delta: workPerStepRound,
    target: targetForMonth,
    perc: workDoneTillNow / workNeeded,
    countNeededForMonth: work.countNeeded,
  };
};
