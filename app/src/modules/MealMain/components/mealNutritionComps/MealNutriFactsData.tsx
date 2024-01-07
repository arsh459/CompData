import { View } from "react-native";
import React from "react";
import { getRoundedValue } from "./MealNutriFacts";
import NutriValuesV2 from "@modules/Nutrition/Components/NutriValuesV2";
import { calculateNutritionData } from "@modules/Nutrition/Components/V2/utils";
import { useMealStore } from "../../store/useMealStore";
import { NutritionFacts } from "@models/Tasks/Task";
import { shallow } from "zustand/shallow";

interface Props {
  nutritionFacts?: NutritionFacts;
}

const MealNutriFactsData: React.FC<Props> = ({ nutritionFacts }) => {
  const { currentNutritionFacts } = useMealStore(
    ({ currentNutritionFacts }) => {
      return {
        currentNutritionFacts: currentNutritionFacts,
      };
    },
    shallow
  );
  const { carbsData, fatsData, fibreData, proteinData } =
    calculateNutritionData(currentNutritionFacts, nutritionFacts);
  return (
    <View className="flex justify-between px-4  flex-1">
      <NutriValuesV2
        value={getRoundedValue(nutritionFacts?.protein)}
        text={"protein"}
        isWhite={true}
        bgColorTw="bg-transparent"
        activeColor={proteinData.color}
        currentNutrientValue={getRoundedValue(
          currentNutritionFacts?.protein || 0
        )}
        progress={proteinData.progress}
      />

      <NutriValuesV2
        value={getRoundedValue(nutritionFacts?.fats)}
        text={"fats"}
        isWhite={true}
        bgColorTw="bg-transparent"
        activeColor={fatsData.color}
        currentNutrientValue={getRoundedValue(currentNutritionFacts?.fats || 0)}
        progress={fatsData.progress}
      />
      <NutriValuesV2
        value={getRoundedValue(nutritionFacts?.fibre)}
        text={"fibre"}
        isWhite={true}
        bgColorTw="bg-transparent"
        activeColor={fibreData.color}
        currentNutrientValue={getRoundedValue(
          currentNutritionFacts?.fibre || 0
        )}
        progress={fibreData.progress}
      />

      <NutriValuesV2
        value={getRoundedValue(nutritionFacts?.carbs)}
        text={"carbs"}
        isWhite={true}
        bgColorTw="bg-transparent"
        activeColor={carbsData.color}
        currentNutrientValue={getRoundedValue(
          currentNutritionFacts?.carbs || 0
        )}
        progress={carbsData.progress}
      />
    </View>
  );
};

export default MealNutriFactsData;
