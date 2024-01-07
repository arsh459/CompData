import {
  UserInterface,
  fitnessGoalTypes,
  // genderType,
  pcosSymptoms,
  Cycle,
  periodDateType,
} from "@models/User/User";
// import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
// import { BodyTypesId } from "@constants/Avatar/utils";
import {
  acneIcon,
  boostMoodIcon,
  darkeningSkinIcon,
  energyLevelIcon,
  facialAndExcessHairIcon,
  fatigueIcon,
  looseWeightIcon,
  pcosPcodIcon,
} from "@constants/imageKitURL";
import {
  BMI_LOWER_NORMAL,
  BMI_UPPER_NORMAL,
  calculateBMI,
  INCH_TO_METER_CONST,
  weightForBMIHelper,
} from "@modules/JoinBoatMainV3/components/utils2";
// import { AchievementPathDataItemTypes } from "./AchievementPath/interface";

// const defailt_bodyType = "hourglass_shaped" as BodyTypesId;
import {
  AchievementPathDataItemTypes,
  goalActionType,
} from "./AchievementPath/utils/interface";
import { oneDayInMS } from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";

export type transformationIconTypes =
  | "weight"
  | "cycleLength"
  | "periodLength"
  | "mood"
  | "energy"
  | pcosSymptoms;

export interface workType {
  text: string;
  target: number;
  type: transformationIconTypes;
  delta: number;

  minValue?: number;
  countNeeded: number;
  action: goalActionType;
}

export type transformationType = {
  title: string;
  illustration: string;
  goal: string;
  dailyFitpoints: number;
  thingsToWorkOn: workType[];
  transformationImage?: string;
  // isAuthenticated?: boolean;
  // isOnboarded?: boolean;
};

const getFitnessGoal = (fitnessGoal?: fitnessGoalTypes[]): fitnessGoalTypes => {
  if (
    fitnessGoal?.length &&
    (fitnessGoal[0] === "pcos_pcod" || fitnessGoal[0] === "regularise_cycle")
  ) {
    return "pcos_pcod";
  } else if (fitnessGoal?.length && fitnessGoal[0] === "keep_fit") {
    return "keep_fit";
  }

  return "lose_weight";
};

export const getTransformationIcon = (
  type: AchievementPathDataItemTypes
): string => {
  if (type === "weight") {
    return looseWeightIcon;
  } else if (type === "acne") {
    return acneIcon;
  } else if (type === "bad_mood") {
    return boostMoodIcon;
  } else if (type === "cycleLength") {
    return pcosPcodIcon;
  } else if (type === "darkening_skin") {
    return darkeningSkinIcon;
  } else if (type === "energy") {
    return energyLevelIcon;
  } else if (type === "facial_and_excess_hair") {
    return facialAndExcessHairIcon;
  } else if (type === "fatigue") {
    return fatigueIcon;
  } else if (type === "hairfall") {
    return facialAndExcessHairIcon;
  } else if (type === "mood") {
    return boostMoodIcon;
  } else if (type === "periodLength") {
    return pcosPcodIcon;
  }

  return "";
};

// const getPCOSObj = (localUser?: UserInterface) => {
//   const thingsToWordOn: workType[] = [];
//   const illustration =
//     BodyTypeData[defailt_bodyType].image[
//       localUser?.gender === "male" ? "male" : "female"
//     ];

//   const { weightString, action } = getWeightLossValue(localUser);
//   if (action !== "unknown") {
//     thingsToWordOn.push({
//       text: weightString,
//       // icon: looseWeightIcon,
//       type: "weight",
//     });
//   }

//   if (
//     localUser?.periodTrackerObj?.inputCycleLength &&
//     localUser?.periodTrackerObj?.inputCycleLength > 32
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       // icon: pcosPcodIcon,
//       type: "cycleLength",
//     });
//   } else if (
//     localUser?.periodTrackerObj?.inputCycleLength &&
//     localUser?.periodTrackerObj?.inputCycleLength < 21
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       // icon: pcosPcodIcon,
//       type: "periodLength",
//     });
//   } else if (localUser?.cycleLength === "35_45") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 days",
//       // icon: pcosPcodIcon,
//       type: "cycleLength",
//     });
//   } else if (localUser?.cycleLength === "45_60") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 28 - 90 days",
//       // icon: pcosPcodIcon,
//       type: "cycleLength",
//     });
//   } else if (localUser?.cycleLength === "60_more") {
//     thingsToWordOn.push({
//       text: "Regularise your cycle to 90 - 180 days",
//       // icon: pcosPcodIcon,
//       type: "cycleLength",
//     });
//   }

//   if (
//     localUser?.periodTrackerObj?.inputPeriodLength &&
//     localUser?.periodTrackerObj?.inputPeriodLength > 8
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise period length to 5 days",
//       // icon: pcosPcodIcon,
//       type: "periodLength",
//     });
//   } else if (
//     localUser?.periodTrackerObj?.inputPeriodLength &&
//     localUser?.periodTrackerObj?.inputPeriodLength < 2
//   ) {
//     thingsToWordOn.push({
//       text: "Regularise period length to 5 days",
//       // icon: pcosPcodIcon,
//       type: "periodLength",
//     });
//   }

//   if (localUser?.pcosSymptoms?.length) {
//     for (const pcosSymptom of localUser.pcosSymptoms) {
//       if (thingsToWordOn.length >= 3) {
//         break;
//       }

//       if (pcosSymptom === "bad_mood") {
//         thingsToWordOn.push({
//           text: "Boost your mood",
//           // icon: boostMoodIcon,
//           type: "mood",
//         });
//       }

//       if (pcosSymptom === "fatigue") {
//         thingsToWordOn.push({
//           text: "Boost your energy by 2X",
//           // icon: energyLevelIcon,
//           type: "energy",
//         });
//       }

