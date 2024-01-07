import { format } from "date-fns";
import {
  achieverProgress,
  achieverProgressItem,
} from "../../../../models/awards/interface";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailySleepObj,
} from "../../../../models/dailyKPIs/interface";

export const getStreakProgressView = (
  monthStart: number,
  countNeeded: number,
  minValue: number,
  type: "dailyEnergyObj" | "dailyMoodObj" | "dailySleepObj",
  objs: dailyEnergyObj[] | dailyMoodObj[] | dailySleepObj[],
): {
  progressValues: achieverProgress;
  countSucess: number;
  steps: number;
  stepSize: number;
  latestLoggedUnix?: number;
} => {
  const progressValues: achieverProgress = {};

  // console.log("objs", objs);
  // console.log("countNeeded", countNeeded);
  // console.log("minValue", minValue);

  const tickMarks = getTickMarks(objs, type, minValue);
  // console.log("tickMarks", tickMarks);

  // let dateStart: number = monthStart;

  const { steps, stepSize } = getSteps(countNeeded);

  // console.log("steps", steps, stepSize);
  // console.log("steps", countNeeded);

  let latestLoggedUnix: number | undefined;
  for (let step: number = 0; step < steps; step++) {
    // console.log("step", step);

    for (let i: number = 0; i < stepSize; i++) {
      // const ct = dateStart + step * stepSize + i;

      // console.log("i", i);

      //   let tickStatus: streakLabel = "PENDING";
      //   let dt: string = "-";
      if (tickMarks[i]) {
        // console.log("tick", tickMarks[i]);
        const newProgValue: achieverProgressItem = {
          label: format(new Date(tickMarks[i].unix), "dd"),
          tickStatus: "HIT",
          isBadge: i === stepSize - 1,
          container: step,
        };

        progressValues[i + 1] = newProgValue;

        latestLoggedUnix = tickMarks[i].unix;
      }
    }
  }

  // console.log("progressValues", progressValues);

  return {
    progressValues,
    countSucess: tickMarks.length,
    steps: steps,
    stepSize,
    latestLoggedUnix,
  };
};

const getLatestEntryForDate = (
  objs: dailyEnergyObj[] | dailyMoodObj[] | dailySleepObj[],
) => {
  const dateWiseEntries: {
    [date: string]: dailyEnergyObj | dailyMoodObj | dailySleepObj;
  } = {};
  for (const entry of objs) {
    if (!dateWiseEntries[entry.date]) {
      dateWiseEntries[entry.date] = entry;
    } else if (dateWiseEntries[entry.date].unix < entry.unix) {
      dateWiseEntries[entry.date] = entry;
    }
  }

  return Object.values(dateWiseEntries);
};

export const getTickMarks = (
  objs: dailyEnergyObj[] | dailyMoodObj[] | dailySleepObj[],
  type: "dailyEnergyObj" | "dailyMoodObj" | "dailySleepObj",
  minValue: number,
) => {
  if (type === "dailyEnergyObj") {
    const objsFilter = getLatestEntryForDate(objs);
    const objsCasted = objsFilter as dailyEnergyObj[];
    return objsCasted.filter((item) => item.energy && item.energy >= minValue);
  } else if (type === "dailyMoodObj") {
    const objsFilter = getLatestEntryForDate(objs);
    const objsCasted = objsFilter as dailyMoodObj[];
    return objsCasted.filter((item) => item.mood && item.mood >= minValue);
  } else {
    const objsFilter = getLatestEntryForDate(objs);
    const objsCasted = objsFilter as dailySleepObj[];
    return objsCasted.filter(
      (item) => item.sleepHours && item.sleepHours >= minValue,
    );
  }
};

// const getDateMap = (
//   objs: dailyEnergyObj[] | dailyMoodObj[] | dailySleepObj[],
// ) => {
//   const dateMap: {
//     [label: string]: dailyEnergyObj | dailyMoodObj | dailySleepObj;
//   } = {};

//   for (const obj of objs) {
//     dateMap[format(new Date(obj.unix), "dd")] = obj;
//   }

//   return dateMap;
// };

const getSteps = (countNeeded: number) => {
  const steps = Math.ceil(countNeeded / 5);
  return {
    steps,
    stepSize: countNeeded > 5 ? 5 : countNeeded,
  };

  // if (countNeeded <= 7) {
  //   return { steps: 1, stepSize: 7 };
  // } else if (countNeeded === 14) {
  //   return { steps: 2, stepSize: 7 };
  // } else {
  //   return { steps: Math.ceil(countNeeded / 5), stepSize: 5 };
  // }
};
