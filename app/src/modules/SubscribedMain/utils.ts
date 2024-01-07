import {
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  UserInterface,
} from "@models/User/User";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import { BodyTypesId } from "@constants/Avatar/utils";
import {
  acneIcon,
  boostMoodIcon,
  energyLevelIcon,
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

export const defailt_bodyType = "hourglass_shaped" as BodyTypesId;

export type transformationType = {
  title: string;
  illustration: string;
  goal: string;
  dailyFitpoints: number;
  thingsToWorkOn: { text: string; icon: string }[];
  // isAuthenticated?: boolean;
  // isOnboarded?: boolean;
};

export const getFitnessGoal = (
  fitnessGoal?: fitnessGoalTypes[]
): fitnessGoalTypes => {
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

const getPCOSObj = (
  name?: string,
  gender?: genderType,
  weight?: number,
  desiredWeight?: number,
  height?: number,
  dailyFPTarget?: number,
  cycleLength?: string,
  pcosSymptoms?: pcosSymptoms[]
) => {
  const thingsToWordOn: { text: string; icon: string }[] = [];
  const illustration =
    BodyTypeData[defailt_bodyType].image[gender === "male" ? "male" : "female"];

  const { weightString, action } = getWeightLossValue(
    weight,
    desiredWeight,
    height
  );
  if (action !== "unknown") {
    thingsToWordOn.push({ text: weightString, icon: looseWeightIcon });
  }

  if (cycleLength === "35_45") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 28 days",
      icon: pcosPcodIcon,
    });
  } else if (cycleLength === "45_60") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 28 - 90 days",
      icon: pcosPcodIcon,
    });
  } else if (cycleLength === "60_more") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 90 - 180 days",
      icon: pcosPcodIcon,
    });
  }

  if (pcosSymptoms?.length) {
    for (const pcosSymptom of pcosSymptoms) {
      if (thingsToWordOn.length >= 3) {
        break;
      }

      if (pcosSymptom === "bad_mood") {
        thingsToWordOn.push({ text: "Boost your mood", icon: boostMoodIcon });
      }

      if (pcosSymptom === "acne") {
        thingsToWordOn.push({ text: "Fix acne on face", icon: acneIcon });
      }
    }
  }

  if (thingsToWordOn.length < 3) {
    thingsToWordOn.push({
      text: "2x your energy level",
      icon: energyLevelIcon,
    });
  }

  return {
    title: `${name || "Hi there"}, We will help you manage PCOS`,
    illustration: illustration,
    goal: "Manage PCOS",
    dailyFitpoints: dailyFPTarget || 20,
    thingsToWorkOn: thingsToWordOn,
  };
};

const getKeepFitObj = (user?: UserInterface): transformationType => {
  const illustration =
    BodyTypeData[defailt_bodyType].image[
      user?.gender === "male" ? "male" : "female"
    ];

  return {
    title: `${
      user?.name ? user.name : "Hi there"
    }, We will help you gamify healthy living!`,
    illustration: illustration,
    goal: "Keep Active & Fit",
    dailyFitpoints: user?.dailyFPTarget ? user.dailyFPTarget : 20,
    thingsToWorkOn: [
      { text: "2x your energy level", icon: energyLevelIcon },
      { text: "Boost your mood", icon: boostMoodIcon },
    ],
  };
};

const getWeightLossValue = (
  currWeight?: number,
  tgWeight?: number,
  height?: number
) => {
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
  } else if (height && currWeight) {
    const heightInMeter = height * INCH_TO_METER_CONST;
    const currentBMI = calculateBMI(heightInMeter, currWeight);
    // console.log("weight", currentBMI);

    // lose weight
    if (currentBMI > BMI_UPPER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
      weightString = `lose ${currWeight - tgWeightNow} Kgs`;
      weightDelta = currWeight - tgWeightNow;
      action = "lose";
    }
    // gain weight
    else if (currentBMI < BMI_LOWER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
      weightString = `gain ${tgWeightNow - currWeight} Kgs`;
      weightDelta = tgWeightNow - currWeight;
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

const getLoseWeightObj = (
  name?: string,
  gender?: genderType,
  weight?: number,
  desiredWeight?: number,
  height?: number,
  desiredBodyType?: BodyTypesId,
  dailyFPTarget?: number
): transformationType => {
  const { weightString } = getWeightLossValue(weight, desiredWeight, height);

  const illustration =
    BodyTypeData[desiredBodyType || defailt_bodyType].image[
      gender === "male" ? "male" : "female"
    ];

  return {
    title: `${name || "Hi there"}, We will help you ${weightString}!`,
    illustration: illustration,
    goal: weightString,
    dailyFitpoints: dailyFPTarget || 20,
    thingsToWorkOn: [
      { text: weightString, icon: looseWeightIcon },
      { text: "Boost your mood", icon: boostMoodIcon },
      { text: "2x your energy level", icon: energyLevelIcon },
    ],
  };
};

export const getTransdormationData = (
  name?: string,
  gender?: genderType,
  weight?: number,
  desiredWeight?: number,
  height?: number,
  desiredBodyType?: BodyTypesId,
  dailyFPTarget?: number,
  cycleLength?: string,
  fitnessGoal?: fitnessGoalTypes[],
  pcosSymptoms?: pcosSymptoms[]
): transformationType => {
  const goal = getFitnessGoal(fitnessGoal);

  if (goal === "keep_fit") {
    return getKeepFitObj();
  } else if (goal === "pcos_pcod") {
    return getPCOSObj(
      name,
      gender,
      weight,
      desiredWeight,
      height,
      dailyFPTarget,
      cycleLength,
      pcosSymptoms
    );
  } else {
    return getLoseWeightObj(
      name,
      gender,
      weight,
      desiredWeight,
      height,
      desiredBodyType,
      dailyFPTarget
    );
  }
};
