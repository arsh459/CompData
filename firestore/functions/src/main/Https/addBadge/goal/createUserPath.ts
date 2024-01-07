import {
  AchievementPathDataItemTypes,
  UserInterface,
  fitnessGoalTypes,
  workType,
} from "../../../../models/User/User";
import {
  getLastCompletedCycle,
  getLastEnergyLog,
  getLastMoodLog,
} from "../../../../models/User/roadmap";
import {
  createWorkFromGoals,
  reorderThingsToDoArray,
} from "../reconfigureRoadmap";
import {
  BMI_LOWER_NORMAL,
  BMI_UPPER_NORMAL,
  INCH_TO_METER_CONST,
} from "./constants";

export const getFitnessGoal = (localUser?: UserInterface): fitnessGoalTypes => {
  if (
    localUser?.fitnessGoal?.length &&
    (localUser.fitnessGoal[0] === "pcos_pcod" ||
      localUser.fitnessGoal[0] === "regularise_cycle")
  ) {
    return "pcos_pcod";
  } else if (
    localUser?.fitnessGoal?.length &&
    localUser.fitnessGoal[0] === "keep_fit"
  ) {
    return "keep_fit";
  }

  return "lose_weight";
};

export const getWeightlossTargetType = (transformationData: workType[]) => {
  const weightType = transformationData.filter(
    (item) => item.type === "weight",
  );

  if (weightType.length) {
    return weightType[0];
  }

  return undefined;
};

export const getTransformationData = async (
  user: UserInterface,
): Promise<workType[]> => {
  // const goal = getFitnessGoal(user);

  const target = await createTargetsForUser(user);
  console.log("target", target);

  const map = await createWorkFromGoals(user, target);

  return reorderThingsToDoArray(map);
  // return getPCOSObj(user);

  // if (goal === "keep_fit") {
  //   return getKeepFitObj();
  // } else if (goal === "pcos_pcod" || goal === "regularise_cycle") {
  //   return getPCOSObj(user);
  // } else {
  //   return getLoseWeightObj(user);
  // }
};

// const getKeepFitObj = (): workType[] => {
//   return [
//     {
//       text: "2x your energy level",
//       type: "energy",
//       delta: 2,
//       target: 3,
//       action: "increase",
//     },
//     {
//       text: "Boost your mood",
//       type: "mood",
//       delta: 4,
//       action: "increase",
//       target: 5,
//     },
//   ];
// };

export const weightForBMIHelper = (heightInMeter: number, BMI: number) => {
  return Math.round(BMI * Math.pow(heightInMeter, 2));
};

export const calculateBMI = (heightInMeter: number, weightInKG: number) => {
  return weightInKG / Math.pow(heightInMeter, 2);
};

export const getWeightLossValue = (
  localUser?: UserInterface,
  targetWeight?: number,
) => {
  let tgWeight = targetWeight ? targetWeight : localUser?.desiredWeight;
  const currWeight = localUser?.weight;

  // console.log("tg", tgWeight, currWeight);

  let weightString = "";
  let weightDelta = -1;
  let action: "unknown" | "gain" | "lose" = "unknown";
  if (tgWeight && currWeight && tgWeight > currWeight) {
    weightString = `gain ${tgWeight - currWeight} Kgs`;
    weightDelta = tgWeight - currWeight;
    action = "gain";
  } else if (tgWeight && currWeight && currWeight > tgWeight) {
    weightString = `lose ${currWeight - tgWeight} Kgs`;
    weightDelta = currWeight - tgWeight;
    action = "lose";
  } else if (localUser?.height && localUser.weight) {
    const heightInMeter = localUser?.height * INCH_TO_METER_CONST;
    const currentBMI = calculateBMI(heightInMeter, localUser.weight);
    // console.log("weight", currentBMI);

    // lose weight
    if (currentBMI > BMI_UPPER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
      weightString = `lose ${localUser.weight - tgWeightNow} Kgs`;
      weightDelta = localUser.weight - tgWeightNow;
      action = "lose";
      tgWeight = tgWeightNow;
    }
    // gain weight
    else if (currentBMI < BMI_LOWER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
      weightString = `gain ${tgWeightNow - localUser.weight} Kgs`;
      weightDelta = tgWeightNow - localUser.weight;
      action = "gain";
      tgWeight = tgWeightNow;
    } else {
      weightString = "get fit";
      weightDelta = 0;
      tgWeight = localUser.weight;
    }
  } else {
    weightString = "get fit";
    weightDelta = -1;
    tgWeight = -1;
  }

  return {
    weightString,
    weightDelta,
    action,
    target: tgWeight,
  };
};