//       if (pcosSymptom === "facial_and_excess_hair") {
//         thingsToWordOn.push({
//           text: "Reduce facial hair growth",
//           // icon: facialAndExcessHairIcon,
//           type: pcosSymptom,
//         });
//       }

//       if (pcosSymptom === "acne") {
//         thingsToWordOn.push({
//           text: "Fix acne on face",
//           // icon: acneIcon,
//           type: pcosSymptom,
//         });
//       }
//     }
//   }

//   if (thingsToWordOn.length < 3) {
//     thingsToWordOn.push({
//       text: "2x your energy level",
//       // icon: energyLevelIcon,
//       type: "energy",
//     });
//   }

//   return {
//     title: `${
//       localUser?.name ? localUser.name : "Hi there"
//     }, We will help you reverse PCOS`,
//     illustration: illustration,
//     goal: "Reverse PCOS",
//     dailyFitpoints: localUser?.dailyFPTarget ? localUser.dailyFPTarget : 20,
//     thingsToWorkOn: thingsToWordOn,
//   };
// };

// const getKeepFitObj = (
//   gender?: genderType,
//   name?: string,
//   dailyFPTarget?: number
// ): transformationType => {
//   const illustration =
//     BodyTypeData[defailt_bodyType].image[gender === "male" ? "male" : "female"];

//   return {
//     title: `${name || "Hi there"}, We will help you gamify healthy living!`,
//     illustration: illustration,
//     goal: "Keep Active & Fit",
//     dailyFitpoints: dailyFPTarget || 20,
//     thingsToWorkOn: [
//       { text: "2x your energy level", type: "energy" },
//       { text: "Boost your mood", type: "mood" },
//     ],
//   };
// };

export const getWeightLossValue = (localUser?: UserInterface) => {
  const tgWeight = localUser?.desiredWeight;
  const currWeight = localUser?.weight;

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

    // lose weight
    if (currentBMI > BMI_UPPER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
      weightString = `lose ${localUser.weight - tgWeightNow} Kgs`;
      weightDelta = localUser.weight - tgWeightNow;
      action = "lose";
    }
    // gain weight
    else if (currentBMI < BMI_LOWER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
      weightString = `gain ${tgWeightNow - localUser.weight} Kgs`;
      weightDelta = tgWeightNow - localUser.weight;
      action = "gain";
    } else {
      weightString = "get fit";
      weightDelta = -1;
    }
  } else {
    weightString = "get fit";
    weightDelta = -1;
  }

  return {
    weightString,
    weightDelta,
    action,
  };
};

// const getLoseWeightObj = (localUser?: UserInterface): transformationType => {
//   const { weightString } = getWeightLossValue(localUser);

//   const illustration =
//     BodyTypeData[
//       localUser?.desiredBodyType ? localUser.desiredBodyType : defailt_bodyType
//     ].image[localUser?.gender === "male" ? "male" : "female"];

//   return {
//     title: `${
//       localUser?.name ? localUser.name : "Hi there"
//     }, We will help you ${weightString}!`,
//     illustration: illustration,
//     goal: weightString,
//     dailyFitpoints: localUser?.dailyFPTarget ? localUser.dailyFPTarget : 20,
//     thingsToWorkOn: [
//       { text: weightString, type: "weight" },
//       { text: "Boost your mood", type: "mood" },
//       { text: "2x your energy level", type: "energy" },
//     ],
//   };
// };

// export const getTransdormationData = (
//   user?: UserInterface
// ): transformationType => {
//   const goal = getFitnessGoal(user?.fitnessGoal);

//   if (goal === "keep_fit") {
//     return getKeepFitObj(user?.gender, user?.name, user?.dailyFPTarget);
//   } else if (goal === "pcos_pcod" || goal === "regularise_cycle") {
//     return getPCOSObj(user);
//   } else {
//     return getLoseWeightObj(user);
//   }
// };

export const getTransdormationDataV2 = (
  fitnessGoal?: fitnessGoalTypes[],
  name?: string
) => {
  const goal = getFitnessGoal(fitnessGoal);

  if (goal === "keep_fit") {
    return {
      title: `${name || "Hi there"}, We will help you gamify healthy living!`,
    };
  } else if (goal === "pcos_pcod" || goal === "regularise_cycle") {
    return {
      title: `${name || "Hi there"}, We will help you manage PCOS`,
    };
  } else {
    return {
      title: `${name || "Hi there"}, We will help you in weightloss`,
    };
  }
};

export const getSavedPeriod = (selectedDates: {
  [date: string]: periodDateType;
}): string[] => {
  const savedPeriods: string[] = [];

  Object.keys(selectedDates).map((item) => {
    if (selectedDates[item] === "PERIOD") {
      savedPeriods.push(item);
    }
  });

  return savedPeriods;
};

export const getPeriodAndCycleLength = (
  cycles: Cycle[],
  todayUnix: number
): { periodLength?: number; cycleLength?: number } => {
  let periodLength: number | undefined = undefined;
  let cycleLength: number | undefined = undefined;

  const lastCompletedCycle = cycles
    .sort((a, b) => {
      const dateA = new Date(a.endUnix);
      const dateB = new Date(b.endUnix);

      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    })
    .find((cycle) => cycle.startUnix < todayUnix && cycle.endUnix < todayUnix);

  if (lastCompletedCycle) {
    cycleLength = lastCompletedCycle.length;
    periodLength = lastCompletedCycle.phaseSplits.PERIOD.length;
  }

  return { periodLength, cycleLength };
};

export const getDateDiff = (date1: string, date2: string) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  return Math.ceil(diff / oneDayInMS);
};
