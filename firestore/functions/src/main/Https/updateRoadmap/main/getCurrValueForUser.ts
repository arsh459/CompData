import {
  AchievementPathDataItemTypes,
  UserInterface,
  goalActionType,
} from "../../../../models/User/User";
import {
  getEnergyDaysAfter,
  getLastCompletedCycle,
  // getLastWeightLog,
  getMoodDaysAfter,
  getSleepDaysAfter,
  getWeightInRange,
} from "../../../../models/User/roadmap";
import { achieverProgress } from "../../../../models/awards/interface";
import { getStreakProgressView } from "./streakView";

export const getCurrValueUser = async (
  user: UserInterface,
  type: AchievementPathDataItemTypes | undefined,
  countNeeded?: number,
  target?: number,
  monthStart?: number,
  monthEnd?: number,

  // comparison: goalActionType,
): Promise<
  | {
      value?: number;
      map?: achieverProgress;
      steps?: number;
      stepSize?: number;
      latestLoggedUnix?: number;
    }
  | undefined
> => {
  switch (type) {
    case "weight":
      if (monthStart && monthEnd) {
        const lastWeight = await getWeightInRange(
          user.uid,
          // monthStart,
          0,
          monthEnd,
        );

        // throw new Error("Paused");
        // if (lastWeight?.weight) {
        return {
          value: lastWeight?.weight,
          latestLoggedUnix: lastWeight?.unix,
        };
        // }
      }

    case "energy":
    case "fatigue":
      if (monthStart && countNeeded && target && monthEnd) {
        const objs = await getEnergyDaysAfter(user.uid, monthStart, monthEnd);

        const {
          progressValues,
          countSucess,
          steps,
          stepSize,
          latestLoggedUnix,
        } = getStreakProgressView(
          monthStart,
          countNeeded,
          2,
          "dailyEnergyObj",
          objs,
        );

        return {
          value: countSucess,
          map: progressValues,
          steps,
          stepSize,
          latestLoggedUnix,
        };
      }

    case "mood":
    case "bad_mood":
      if (monthStart && countNeeded && target && monthEnd) {
        const objs = await getMoodDaysAfter(user.uid, monthStart, monthEnd);

        // console.log("FETCH", objs);

        const {
          progressValues,
          countSucess,
          steps,
          stepSize,
          latestLoggedUnix,
        } = getStreakProgressView(
          monthStart,
          countNeeded,
          4,
          "dailyMoodObj",
          objs,
        );

        return {
          value: countSucess,
          map: progressValues,
          steps,
          stepSize,
          latestLoggedUnix,
        };
      }

    case "sleep":
      if (monthStart && countNeeded && target && monthEnd) {
        const objs = await getSleepDaysAfter(user.uid, monthStart, monthEnd);
        const {
          progressValues,
          countSucess,
          steps,
          stepSize,
          latestLoggedUnix,
        } = getStreakProgressView(
          monthStart,
          countNeeded,
          target,
          "dailySleepObj",
          objs,
        );
        return {
          value: countSucess,
          map: progressValues,
          steps,
          stepSize,
          latestLoggedUnix,
        };
      }

    case "cycleLength":
      const lastUserCycle = await getLastCompletedCycle(user.uid);
      if (lastUserCycle?.length)
        return {
          value: lastUserCycle?.length,
          latestLoggedUnix: lastUserCycle.startUnix,
        };

    case "periodLength":
      const lastUserCycleP = await getLastCompletedCycle(user.uid);
      if (lastUserCycleP?.phaseSplits.PERIOD.length)
        return { value: lastUserCycleP?.phaseSplits.PERIOD.length };

    // symptoms
    case "acne":

    case "darkening_skin":

    case "facial_and_excess_hair":

    case "hairfall":

    // case 'acne':
    default:
      return undefined;
  }
};

const getWeightSubtext = (diff: number, comparison: goalActionType) => {
  if (comparison === "reduce") {
    return `Lose ${diff}Kg${diff > 1 ? "s" : ""} to unlock`;
  } else if (comparison === "increase") {
    return `Gain ${diff}Kg${diff > 1 ? "s" : ""} to unlock`;
  } else {
    return `Maintain weight till month end`;
  }
};

const getFatigueSubtext = (targetCount: number) => {
  return `Log ${targetCount} Energetic day${
    targetCount > 1 ? "s" : ""
  } in a month`;
};

const getMoodSubtext = (targetCount: number) => {
  return `Log ${targetCount} Happy day${targetCount > 1 ? "s" : ""} in a month`;
};

const getSleepSubtext = (targetCount: number) => {
  return `Log ${targetCount} days with >8hr sleep in a month`;
};

const getCycleLengthText = (target: number) => {
  return `Unlocks when cycle length is ${target} days`;
};

const getPeriodLengthText = (target: number) => {
  return `Unlocks when period length is ${target} days`;
};

export const getProgressSubtext = (
  diff: number,
  target: number,
  targetCount: number,
  type: AchievementPathDataItemTypes,
  comparison: goalActionType,
) => {
  switch (type) {
    case "weight":
      return getWeightSubtext(diff, comparison);
    case "energy":
    case "fatigue":
      return getFatigueSubtext(targetCount);

    case "mood":
    case "bad_mood":
      return getMoodSubtext(targetCount);

    case "sleep":
      return getSleepSubtext(targetCount);

    case "cycleLength":
      return getCycleLengthText(target);
    // const lastUserCycle = await getLastCompletedCycle(user.uid);
    // return lastUserCycle?.length;

    case "periodLength":
      return getPeriodLengthText(target);
    // const lastUserCycleP = await getLastCompletedCycle(user.uid);
    // return lastUserCycleP?.phaseSplits.PERIOD.length;

    // symptoms
    case "acne":

    case "darkening_skin":

    case "facial_and_excess_hair":

    case "hairfall":

    // case 'acne':
    default:
      return undefined;
  }
};