const createTargetsForUser = async (localUser?: UserInterface) => {
  const values: Partial<Record<AchievementPathDataItemTypes, number>> = {};

  const { action, target } = getWeightLossValue(localUser);

  if (action !== "unknown") {
    values["weight"] = target;
  }

  if (
    localUser?.periodTrackerObj?.inputCycleLength &&
    localUser?.periodTrackerObj?.inputCycleLength > 35
  ) {
    values["cycleLength"] = 28;
  } else if (
    localUser?.periodTrackerObj?.inputCycleLength &&
    localUser?.periodTrackerObj?.inputCycleLength < 21
  ) {
    values["cycleLength"] = 28;
  } else if (localUser?.cycleLength === "35_45") {
    values["cycleLength"] = 28;
  } else if (localUser?.cycleLength === "45_60") {
    values["cycleLength"] = 28;
  } else if (localUser?.cycleLength === "60_more") {
    values["cycleLength"] = 28;
  }

  if (
    localUser?.periodTrackerObj?.inputPeriodLength &&
    localUser?.periodTrackerObj?.inputPeriodLength > 8
  ) {
    values["periodLength"] = 5;
  } else if (
    localUser?.periodTrackerObj?.inputPeriodLength &&
    localUser?.periodTrackerObj?.inputPeriodLength < 2
  ) {
    values["periodLength"] = 5;
  }

  if (localUser?.pcosSymptoms?.length) {
    for (const pcosSymptom of localUser.pcosSymptoms) {
      if (pcosSymptom === "bad_mood") {
        values["mood"] = 5;
      } else if (pcosSymptom === "fatigue") {
        values["energy"] = 3;
      } else if (pcosSymptom === "facial_and_excess_hair") {
        values["facial_and_excess_hair"] = 0;
      } else if (pcosSymptom === "acne") {
        values["acne"] = 0;
      } else if (pcosSymptom === "darkening_skin") {
        values["darkening_skin"] = 0;
      } else if (pcosSymptom === "hairfall") {
        values["hairfall"] = 0;
      }
    }
  }

  if (localUser?.sleepQuality && localUser.sleepQuality < 7) {
    values["sleep"] = 8;
  }

  if (localUser?.uid) {
    const mood = await getLastMoodLog(localUser?.uid);
    if (mood?.mood && mood.mood < 4) {
      values["mood"] = 5;
    }

    const energy = await getLastEnergyLog(localUser?.uid);
    if (energy?.energy && energy.energy < 3) {
      values["energy"] = 3;
    }
  }

  return values;
};

export const getCurrentUserEstimatedCycleLength = async (
  user: UserInterface,
) => {
  const userCycle = await getLastCompletedCycle(user.uid);
  if (userCycle?.phaseSplits.PERIOD) {
    return userCycle?.phaseSplits.PERIOD.length;
  } else if (user.periodTrackerObj?.inputPeriodLength) {
    return user.periodTrackerObj.inputPeriodLength;
  } else if (user.cycleLength === "60_more") {
    return 70;
  } else if (user.cycleLength === "45_60") {
    return 55;
  } else if (user.cycleLength === "35_45") {
    return 40;
  } else if (user.cycleLength === "21_less") {
    return 15;
  } else if (user.cycleLength === "21_35") {
    return 28;
  }

  return undefined;
};

export const getCurrentUserEstimatedPeriodLength = async (
  user: UserInterface,
) => {
  const userCycle = await getLastCompletedCycle(user.uid);
  if (userCycle?.length) {
    return userCycle.length;
  } else if (user.periodTrackerObj?.inputCycleLength) {
    return user.periodTrackerObj.inputCycleLength;
  }

  return undefined;
};

// const getPCOSObj = (localUser?: UserInterface) => {
//   const thingsToWordOn: workType[] = [];

//   const { weightString, action, weightDelta, target } =
//     getWeightLossValue(localUser);

//   if (action !== "unknown") {
//     thingsToWordOn.push({
//       text: weightString,
//       delta: weightDelta,
//       target,
//       countNeeded: 1,
//       type: "weight",
//       action: action === "lose" ? "reduce" : "increase",
//     });
//   }

