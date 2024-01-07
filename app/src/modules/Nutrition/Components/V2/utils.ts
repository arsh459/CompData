import {
  carbsIconWhiteFrame12,
  eggIconWhiteFrame12,
  fatsIconWhiteFrame12,
  fibreIconWhiteFrame12,
} from "@constants/imageKitURL";
import { NutritionFacts } from "@models/Tasks/Task";
import { getRoundedValueNumber } from "@modules/MealMain/components/mealNutritionComps/MealNutriFacts";

export const getIconsNutrients = (text: string) => {
  switch (text) {
    case "protein":
      return eggIconWhiteFrame12;
    case "carbs":
      return carbsIconWhiteFrame12;
    case "fats":
      return fatsIconWhiteFrame12;
    case "fiber":
      return fibreIconWhiteFrame12;
    default:
      null;
  }
};

export const calcProgressOfNutri = (num1?: number, num2?: number) => {
  const val1 = num1 ? num1 : 0;
  const val2 = num2 ? num2 : 0;
  const progress = (val1 / val2) * 100;

  const color = "#FF6B6B";

  const numberProgress = getRoundedValueNumber(progress);
  if (progress >= 0 && progress <= 25) {
    return { progress: numberProgress, color: "#FF6B6B" };
  } else if (progress > 25 && progress <= 50) {
    // for 25-50
    return { progress: numberProgress, color: "#FFF96B" };
  } else if (progress > 50 && progress <= 100) {
    return { progress: numberProgress, color: "#6BFF8C" };
    // for 50-100
  }
  return { progress: 100, color };
};

export const calculateNutritionData = (
  currentNutritionFacts: NutritionFacts,
  nutritionFacts?: NutritionFacts
) => {
  const proteinData = calcProgressOfNutri(
    currentNutritionFacts?.protein,
    nutritionFacts?.protein
  );
  const fibreData = calcProgressOfNutri(
    currentNutritionFacts?.fibre,
    nutritionFacts?.fibre
  );
  const fatsData = calcProgressOfNutri(
    currentNutritionFacts?.fats,
    nutritionFacts?.fats
  );
  const carbsData = calcProgressOfNutri(
    currentNutritionFacts?.carbs,
    nutritionFacts?.carbs
  );

  return {
    proteinData,
    fibreData,
    fatsData,
    carbsData,
  };
};
