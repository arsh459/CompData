import {
  INCH_TO_METER_CONST,
  calculateBMI,
  getIntialHeight,
  getWeightForHeight,
} from "@templates/joinBoatTemplate/V5/Components/utils";
import { fitnessGoalTypes, UserInterface } from "./User";

export const getUserFitnessGoal = (
  user?: UserInterface
): fitnessGoalTypes | undefined => {
  if (user?.fitnessGoal?.length && user.fitnessGoal[0] === "pcos_pcod") {
    return "pcos_pcod";
  } else if (
    user?.fitnessGoal?.length &&
    user.fitnessGoal[0] === "regularise_cycle"
  ) {
    return "regularise_cycle";
  } else if (user?.fitnessGoal?.length && user.fitnessGoal[0] === "keep_fit") {
    return "keep_fit";
  } else if (
    user?.fitnessGoal?.length &&
    user.fitnessGoal[0] === "lose_weight"
  ) {
    return "lose_weight";
  }

  return undefined;
};

export const getBMI = (user?: UserInterface) => {
  const goal = getUserFitnessGoal(user);

  const heightInInch = getIntialHeight(user?.height, user?.gender);
  const heightInMeter = heightInInch * INCH_TO_METER_CONST;

  const weightInKG =
    user?.weight ||
    getWeightForHeight(
      user?.height || heightInInch,
      user?.gender ? user.gender : "female",
      user?.fitnessGoal || [goal || "keep_fit"]
    );

  const BMI = Math.round(calculateBMI(heightInMeter, weightInKG) * 10) / 10;
  return BMI;
};