//   if (
//     localUser?.periodTrackerObj?.inputCycleLength &&
//     localUser?.periodTrackerObj?.inputCycleLength > 35
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       delta: localUser?.periodTrackerObj?.inputCycleLength - 28,
//       type: "cycleLength",
//       target: 28,
//       action: "reduce",
//       countNeeded: 1,
//     });
//   } else if (
//     localUser?.periodTrackerObj?.inputCycleLength &&
//     localUser?.periodTrackerObj?.inputCycleLength < 21
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       delta: 21 - localUser?.periodTrackerObj?.inputCycleLength,
//       type: "periodLength",
//       target: 28,
//       action: "increase",
//       countNeeded: 1,
//     });
//   } else if (localUser?.cycleLength === "35_45") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       delta: 40 - 28,
//       type: "cycleLength",
//       target: 28,
//       action: "reduce",
//       countNeeded: 1,
//     });
//   } else if (localUser?.cycleLength === "45_60") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 - 90 days",
//       delta: 55 - 28,
//       type: "cycleLength",
//       target: 28,
//       action: "reduce",
//       countNeeded: 1,
//     });
//   } else if (localUser?.cycleLength === "60_more") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 90 - 180 days",
//       delta: 70 - 28,
//       type: "cycleLength",
//       target: 28,
//       action: "reduce",
//       countNeeded: 1,
//     });
//   }

//   if (
//     localUser?.periodTrackerObj?.inputPeriodLength &&
//     localUser?.periodTrackerObj?.inputPeriodLength > 8
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise period length to 5 days",
//       delta: 10 - 5,
//       type: "periodLength",
//       target: 5,
//       action: "reduce",
//       countNeeded: 1,
//     });
//   } else if (
//     localUser?.periodTrackerObj?.inputPeriodLength &&
//     localUser?.periodTrackerObj?.inputPeriodLength < 2
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise period length to 5 days",
//       delta: 5 - 1,
//       type: "periodLength",
//       target: 5,
//       action: "increase",
//       countNeeded: 1,
//     });
//   }

//   if (localUser?.pcosSymptoms?.length) {
//     for (const pcosSymptom of localUser.pcosSymptoms) {
//       // if (thingsToWordOn.length >= 3) {
//       //   break;
//       // }

//       if (pcosSymptom === "bad_mood") {
//         thingsToWordOn.push({
//           text: "25 Happy days/month",
//           delta: 4,
//           type: "mood",
//           target: 5,
//           minValue: 4,
//           action: "maintain",
//           countNeeded: 25,
//         });
//       } else if (pcosSymptom === "fatigue") {
//         thingsToWordOn.push({
//           text: "25 Energetic days/month",
//           delta: 2,
//           target: 3,
//           minValue: 2,
//           action: "maintain",
//           type: "energy",
//           countNeeded: 25,
//         });
//       } else if (pcosSymptom === "facial_and_excess_hair") {
//         thingsToWordOn.push({
//           text: "Reduce facial hair growth",
//           delta: 1,
//           target: 0,
//           minValue: 0,
//           action: "maintain",
//           type: pcosSymptom,
//           countNeeded: 3,
//         });
//       } else if (pcosSymptom === "acne") {
//         thingsToWordOn.push({
//           text: "Fix acne on face",
//           delta: 1,
//           target: 0,
//           minValue: 0,
//           action: "maintain",
//           type: pcosSymptom,
//           countNeeded: 3,
//         });
//       } else if (pcosSymptom === "darkening_skin") {
//       } else if (pcosSymptom === "hairfall") {
//       }
//     }
//   }

//   if (localUser?.sleepQuality && localUser.sleepQuality < 7) {
//     thingsToWordOn.push({
//       text: "8 hours sleep/day",
//       delta: 8 - localUser.sleepQuality,
//       minValue: 8,
//       type: "sleep",
//       action: "maintain",
//       target: 8,
//       countNeeded: 25,
//     });
//   }

//   // if (thingsToWordOn.length < 3) {
//   //   thingsToWordOn.push({
//   //     text: "2x your energy level",

//   //     type: "energy",
//   //   });
//   // }

//   return thingsToWordOn;
// };

// const getLoseWeightObj = (localUser?: UserInterface): workType[] => {
//   const { weightString, action, weightDelta, target } =
//     getWeightLossValue(localUser);

//   return [
//     {
//       text: weightString,
//       type: "weight",
//       delta: weightDelta,
//       action: action === "lose" ? "reduce" : "increase",
//       target,
//     },
//     {
//       text: "Boost your mood",
//       type: "mood",
//       delta: 4,
//       target: 5,
//       action: "increase",
//     },
//     {
//       text: "2x your energy level",
//       type: "energy",
//       delta: 2,
//       target: 3,
//       action: "increase",
//     },
//   ];
// };
