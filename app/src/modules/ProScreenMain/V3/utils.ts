import { UserInterface, fitnessGoalTypes } from "@models/User/User";

export const getMainGoal = (fitnessGoal?: fitnessGoalTypes[]): string => {
  if (!fitnessGoal) {
    return "Stay Fit";
  }

  if (fitnessGoal?.includes("pcos_pcod")) {
    return "PCOS Mangement";
  } else if (fitnessGoal?.includes("regularise_cycle")) {
    return "Regularise Cycle";
  } else if (fitnessGoal?.includes("lose_weight")) {
    return "Weight loss";
  }

  return "Stay Fit";
};

export const getGoalString = (user?: UserInterface): string => {
  if (!user) {
    return "get fit";
  }
  if (user.fitnessGoal?.includes("pcos_pcod")) {
    return "manage your PCOS";
  } else if (user.fitnessGoal?.includes("lose_weight")) {
    const desiredWeight = user.desiredWeight;
    const currentWeight = user.weight;

    if (currentWeight && desiredWeight) {
      const diff = desiredWeight - currentWeight;
      if (diff < 0) {
        return `reduce ${diff} kgs`;
      }
    }

    return `reduce weight`;
  } else if (user.fitnessGoal?.includes("gain_muscle")) {
    return `gain muscle`;
  } else if (user.fitnessGoal?.includes("keep_fit")) {
    return "build healthy habits";
  } else {
    return "get fit";
  }
};
