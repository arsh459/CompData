import { Text, View } from "react-native";
import { useMealStore } from "../../store/useMealStore";
import { shallow } from "zustand/shallow";
import MealNutriFactsData from "./MealNutriFactsData";
// import NutriValues from "@modules/Nutrition/Components/NutriValues";
import clsx from "clsx";
import GptMealNutriFactsData from "./GptMealNutriFactsData";
import RecipeButton from "./RecipeButton";

export const getRoundedValue = (val?: number) => {
  if (val) {
    return (Math.round(val * 10) / 10).toFixed(1);
  }

  return "0.0";
};
export const getRoundedValueNumber = (val?: number) => {
  if (val) {
    return +(Math.round(val * 10) / 10).toFixed(1);
  }

  return 0;
};

const MealNutriFacts = () => {
  const {
    mealTypes,
    kcal,
    nutritionFacts,
    currentKCal,
    gptGeneratedNutrition,
    recipeTaskId,
  } = useMealStore(({ task, currentKCal, dayRecommendationId }) => {
    return {
      mealTypes: task?.mealTypes,

      taskId: task?.id,
      kcal: task?.kcal,
      currentKCal,
      gptGeneratedNutrition: task?.gptGeneratedNutrition,
      nutritionFacts: task?.nutritionFacts,
      dayRecommendationId: dayRecommendationId,
      recipeTaskId: task?.cookingInstruction?.length
        ? task.id
        : task?.recipeTaskId
        ? task.recipeTaskId
        : "",
    };
  }, shallow);

  // const { taskMealType } = useRecommendationById(dayRecommendationId, taskId);
  const roundedKCAL = currentKCal
    ? Math.round(currentKCal)
    : kcal
    ? Math.round(kcal)
    : 0;

  return (
    <View
      className={clsx(
        "mx-4 rounded-3xl overflow-hidden bg-[#3B3762]",
        recipeTaskId ? "" : ""
      )}
    >
      <View
        className={clsx(
          "bg-[#2F2C4D]  py-5 rounded-3xl ",
          gptGeneratedNutrition ? "" : "aspect-[325/205]"
        )}
      >
        <View
          className={clsx(
            "flex flex-row justify-between px-5 pb-4 ",
            gptGeneratedNutrition ? "" : ""
          )}
        >
          <Text
            className="text-base text-[#f1f1f1]"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            {mealTypes}
          </Text>
          <Text
            style={{ fontFamily: "Poppins-SemiBold" }}
            className="text-base  text-[#f1f1f1] "
          >
            {gptGeneratedNutrition
              ? `${roundedKCAL}kcal`
              : `${roundedKCAL}/${kcal}kcal`}
          </Text>
        </View>

        {gptGeneratedNutrition ? (
          <GptMealNutriFactsData nutritionFacts={nutritionFacts} />
        ) : (
          <MealNutriFactsData nutritionFacts={nutritionFacts} />
        )}
      </View>
      {recipeTaskId ? (
        <>
          <RecipeButton />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default MealNutriFacts;
