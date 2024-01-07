import { PeriodDateObj, periodDateType } from "../../../models/User/User";
import { v4 as uuidv4 } from "uuid";
import {
  getDayStartForTz,
  //   getDayStartForTz,
  getDayStartForTz_DATE,
  isDateInFuture,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { ONE_DAY_MS } from "./getPeriodArray";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";

export const findConsecutiveDateSets = (dates: string[]) => {
  if (!dates || dates.length === 0) {
    return [];
  }

  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  let consecutiveDateSets = [];
  let temp = [dates[0]];

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const previousDate = new Date(dates[i - 1]);
    const nextDay = new Date(previousDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (currentDate.getTime() === nextDay.getTime()) {
      temp.push(dates[i]);
    } else {
      if (temp.length > 1) {
        consecutiveDateSets.push(temp);
      }
      temp = [dates[i]];
    }
  }

  if (temp.length > 1) {
    consecutiveDateSets.push(temp);
  }

  return consecutiveDateSets;
};

// const getRelevantCycles = (
//   periodDates: string[][],
//   periodDateMap: { [date: string]: PeriodDateObj },
// ) => {
//   for (let i: number = 0; i < periodDates.length; i++) {
//     const stPeriod = periodDates[i];
//     const nxPeriod = periodDates[i + 1];

//     // both cycles exist
//     if (nxPeriod && stPeriod) {
//     }
//   }
// };
// type DatePhase = {
//   date: string;
//   phase: "period" | "follicular" | "ovulation" | "luteal";
// };

// export function estimateFutureCycles(
//   periodDates: string[],
//   futureCycles: number,
// ): DatePhase[] {
//   if (!periodDates || periodDates.length === 0 || futureCycles <= 0) {
//     return [];
//   }

//   const periodLength = periodDates.length;
//   const averageCycleLength = 28;
//   const ovulationDay = averageCycleLength - 14;

//   const lastPeriodStartDate = new Date(periodDates[periodDates.length - 1]);
//   const futurePeriodStartDates = [];

//   for (let i = 0; i < futureCycles; i++) {
//     const futurePeriodStartDate = new Date(lastPeriodStartDate);
//     futurePeriodStartDate.setDate(
//       futurePeriodStartDate.getDate() + averageCycleLength * i,
//     );
//     futurePeriodStartDates.push(futurePeriodStartDate);
//   }

//   const markedDates: DatePhase[] = [];

//   for (const periodStartDate of futurePeriodStartDates) {
//     for (let day = 1; day <= averageCycleLength; day++) {
//       const currentDate = new Date(periodStartDate);
//       currentDate.setDate(currentDate.getDate() + day);

//       let phase: "period" | "follicular" | "ovulation" | "luteal";

//       if (day <= periodLength) {
//         phase = "period";
//       } else if (day <= ovulationDay) {
//         phase = "follicular";
//       } else if (day === ovulationDay + 1) {
//         phase = "ovulation";
//       } else {
//         phase = "luteal";
//       }

//       if (phase !== "period") {
//         markedDates.push({
//           date: currentDate.toISOString().split("T")[0],
//           phase,
//         });
//       }
//     }
//   }

//   return markedDates;
// }

export const filterOutFutureDates = (dates: string[], tz: string) => {
  return dates.filter((item) => !isDateInFuture(item, tz));
};

const sortArrayOfDates = (dates: string[]) => {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });
};

export const groupConsecutiveDateStrings = (datesIn: string[]): string[][] => {
  const groupedDates: string[][] = [];
  let currentGroup: string[] = [];

  const dates = sortArrayOfDates(datesIn);

  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

    // Add the current date string to the current group
    currentGroup.push(dates[i]);

    // Check if the next date is consecutive or if it's the last date in the array
    if (
      nextDate === null ||
      (nextDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) > 1
    ) {
      // If not consecutive, add the current group to the grouped dates and start a new group
      groupedDates.push(currentGroup);
      currentGroup = [];
    }
  }

  return groupedDates;
};

export const daysBetweenDates = (date1: string, date2: string): number => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());

  // Convert the time difference to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

