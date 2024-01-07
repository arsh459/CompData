import { Activity } from "../../../models/Activity/Activity";
import { getUserActivityAfter } from "../../../models/Activity/getUtils";
import { StepsDoc, getStepDocsInRange } from "../../../models/StepDoc/StepDoc";
import { Award } from "../../../models/awards/interface";
import {
  getKPIObjsInRange,
  // getLastKPI,
} from "../../../models/dailyKPIs/getUtils";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "../../../models/dailyKPIs/interface";

import {
  getDateBucket,
  getDayStartForTz_DATE,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";

export interface ProgressReportKPIs {
  workoutRegularity: number;
  dietRegularity: number;
  stepRegularity: number;
  wtChange: number;
  moodAvg: number;
  energyAvg: number;
}

export const createProgressReportKPIs = async (
  timezoneString: string,
  uid: string,
  start: number,
  end: number,
  dailyStepsTarget: number,
): Promise<ProgressReportKPIs> => {
  // console.log("start", start, end, uid);
  const userActivities = await getUserActivityAfter(uid, start, end);

  // console.log("userActivities", userActivities.length);

  const workoutActivities = userActivities.filter(
    (item) => item.source === "task",
  );

  // console.log("workoutActivities", workoutActivities.length);
  const workoutRegularity = calculateWorkoutRegularity(
    timezoneString,
    start,
    end,
    workoutActivities,
  );

  // console.log("workoutRegularity", workoutRegularity);

  const dietActivities = userActivities.filter(
    (item) => item.source === "nutrition",
  );

  const dietRegularity = calculateWorkoutRegularity(
    timezoneString,
    start,
    end,
    dietActivities,
  );

  // console.log("dietRegularity", dietRegularity);

  const stepDocs = await getStepDocsInRange(uid, start, end);

  const stepRegularity = calculateStepRegularity(stepDocs, dailyStepsTarget);

  const weightObjs = await getKPIObjsInRange(uid, "dailyWeight", start, end);
  // console.log("weightObjs", weightObjs);
  const energy = await getKPIObjsInRange(uid, "dailyEnergy", start, end);
  // console.log("energy", energy);
  const mood = await getKPIObjsInRange(uid, "dailyMood", start, end);
  // console.log("mood", mood);

  const wtChange = await calculateWeightChange(uid, weightObjs);
  const moodAvg = await calculateMoodAverage(uid, mood, start, 5);
  const energyAvg = await calculateEnergyAverage(uid, energy, start, 3);

  return {
    workoutRegularity,
    dietRegularity,
    stepRegularity,
    wtChange,
    moodAvg,
    energyAvg,
  };
};

const calculateWeightChange = async (
  uid: string,
  weights: dailyWeightObj[],
) => {
  if (weights.length) {
    const latestWeight = weights[weights.length - 1].weight;
    const weekStartWeight = weights[0].weight;

    // console.log("latestWeight", latestWeight);
    // console.log("weekStartWeight", weekStartWeight);

    // const lastKnownWeight = (await getLastKPI(
    //   uid,
    //   "dailyWeight",
    // )) as dailyWeightObj;

    // console.log("lastKnownWeight", lastKnownWeight);

    if (weekStartWeight && latestWeight) {
      return latestWeight - weekStartWeight;
    }
  }

  return 0;
};

export const calculateAverageKPI = (allKPIs: number[]) => {
  const sum = allKPIs.reduce((acc, item) => acc + item, 0);
  return sum / allKPIs.length;
};

const calculateAverateMoodKPI = (oldMoods: dailyMoodObj[]) => {
  const sumMood = oldMoods.reduce((acc, item) => {
    return acc + (item.mood ? item.mood : 0);
  }, 0);

  return sumMood / oldMoods.length;
};

const calculateAverateEnergyKPI = (oldMoods: dailyEnergyObj[]) => {
  const sumMood = oldMoods.reduce((acc, item) => {
    return acc + (item.energy ? item.energy : 0);
  }, 0);

  return sumMood / oldMoods.length;
};

const calculateMoodAverage = async (
  uid: string,
  moods: dailyMoodObj[],
  start: number,
  maxMood: number,
) => {
  if (moods.length) {
    // const oldMoods = await getKPIObjsInRange(uid, "dailyMood", 0, start);

    // console.log("oldMoods", oldMoods);

    // const oldAvg = calculateAverateMoodKPI(oldMoods);

    // console.log("oldAvg", oldAvg);

    const latestAvg = calculateAverateMoodKPI(moods);

    // const latestMood = moods[moods.length - 1].mood;

    // console.log("latestMood", latestAvg);

    if (latestAvg) {
      return latestAvg;
      // const dif = latestAvg - oldAvg;
      // return dif / maxMood;
    }
  }

  return 0;
};

const calculateEnergyAverage = async (
  uid: string,
  energies: dailyEnergyObj[],
  start: number,
  maxEnergy: number,
) => {
  if (energies.length) {
    // const oldEnergies = await getKPIObjsInRange(uid, "dailyEnergy", 0, start);

    const newAvg = calculateAverateEnergyKPI(energies);
    return newAvg;

    // const latestEnergy = energies[energies.length - 1].energy;

    // if (latestEnergy) {
    //   const dif = latestEnergy - oldAvg;
    //   return dif / maxEnergy;
    // }
  }

  return 0;
};

const calculateStepRegularity = (
  steps: StepsDoc[],
  dailyStepsTarget: number,
) => {
  let regularity: number = 0;
  for (const stepDoc of steps) {
    if (stepDoc.steps && stepDoc.steps >= dailyStepsTarget) {
      regularity += 1;
    }
  }

  return regularity / steps.length;
};

const calculateWorkoutRegularity = (
  timezoneString: string,
  start: number,
  end: number,
  userActivities: Activity[],
) => {
  const dateBucket = getDateBucket(timezoneString, start);
  // console.log("dateBucket", dateBucket);
  const startUnix = getDayStartForTz_DATE(timezoneString, dateBucket);
  // console.log("startUnix", startUnix);
  const days = Math.round((end - start) / (24 * 60 * 60 * 1000));

  // console.log("days", days);
  // console.log(
  //   userActivities.map((item) => ({
  //     name: item.activityName,
  //     unix: item.createdOn,
  //     calories: item.calories,
  //   })),
  // );

  if (startUnix) {
    let regularity: number = 0;
    for (let i: number = 0; i < days; i++) {
      const currentUnix = startUnix + i * 24 * 60 * 60 * 1000;
      const endDayUnix = currentUnix + 24 * 60 * 60 * 1000;

      const positiveActivities = userActivities.filter(
        (item) =>
          item.createdOn &&
          item.createdOn >= currentUnix &&
          item.createdOn <= endDayUnix &&
          item.calories,
      );

      // console.log("positiveActivities", i, positiveActivities.length);

      if (positiveActivities.length) {
        regularity += 1;
      }
    }

    return regularity / days;
  }

  return 0;
};

export const getUpdatedAwardId = (regularity: number, tierAwards: Award[]) => {
  const tieredAward = tierAwards.filter((item) => {
    // if (
    //   item.tierLower &&
    //   item.tierUpper &&
    //   item.tierLower <= regularity &&
    //   item.tierUpper >= regularity
    // ) {
    //   return true;
    // }

    return false;
  });

  if (tieredAward.length) {
    return tieredAward[0].id;
  }

  return undefined;
};
