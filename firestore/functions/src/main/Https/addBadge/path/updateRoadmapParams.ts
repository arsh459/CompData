import {
  transformationIconTypes,
  workType,
} from "../../../../models/User/User";
import {
  kpiGoalObj,
  monthGoalObj,
  roadmapActionType,
} from "./createRoadmapUtils";
import { getGoalDelta } from "./getGoalDelta";

const shouldGoAhead = (action: roadmapActionType, i: number, end: number) => {
  switch (action) {
    case "everyMonth":
      return true;
    case "atEnd":
      return i === end;
    case "everyThreeMonth":
      const remainder = i % 3;
      return remainder === 0 && i ? true : false;
  }
};

export const updateRoadmapParams = (
  numMonths: number,
  goal: transformationIconTypes,
  previous: { [monthNumber: number]: monthGoalObj },
  action: roadmapActionType,
  work: workType,
) => {
  for (let i: number = 0; i < numMonths; i++) {
    const proceedFlag = shouldGoAhead(action, i + 1, numMonths);

    if (proceedFlag) {
      const { delta, target, perc, countNeededForMonth } = getGoalDelta(
        work,
        action,
        i,
        numMonths,
      );

      const newKPIObj: kpiGoalObj = {
        type: goal,
        delta,
        comparisonType: work.action,
        target,
        perc,
        countNeeded: countNeededForMonth,
      };
      console.log("kpi obj", i, newKPIObj);

      if (previous[i] && !previous[i].goals[goal]) {
        previous[i] = {
          ...previous[i],
          goals: {
            ...previous[i].goals,
            [goal]: newKPIObj,
          },
        };
      } else {
        previous[i] = {
          monthNumber: i,
          goals: {
            [goal]: newKPIObj,
          },
        };
      }
    } else {
      console.log("Not proceeding in month", i);
    }

    // if (proceedFlag && previous[i] && !previous[i].goals[goal]) {
    //   const { delta, target, perc, countNeededForMonth } = getGoalDelta(
    //     work,
    //     action,
    //     i,
    //     numMonths,
    //   );

    //   console.log("delta month", delta);
    //   console.log("target month", target);

    //   const newKPIObj: kpiGoalObj = {
    //     type: goal,
    //     delta,
    //     comparisonType: work.action,
    //     target,
    //     perc,
    //     countNeeded: countNeededForMonth,
    //   };

    //   previous[i] = {
    //     ...previous[i],
    //     goals: {
    //       ...previous[i].goals,
    //       [goal]: newKPIObj,
    //     },
    //   };
    // } else if (proceedFlag) {
    //   const { delta, target, perc, countNeededForMonth } = getGoalDelta(
    //     work,
    //     action,
    //     i,
    //     numMonths,
    //   );

    //   // console.log("delta month", delta);
    //   // console.log("target month", target);

    //   const newKPIObj: kpiGoalObj = {
    //     type: goal,
    //     delta,
    //     comparisonType: work.action,
    //     target,
    //     perc,
    //     countNeeded: countNeededForMonth,
    //   };
    //   previous[i] = {
    //     monthNumber: i,
    //     goals: {
    //       [goal]: newKPIObj,
    //     },
    //   };
    // }
  }

  return previous;
};
