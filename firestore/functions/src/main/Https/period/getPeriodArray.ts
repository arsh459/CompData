import { getCycleToAddAndRemove } from "../../../models/User/Methods";
import { Cycle, PeriodDateObj } from "../../../models/User/User";
import { isFinalDateInFuture, isPeriodInPast } from "./futureUtils";
// import { getDayStartForTz } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
// import { getDateBucket } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
// import { getPeriodDateObj } from "../../../models/User/Methods";
import {
  calculateEMA,
  daysBetweenDates,
  //   findConsecutiveDateSets,
  generatePeriodDates,
  getDaysToToday,
  //   getMenstrualPhaseSplitV2,
  getMenstrualPhaseSplitV3,
  getUpdatedMenstruatingDates,
} from "./utils";

export const WEEK_PREDICTION_WINDOW = 4;
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const ALPHA_VALUE_FOR_USER = 0.3;
export const DEFAULT_CYCLE_LENGTH = 30;
export const DEFAULT_PERIOD_LENGTH = 5;
export const PERIOD_LENGTH_LOWER = 3;
export const PERIOD_LENGTH_UPPER = 6;
export const CYCLE_LENGTH_LOWER = 21;
export const CYCLE_LENGTH_UPPER = 35;

// if user is refreshing periods,
//

export const handleCycleResponse = async (
  // uid: string,
  sortedResponse: string[][],
  timezoneString: string,
  pastUserCycles: { [cycleId: string]: Cycle },
  deleteOld: boolean,
  inputCycleLength?: number,
  inputPeriodLength?: number,
  currentUserCycle?: Cycle,
) => {
  const cyclesToSave: Cycle[] = [];
  const periodLengths: number[] = [];
  const periodObjsToSave: PeriodDateObj[][] = [];
  const pastCycles: number[] = [];
  let needsFuture: boolean = false;

  // get base lengths
  let lastCycleLength: number = inputCycleLength
    ? inputCycleLength
    : DEFAULT_CYCLE_LENGTH;
  let lastPeriodLength: number = inputPeriodLength
    ? inputPeriodLength
    : DEFAULT_PERIOD_LENGTH;

  console.log("lastCycleLength", lastCycleLength);
  console.log("lastPeriodLength", lastPeriodLength);

  for (let i: number = 0; i < sortedResponse.length; i++) {
    const currentPeriod = sortedResponse[i];
    const nextPeriod = sortedResponse[i + 1];

    if (nextPeriod && currentPeriod) {
      const daysBetween = daysBetweenDates(currentPeriod[0], nextPeriod[0]);

      pastCycles.push(daysBetween);

      const { periodCharacter, dateBasePeriodObjs } = getPeriodDateObjArray(
        currentPeriod[0],
        currentPeriod.length,
        daysBetween,
        timezoneString,
        currentPeriod.length,
      );

      const firstPeriodDateObj = dateBasePeriodObjs[0];
      const secondPeriodDateObj =
        dateBasePeriodObjs[dateBasePeriodObjs.length - 1];

      const { cycleToUse } = getCycleToAddAndRemove(
        pastUserCycles,
        firstPeriodDateObj.date,
        secondPeriodDateObj.date,
        dateBasePeriodObjs.length,
        firstPeriodDateObj.unix,
        secondPeriodDateObj.unix,
        periodCharacter,
      );

      // const newCycleCreated = createNewCycle(
      //   detailedCycleArray.length,
      //   firstPeriodDateObj.date,
      //   secondPeriodDateObj.date,
      //   firstPeriodDateObj.unix,
      //   secondPeriodDateObj.unix,
      // );
      lastCycleLength = daysBetween;
      lastPeriodLength = currentPeriod.length;

      periodLengths.push(currentPeriod.length);
      cyclesToSave.push(cycleToUse);
      periodObjsToSave.push(dateBasePeriodObjs);
    } else {
      const daysToToday = getDaysToToday(currentPeriod[0], timezoneString);

      console.log("last date", currentPeriod[0]);
      console.log("daysToToday", daysToToday);

      const delay = getDelay(currentUserCycle);
      console.log("delay", delay);

      const cycleLengthToUseWithoutDelay = estimateCycleLength(
        pastCycles,
        lastCycleLength,
        daysToToday,
        deleteOld,
      );
      const periodLengthToUse = estimatePeriodLength(
        periodLengths,
        lastPeriodLength,
      );

      const updatedPeriodDates = getUpdatedMenstruatingDates(
        timezoneString,
        currentPeriod,
        periodLengthToUse,
      );

      console.log("updatedPeriodDates", updatedPeriodDates);

      const cycleLengthToUse = cycleLengthToUseWithoutDelay + delay;

      console.log("cycleLengthToUseWithoutDelay", cycleLengthToUseWithoutDelay);
      console.log("cycleLengthToUse", cycleLengthToUse);
      console.log("pastCycles", pastCycles);
      console.log("new cycleLengthToUse", cycleLengthToUse);
      console.log("periodLengths", periodLengths);
      console.log("new periodLengthToUse", periodLengthToUse);

      lastCycleLength = cycleLengthToUse;
      lastPeriodLength = periodLengthToUse;

      console.log("currentPeriod[0]", currentPeriod[0]);

      const isInFuture = isFinalDateInFuture(
        currentPeriod[0],
        cycleLengthToUse,
        timezoneString,
      );

      console.log(
        "currentPeriod[currentPeriod.length - 1]",
        currentPeriod[currentPeriod.length - 1],
      );

      const periodInPast = isPeriodInPast(
        currentPeriod[currentPeriod.length - 1],
        timezoneString,
      );

      console.log("periodInPast", periodInPast);

      console.log("isInFuture", isInFuture);

      needsFuture = isInFuture ? false : true;

      console.log("needsFuture", needsFuture);

      const { dateBasePeriodObjs, periodCharacter } = getPeriodDateObjArray(
        currentPeriod[0],
        currentPeriod.length,
        cycleLengthToUse,
        timezoneString,
        periodInPast
          ? currentPeriod.length
          : isInFuture
          ? periodLengthToUse
          : currentPeriod.length,
      );

      const firstPeriodDateObj = dateBasePeriodObjs[0];
      const secondPeriodDateObj =
        dateBasePeriodObjs[dateBasePeriodObjs.length - 1];

      const { cycleToUse } = getCycleToAddAndRemove(
        pastUserCycles,
        firstPeriodDateObj.date,
        secondPeriodDateObj.date,
        dateBasePeriodObjs.length,
        firstPeriodDateObj.unix,
        secondPeriodDateObj.unix,
        periodCharacter,
      );

      cyclesToSave.push(cycleToUse);
      periodObjsToSave.push(dateBasePeriodObjs);
    }
  }

  // const cyclesToDelete = getCyclesToDelete(cyclesToSave, pastUserCycles);

  return {
    cyclesToSave,
    // cyclesToDelete,
    periodObjsToSave,
    lastCycleLength,
    lastPeriodLength,
    needsFuture,
  };
};

