import { NutritionFacts } from "@models/Tasks/Task";
import { getRoundedValue } from "@modules/MealMain/components/mealNutritionComps/MealNutriFacts";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import NutriValues from "@modules/Nutrition/Components/NutriValues";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  nutritionFacts?: NutritionFacts;
}

const GptMealNutriFactsData: React.FC<Props> = ({ nutritionFacts }) => {
  const { currentNutritionFacts } = useMealStore(
    ({ currentNutritionFacts }) => {
      return {
        currentNutritionFacts: currentNutritionFacts,
      };
    },
    shallow
  );
  return (
    <View className="flex flex-row p-4">
      <View className="w-2/5">
        <NutriValues
          value={getRoundedValue(
            currentNutritionFacts?.protein
              ? currentNutritionFacts?.protein
              : nutritionFacts?.protein
          )}
          text={"protein"}
          isWhite={true}
          bgColorTw="bg-transparent"
          customStr="p-0"
        />
        <View className="w-4 aspect-square" />
        <NutriValues
          value={getRoundedValue(
            currentNutritionFacts?.fibre
              ? currentNutritionFacts?.fibre
              : nutritionFacts?.fibre
          )}
          text={"fibre"}
          isWhite={true}
          bgColorTw="bg-transparent"
          customStr="p-0"
        />
      </View>

      <View className="w-1/5" />

      <View className="w-2/5">
        <NutriValues
          value={getRoundedValue(
            currentNutritionFacts?.fats
              ? currentNutritionFacts?.fats
              : nutritionFacts?.fats
          )}
          text={"fats"}
          isWhite={true}
          bgColorTw="bg-transparent"
          customStr="p-0"
        />
        <View className="w-4 aspect-square" />
        <NutriValues
          value={getRoundedValue(
            currentNutritionFacts?.carbs
              ? currentNutritionFacts?.carbs
              : nutritionFacts?.carbs
          )}
          text={"carbs"}
          isWhite={true}
          bgColorTw="bg-transparent"
          customStr="p-0"
        />
      </View>
    </View>
  );
};

export default GptMealNutriFactsData;
