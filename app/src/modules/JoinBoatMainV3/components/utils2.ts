import { fitnessGoalTypes, genderType } from "@models/User/User";

const FEET_TO_INCH_CONST = 12;
export const INCH_TO_METER_CONST = 0.0254;
export const BMI_UNDERWEIGHT = 17;
export const BMI_OVERWEIGHT = 27;
export const BMI_UPPER_NORMAL = 25;
export const BMI_LOWER_NORMAL = 18;
const DEFAULT_MALE_HEIGHT_INCH = 68;
const DEFAULT_FEMALE_HEIGHT_INCH = 63;

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

export const getIntialWeight = (
  weight?: number,
  height?: number,
  gender?: genderType,
  goals?: fitnessGoalTypes[]
) => {
  if (typeof weight === "number") {
    return weight;
  }

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

export const weightForBMIHelper = (heightInMeter: number, BMI: number) => {
  return Math.round(BMI * Math.pow(heightInMeter, 2));
};

export const calculateBMI = (heightInMeter: number, weightInKG: number) => {
  return weightInKG / Math.pow(heightInMeter, 2);
};
