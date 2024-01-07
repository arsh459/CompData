import {
  getCycleToAddAndRemove,
  getCyclesToDelete,
} from "../../../models/User/Methods";
import { Cycle, PeriodDateObj } from "../../../models/User/User";
import {
  getDateBucket,
  getDayStartForTz_DATE,
  isDateInFuture,
  isDateInPast,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { ONE_DAY_MS, getPeriodDateObjArray } from "./getPeriodArray";

export const isPeriodInPast = (periodEnd: string, tzString: string) => {
  return isDateInPast(periodEnd, tzString);
};

export const isFinalDateInFuture = (
  start: string,
  length: number,
  tzString: string,
) => {
  const unix = getDayStartForTz_DATE(tzString, start);
  // const startMoment = moment(unix).tz(tzString);

  if (unix) {
    const endUnix = unix + (length - 1) * ONE_DAY_MS;

    const dateBucket = getDateBucket(tzString, endUnix);

    console.log("CYCLE END DATE", dateBucket);
    return isDateInFuture(dateBucket, tzString);
  }

  return false;
};

export const findNumberOfFutureCycles = (
  periodObjsToSave: PeriodDateObj[][],
  needsFuture: boolean,
  cycleLength: number,
  tz: string,
) => {
  if (periodObjsToSave.length && needsFuture) {
    const lastCycleObjs = periodObjsToSave[periodObjsToSave.length - 1];

    if (lastCycleObjs.length) {
      const lastCycleObj = lastCycleObjs[lastCycleObjs.length - 1];

      const date = lastCycleObj.date;
      const dayStart = getDayStartForTz_DATE(tz, date);

      const now = Date.now();

      const dateToday = getDateBucket(tz, now);

      const unixToday = getDayStartForTz_DATE(tz, dateToday);

      if (unixToday && dayStart) {
        const periodStart = dayStart + ONE_DAY_MS;
        const periodStartDate = getDateBucket(tz, periodStart);

        const days = Math.ceil((unixToday - periodStart) / ONE_DAY_MS);

        console.log("days to extrapolate", days);

        const numberOfCycles = Math.ceil(days / cycleLength) + 1;

        console.log("numberOfCycles", numberOfCycles);

        return { numberOfCycles, date: periodStartDate };
      }
    }
  }

  return { numberOfCycles: 0, date: "" };
};

export const getFuturePeriodDates = (
  startDate: string,
  lastPeriodLength: number,
  lastCycleLength: number,
  numCycles: number,
  tz: string,
  pastUserCycles: { [cycleId: string]: Cycle },
) => {
  let initialDate: string = startDate;
  const cyclesToSave: Cycle[] = [];
  const periodObjsToSave: PeriodDateObj[][] = [];
  for (let i: number = 0; i < numCycles; i++) {
    // console.log("startDate", startDate);
    // console.log("lastPeriodLength", lastPeriodLength);
    // console.log("lastCycleLength", lastCycleLength);

    const { dateBasePeriodObjs, periodCharacter } = getPeriodDateObjArray(
      initialDate,
      0,
      lastCycleLength,
      tz,
      lastPeriodLength,
    );

    const firstPeriodDateObj = dateBasePeriodObjs[0];
    const secondPeriodDateObj =
      dateBasePeriodObjs[dateBasePeriodObjs.length - 1];

    const lastDate = secondPeriodDateObj.date;
    const lastDateUnix = getDayStartForTz_DATE(tz, lastDate);
    const nextDateUnix = (lastDateUnix ? lastDateUnix : 0) + ONE_DAY_MS;
    initialDate = getDateBucket(tz, nextDateUnix);

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

  //   const cyclesToDelete = getCyclesToDelete(cyclesToSave, pastUserCycles);

  return {
    futureCycles: cyclesToSave,
    futurePeriodDates: periodObjsToSave,
    // futureCyclesToDelete: cyclesToDelete,
  };
};

export const mergePastAndFuture = (
  cyclesInDb: { [cycleId: string]: Cycle },
  pastCycles: Cycle[],
  periodObjsToSave: PeriodDateObj[][],
  futureCycles: Cycle[],
  futurePeriodDates: PeriodDateObj[][],
) => {
  const cyclesToDelete = getCyclesToDelete(
    [...pastCycles, ...futureCycles],
    cyclesInDb,
  );

  return {
    finalCycles: [...pastCycles, ...futureCycles],
    cyclesToDelete,
    finalPeriodDates: [...periodObjsToSave, ...futurePeriodDates],
  };
};
