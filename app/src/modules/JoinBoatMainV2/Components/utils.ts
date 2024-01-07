import { fitnessGoalTypes, genderType } from "@models/User/User";

const FEET_TO_INCH_CONST = 12;
export const INCH_TO_METER_CONST = 0.0254;
export const BMI_UNDERWEIGHT = 17;
export const BMI_OVERWEIGHT = 27;
export const BMI_UPPER_NORMAL = 25;
export const BMI_LOWER_NORMAL = 18;
const DEFAULT_MALE_HEIGHT_INCH = 68;
const DEFAULT_FEMALE_HEIGHT_INCH = 63;
const DEFAULT_WEIGHT_KG = 60;
// const DEFAULT_GAIN_MUSCLE_CONST = 3;
// const DEFAULT_LOSE_WEIGHT_CONST = -3;

export const getIntialHeight = (height?: number, gender?: genderType) => {
  if (!height && !gender) return DEFAULT_MALE_HEIGHT_INCH;

  return height
    ? height
    : gender === "female"
    ? DEFAULT_FEMALE_HEIGHT_INCH
    : DEFAULT_MALE_HEIGHT_INCH;
};

export const getHeight = (height: number) => {
  const inch = height % FEET_TO_INCH_CONST;
  const feet = Math.floor((height - inch) / FEET_TO_INCH_CONST);

  return `${feet}'${inch}"`;
};

const getGoal = (goal?: fitnessGoalTypes[]): fitnessGoalTypes => {
  if (goal?.length) {
    return goal[0];
  }

  return "lose_weight";
};

export const getWeightForHeight = (
  height: number,
  gender: genderType,
  goals?: fitnessGoalTypes[]
) => {
  const heightInMeter = getIntialHeight(height, gender) * INCH_TO_METER_CONST;
  const goal = getGoal(goals);

  // assuming overweight
  let bmiToEstimate = BMI_OVERWEIGHT;
  if (goal === "gain_muscle") {
    bmiToEstimate = BMI_UNDERWEIGHT;
  }

  const estimatedWeight = weightForBMIHelper(heightInMeter, bmiToEstimate);
  return estimatedWeight;
};

export const getEstimatedDesiredWeight = (
  weight: number,
  height?: number,
  gender?: genderType
) => {
  const heightInMeter = getIntialHeight(height, gender) * INCH_TO_METER_CONST;
  const currentBMI = calculateBMI(heightInMeter, weight);

  if (currentBMI > BMI_UPPER_NORMAL) {
    return weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
  } else if (currentBMI < BMI_LOWER_NORMAL) {
    return weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
  } else {
    return weight;
  }
};

export const getIntialWeight = (
  target: "weight" | "desiredWeight",
  height?: number,
  gender?: genderType,
  weight?: number,
  desiredWeight?: number,
  fitnessGoal?: fitnessGoalTypes[]
) => {
  if (!height && !gender && !weight && !desiredWeight && !fitnessGoal)
    return DEFAULT_WEIGHT_KG;

  const heightInMeter = getIntialHeight(height, gender) * INCH_TO_METER_CONST;
  const goal = fitnessGoal?.length ? fitnessGoal[0] : undefined;

  // calculating current weight for user
  if (target === "weight" && weight) {
    return weight;
  }
  // else if (target === "desiredWeight" && desiredWeight) {
  //   return desiredWeight;
  // } else
  else if (target === "weight" && goal === "gain_muscle") {
    const estimatedOverWeightVal = weightForBMIHelper(
      heightInMeter,
      BMI_UNDERWEIGHT
    );
    return estimatedOverWeightVal;
  } else if (target === "weight") {
    const estimatedOverWeightVal = weightForBMIHelper(
      heightInMeter,
      BMI_OVERWEIGHT
    );
    return estimatedOverWeightVal;
  } else if (target === "desiredWeight" && weight) {
    const currentBMI = calculateBMI(heightInMeter, weight);
    if (currentBMI > BMI_UPPER_NORMAL) {
      return weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
    } else if (currentBMI < BMI_LOWER_NORMAL) {
      return weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
    } else {
      return weight;
    }
  } else {
    return DEFAULT_WEIGHT_KG;
  }

  // switch (goal) {
  //   case "gain_muscle":
  //     return weightForGoalHelper(
  //       DEFAULT_GAIN_MUSCLE_CONST,
  //       target,
  //       weightForBMIHelper(heightInMeter, BMI_UNDERWEIGHT),
  //       weight,
  //       desiredWeight
  //     );
  //   case "lose_weight":
  //   case "pcos_pcod":
  //     return weightForGoalHelper(
  //       DEFAULT_LOSE_WEIGHT_CONST,
  //       target,
  //       weightForBMIHelper(heightInMeter, BMI_OVERWEIGHT),
  //       weight,
  //       desiredWeight
  //     );
  //   default:
  //     return DEFAULT_WEIGHT_KG;
  // }
};

export const weightForBMIHelper = (heightInMeter: number, BMI: number) => {
  return Math.round(BMI * Math.pow(heightInMeter, 2));
};

export const calculateBMI = (heightInMeter: number, weightInKG: number) => {
  return weightInKG / Math.pow(heightInMeter, 2);
};

// const weightForGoalHelper = (
//   goalConst: number,
//   target: "weight" | "desiredWeight",
//   weightForHeight: number,
//   target_weight?: number,
//   target_desired_weight?: number
// ) => {
//   if (target === "weight") {
//     return target_weight ? target_weight : weightForHeight;
//   } else {
//     return target_desired_weight
//       ? target_desired_weight
//       : (target_weight ? target_weight : weightForHeight) + goalConst;
//   }
// };
