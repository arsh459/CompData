import { PeriodDateObj, UserInterface } from "../../../models/User/User";
import {
  getDateBucket,
  getDayStartForTz_DATE,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import { CYCLE_LENGTH_LOWER, PERIOD_LENGTH_UPPER } from "./getPeriodArray";

export const areSymptomsLogged = (cycleDate: PeriodDateObj) => {
  if (cycleDate.loggedSymptoms && Object.keys(cycleDate).length) {
    return {
      status: true,
      symptoms: cycleDate.loggedSymptoms,
    };
  }

  return {
    status: false,
  };
};

export type cycleDeviationTypes =
  | "missed_period"
  | "long_period"
  | "early_period"
  | "none";

export const isCycleDeviating = (
  user: UserInterface,
  cycleDate: PeriodDateObj,
  lastKnownCycleLength: number,
  estimatedCycleLength: number,
  estimatedPeriodLength: number,
): cycleDeviationTypes => {
  const tzString = getUserTimezone(
    user.recommendationConfig?.timezone?.tzString,
  );

  const dayStart = getDayStartForTz_DATE(tzString, cycleDate.date);
  if (dayStart) {
    const todayBucket = getDateBucket(tzString, dayStart);

    // date is today
    if (cycleDate.date === todayBucket) {
      // check if missedPeriod
      if (cycleDate.type === "ESTIMATED_PERIOD") {
        return "missed_period";
      }

      // check if longer than usual period
      if (
        cycleDate.type === "PERIOD" &&
        cycleDate.dayNumber &&
        cycleDate.dayNumber > PERIOD_LENGTH_UPPER // upper PL
      ) {
        return "long_period";
      }

      // check if early period
      if (
        cycleDate.type === "PERIOD" &&
        lastKnownCycleLength < CYCLE_LENGTH_LOWER
      ) {
        // if previous cycleLength was shorter
        return "early_period";
      }

      // check if shorter than usual period
      //   if (cycleDate.type === 'FOLLICULAR' && ){
      // get previous date
      //   }
    }
  }

  return "none";
};

export type cyclePhaseToUse =
  | "PERIOD"
  | "OVULATION"
  | "PMS"
  | "FERTILE"
  | "POST_PERIOD"
  | "LUTEAL"
  | "ESTIMATED_PERIOD";
export const getCyclePhaseToUse = (
  cycleDate: PeriodDateObj,
): cyclePhaseToUse | undefined => {
  if (cycleDate.type === "PERIOD") {
    return "PERIOD";
  } else if (cycleDate.type === "OVULATION") {
    return "OVULATION";
  } else if (
    cycleDate.type === "LUTEAL" &&
    cycleDate.phaseProgress &&
    cycleDate.phaseProgress > 0.7
  ) {
    return "PMS";
  } else if (
    cycleDate.type === "FOLLICULAR" &&
    cycleDate.phaseProgress &&
    cycleDate.phaseProgress > 0.7
  ) {
    return "FERTILE";
  } else if (cycleDate.type === "FOLLICULAR") {
    return "POST_PERIOD";
  } else if (cycleDate.type === "LUTEAL") {
    return "LUTEAL";
  } else if (cycleDate.type === "ESTIMATED_PERIOD") {
    return "ESTIMATED_PERIOD";
  }

  return undefined;
};
