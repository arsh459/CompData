import { workType } from "../../../../models/User/User";
import { roadmapActionType } from "./createRoadmapUtils";
import { getStepsForMonth } from "./getGoalDelta";

export const getGoalDeltaForMaintain = (
  work: workType,
  action: roadmapActionType,
  monthNumber: number,
  totalMonths: number,
) => {
  return {
    target: work.target,
    countNeededForMonth: work.countNeeded, // streak length
    // delta: totalMonths -
    delta: totalMonths - (monthNumber + 1),
    perc: (monthNumber + 1) / totalMonths,
  };

  const { stepNumber, steps } = getStepsForMonth(
    monthNumber,
    action,
    totalMonths,
  );

  const targetDays = work.countNeeded;
  //   console.log("targetDays", targetDays);

  const workPerStep = targetDays / steps;
  //   console.log("workPerStep", workPerStep);
  const workPerStepRound = Math.ceil(workPerStep);
  //   console.log("workPerStepRound", workPerStepRound);

  let workDoneTillNow = stepNumber * workPerStepRound;
  //   console.log("workDoneTillNow", workDoneTillNow);

  let delta = workPerStepRound;
  if (workDoneTillNow > targetDays) {
    const expectedWorkToDo = workDoneTillNow;
    const excess = expectedWorkToDo - targetDays;

    delta = workPerStepRound - excess;

    workDoneTillNow = targetDays;
  }

  return {
    target: work.target,
    countNeededForMonth: workDoneTillNow,
    delta: delta,
    perc: workDoneTillNow / targetDays,
  };
};

// 25 days -> 3 months.
// 8 days in one month
//