export const getPeriodDateObjArray = (
  initialDate: string,
  menstruatingDates: number,
  cycleLength: number,
  timezoneString: string,
  estimatedPeriodLength: number,
) => {
  const periodCharacter = getMenstrualPhaseSplitV3(
    menstruatingDates,
    cycleLength,
    estimatedPeriodLength && estimatedPeriodLength > menstruatingDates
      ? estimatedPeriodLength
      : menstruatingDates,
  );

  console.log("periodCharacter", periodCharacter);

  //   throw new Error("Hi I am paused");

  const dateBasePeriodObjs = generatePeriodDates(
    initialDate,
    periodCharacter,
    cycleLength,
    timezoneString,
  );

  //   console.log("dateBasePeriodObjs", dateBasePeriodObjs);

  return { dateBasePeriodObjs, periodCharacter };
};

function calculateSD(arr: number[]): number {
  let mean = arr.reduce((sum, value) => sum + value, 0) / arr.length;

  let variance =
    arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    (arr.length - 1);

  return Math.sqrt(variance);
}

export const estimatePeriodLength = (
  pastPeriods: number[],
  defaultLength: number,
) => {
  let newPeriodLength: number = defaultLength;

  const newPeriodLengthArray = calculateEMA(
    pastPeriods,
    ALPHA_VALUE_FOR_USER,
    // pastCycles.length,
  );

  if (newPeriodLengthArray.length)
    newPeriodLength = newPeriodLengthArray[newPeriodLengthArray.length - 1];

  return Math.round(newPeriodLength);
};

const estimateAlphaValue = (sd: number) => {
  if (sd < 5) {
    return 0.1;
  } else if (sd >= 5 && sd < 10) {
    return 0.2;
  } else if (sd >= 10 && sd < 15) {
    return 0.3;
  } else {
    return 0.35;
  }
};

export const getDelay = (currentUserCycle?: Cycle) => {
  if (currentUserCycle?.delayLength) {
    return currentUserCycle.delayLength;
  }

  return 0;
};

export const estimateCycleLength = (
  pastCycles: number[],
  defaultLength: number,
  daysToToday: number,
  deleteOld: boolean,
) => {
  let newCycleLength: number = defaultLength;

  const cycleSD = calculateSD(pastCycles);
  console.log("cycleSD", cycleSD);

  const alpha = estimateAlphaValue(cycleSD);

  const newCycleLengthArray = calculateEMA(
    pastCycles,
    alpha,
    // pastCycles.length,
  );

  if (newCycleLengthArray.length)
    newCycleLength = newCycleLengthArray[newCycleLengthArray.length - 1];

  // if cycle length is longer than predicted
  if (newCycleLength < daysToToday) {
    if (deleteOld) {
      return daysToToday;
    } else {
      return daysToToday - 1;
    }
  }

  return Math.round(newCycleLength);
};