export const getDaysToToday = (date: string, tz: string): number => {
  const dayStartUnix = getDayStartForTz_DATE(tz, date);

  const now = Date.now();
  if (dayStartUnix) {
    const days = Math.ceil((now - dayStartUnix) / (24 * 60 * 60 * 1000));

    if (days >= 0) {
      return days;
    }
  }

  return -1;
};

// interface MenstrualPhaseDays {
//   menstruation: number[];
//   follicular: number[];
//   ovulation: number[];
//   luteal: number[];
// }

export type MenstrualPhaseDays = Record<periodDateType, number[]>;
export const allPhases: periodDateType[] = [
  "ESTIMATED_PERIOD",
  "PERIOD",
  "FOLLICULAR",
  "OVULATION",
  "LUTEAL",
  "UNKNOWN",
];

// export interface MenstrualPhaseDays {
//   PERIOD: number[];
//   FOLLICULAR: number[];
//   OVULATION: number[];
//   LUTEAL: number[];
//   ESTIMATED_PERIOD: number[];
//   UNKNOWN: number[];
//   //   pms: number[];
// }

const getDaysFromPeriodStart = (tz: string, startDate: string) => {
  const now = Date.now();
  const start = getDayStartForTz_DATE(tz, startDate);
  const todayStart = getDayStartForTz(tz, now);

  // console.log("start", start);
  // console.log("todayStart", todayStart);

  if (start && todayStart) {
    const daysFromPeriod = Math.round((todayStart - start) / ONE_DAY_MS) + 1;

    return daysFromPeriod;
  }

  return 0;
};

const getUpdatedPeriodDates = (start: string, length: number, tz: string) => {
  const startUnix = getDayStartForTz_DATE(tz, start);
  const updatedDates: string[] = [];

  if (startUnix) {
    for (let i: number = 0; i < length; i++) {
      const unix = startUnix + i * ONE_DAY_MS;
      updatedDates.push(getFormattedDateForUnixWithTZ(unix, tz));
    }
  }

  return updatedDates;
};

export const getUpdatedMenstruatingDates = (
  tz: string,
  periodDates: string[],
  pl: number,
) => {
  const loggedLength = periodDates.length;

  if (loggedLength) {
    const daysFromStart = getDaysFromPeriodStart(tz, periodDates[0]);

    console.log("daysFrom Start", daysFromStart);
    console.log("loggedLength", loggedLength);

    // throw new Error("Hi I am pause");

    if (daysFromStart > loggedLength) {
      const returnedArray = getUpdatedPeriodDates(
        periodDates[0],
        Math.min(daysFromStart, pl),
        tz,
      );

      console.log("returnedArray", returnedArray);

      if (returnedArray.length) {
        return returnedArray;
      }
    }
  }

  return periodDates;

  // let date1Ms = date1.getTime();
  // let date2Ms = date2.getTime();
};

export const getMenstrualPhaseSplitV3 = (
  menstruatingDays: number,
  cycleLength: number,
  estimatedPeriodLength: number,
): MenstrualPhaseDays => {
  const lutealPhaseLength = Math.min(
    14,
    Math.max(1, cycleLength - estimatedPeriodLength - 1),
  );

  //   console.log("luteal phase length", lutealPhaseLength);
  const ovulationDay = cycleLength - lutealPhaseLength - 1;
  const lutealPhaseStart = ovulationDay + 1;

  const menstruation = Array.from({ length: menstruatingDays }, (_, i) => i);
  const estimatedPeriod = Array.from(
    { length: estimatedPeriodLength - menstruatingDays },
    (_, i) => i + menstruatingDays,
  );
  const follicular = Array.from(
    { length: ovulationDay - estimatedPeriodLength },
    (_, i) => i + estimatedPeriodLength,
  );
  const ovulation = [ovulationDay];
  const luteal = Array.from(
    { length: lutealPhaseLength },
    (_, i) => i + lutealPhaseStart,
  );

  return {
    PERIOD: menstruation,
    ESTIMATED_PERIOD: estimatedPeriod,
    FOLLICULAR: follicular,
    OVULATION: ovulation,
    LUTEAL: luteal,
    UNKNOWN: [],
  };
};

