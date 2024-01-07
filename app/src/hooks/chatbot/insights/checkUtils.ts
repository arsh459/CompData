import { periodDateType } from "@models/User/User";
import {
  MAXIMUM_CYCLE_LENGTH,
  MAX_NORMAL_PERIOD_LENGTH,
  MINIMUM_CYCLE_LENGTH,
  MIN_NORMAL_PERIOD_LENGTH,
} from "./constants";

export const isLongerThanUsualPeriod = (
  type: periodDateType,
  phaseLength?: number,
  predictedPeriodLength?: number
) => {
  // exceeding max length

  if (
    type === "PERIOD" &&
    typeof phaseLength === "number" &&
    phaseLength > MAX_NORMAL_PERIOD_LENGTH
  ) {
    return true;
  }

  // exceeding than expected
  if (
    type === "PERIOD" &&
    typeof phaseLength === "number" &&
    predictedPeriodLength &&
    phaseLength > predictedPeriodLength
  ) {
    return true;
  }
};

export const isMissedPeriod = (type: periodDateType) => {
  if (type === "ESTIMATED_PERIOD") {
    return true;
  }
};

export const isShorterPeriod = (
  type: periodDateType,

  actualPeriodLength: number,
  phaseDay?: number,
  predictedPeriodLength?: number
) => {
  // 1 day period is too short
  if (type === "FOLLICULAR" && actualPeriodLength < MIN_NORMAL_PERIOD_LENGTH) {
    return true;
  }

  // period is over. Follicular stage now
  if (type === "FOLLICULAR" && typeof phaseDay === "number" && phaseDay === 0) {
    // if predicted is 3, and user got 2 day period
    if (predictedPeriodLength && actualPeriodLength < predictedPeriodLength) {
      return true;
    }
  }
};

export const isEarlyPeriod = (
  type: periodDateType,
  lastCycleLength: number,
  predictedCycleLength?: number
) => {
  // if user got in less than lower minimum
  if (type === "PERIOD" && lastCycleLength < MINIMUM_CYCLE_LENGTH) {
    return true;
  }

  if (predictedCycleLength) {
    const diff = Math.abs(lastCycleLength - predictedCycleLength);

    // if predicted period length is 21, and user got in 18
    if (type === "PERIOD" && diff > 2) {
      return true;
    }
  }
};

export const isLongerThanUsualCycle = (
  predictedCycleLength: number,
  currentCycleLength: number
) => {
  if (currentCycleLength > MAXIMUM_CYCLE_LENGTH) {
    return true;
  }
  if (currentCycleLength > predictedCycleLength + 2) {
    return true;
  }
};

export const isShorterThanUsualCycle = (
  predictedCycleLength: number,
  currentCycleLength: number
) => {
  if (currentCycleLength < MINIMUM_CYCLE_LENGTH) {
    return true;
  }
  if (currentCycleLength < predictedCycleLength) {
    return true;
  }
};