export const generatePeriodDates = (
  initialDate: string,
  periodPhases: MenstrualPhaseDays,
  cycleLength: number,
  tzString: string,
): PeriodDateObj[] => {
  const dateObj = new Date(initialDate);
  const output: PeriodDateObj[] = [];

  for (const phaseK in periodPhases) {
    const phase = phaseK as periodDateType;

    const days = periodPhases[phase] ? periodPhases[phase] : [];

    // let phaseProg: number = 1;

    let phaseDay: number = 0;
    days.forEach((dayNumber: number) => {
      const currentDate = new Date(dateObj);
      currentDate.setDate(currentDate.getDate() + dayNumber);
      const dateString = currentDate.toISOString().split("T")[0];

      const cycleProgress = (dayNumber + 1) / cycleLength;
      const phaseProgress = (phaseDay + 1) / days.length;
      const currentPhaseDay = phaseDay;

      const phaseLength = days.length;

      // phaseProg++;
      phaseDay++;

      const unix = getDayStartForTz_DATE(tzString, dateString);

      output.push({
        id: uuidv4(),
        dayNumber,
        type: phase,
        unix: unix ? unix : -1,
        date: dateString,
        cycleProgress,
        phaseProgress,
        cycleId: "TO ADD",
        phaseLength,
        phaseDay: currentPhaseDay,
        cycleLength,
      });
    });
  }

  return recaliberatePeriodSection(output);
};

const recaliberatePeriodSection = (output: PeriodDateObj[]) => {
  const periodDates = output.filter(
    (item) => item.type === "PERIOD" || item.type === "ESTIMATED_PERIOD",
  );

  const finalOutputObj: { [id: string]: PeriodDateObj } = {};

  periodDates.sort(
    (x, y) => (x.dayNumber ? x.dayNumber : 0) - (y.dayNumber ? y.dayNumber : 0),
  );

  let updatedDayNumber: number = 0;
  for (const dateObj of periodDates) {
    finalOutputObj[dateObj.id] = {
      ...dateObj,
      dayNumber: updatedDayNumber,
      phaseDay: updatedDayNumber,
      phaseProgress: (updatedDayNumber + 1) / periodDates.length,
      phaseLength: periodDates.length,
    };

    updatedDayNumber++;
  }

  const finalOutput: PeriodDateObj[] = [];
  for (const finalObj of output) {
    if (finalOutputObj[finalObj.id]) {
      finalOutput.push(finalOutputObj[finalObj.id]);
      console.log(
        "date",
        finalOutputObj[finalObj.id].date,
        finalOutputObj[finalObj.id].type,
        "dayNumber",
        finalOutputObj[finalObj.id].dayNumber,
        "phaseDay",
        finalOutputObj[finalObj.id].phaseDay,
        "phaseProgress",
        finalOutputObj[finalObj.id].phaseProgress,
        "phaseLength",
        finalOutputObj[finalObj.id].phaseLength,
      );
    } else {
      finalOutput.push(finalObj);
      console.log(
        "date",
        finalObj.date,
        finalObj.type,
        "dayNumber",
        finalObj.dayNumber,
        "phaseDay",
        finalObj.phaseDay,
        "phaseProgress",
        finalObj.phaseProgress,
        "phaseLength",
        finalObj.phaseLength,
      );
    }
  }

  return finalOutput;
};

export const estimateFutureValue = (numbers: number[], alpha: number) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Input must be a non-empty array of numbers.");
  }

  if (typeof alpha !== "number" || alpha <= 0 || alpha >= 1) {
    throw new Error("Alpha must be a number between 0 and 1.");
  }

  let ema = numbers[numbers.length - 1]; // Initialize the EMA with the last number (most recent)

  for (let i = numbers.length - 2; i >= 0; i--) {
    const currentNumber = numbers[i];
    ema = currentNumber * alpha + ema * (1 - alpha);
  }

  return ema;
};

// Usage exampl

export const calculateEMA = (values: number[], alpha: number): number[] => {
  const emaValues: number[] = [];
  let ema = values[0];

  for (let i = 1; i < values.length; i++) {
    ema = alpha * values[i] + (1 - alpha) * ema;
    emaValues.push(ema);
  }

  return emaValues;
};
