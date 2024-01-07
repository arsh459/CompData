import useCustomRecipe from "@providers/customRecipe/useCustomRecipe";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import LoadingSpinner from "@components/LoadingSpinner";
import { CommonActions, useNavigation } from "@react-navigation/native";
import CustomRecipeButton from "@screens/RecipeeDetailScreen/CustomRecipeButton";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export interface GptIngredient {
  name: string;
  quantity: string;
  unit: string;
}
export interface GptNutritionalValue {
  kcal: string;
  protein: string;
  fats: string;
  carbs: string;
  fibre: string;
}
export interface ChatGptCustomRecipe {
  ingredientsArray: GptIngredient[];
  recipeNameArray: string[];
  recipeCookingInstructionsArray: string[];
  nutritionalValueArray: GptNutritionalValue[];
  mealType: string;
  readyIn: string;
}
const CustomRecipeLoadingScreen = () => {
  const navigation = useNavigation();
  const { fetchingStatus, generatedTaskId } = useCustomRecipe((state) => {
    return {
      fetchingStatus: state.fetchingStatus,
      generatedTaskId: state.generatedTaskId,
    };
  }, shallow);
  useScreenTrack("CustomRecipeLoadingScreen");

  function navigateOnSuccess(taskId: string) {
    navigation.dispatch((state) => {
      const routes = state.routes.filter(
        (r) =>
          r.name !== "CustomRecipeLoadingScreen" &&
          r.name !== "CustomRecipeCookingTime" &&
          r.name !== "CustomRecipeIngredientsScreen"
      );
      routes.push({
        key: `RecipeeDetailScreen-${Math.random() * 1000}`,
        name: "RecipeeDetailScreen",
        params: { taskId: taskId },
      });
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    weEventTrack("CustomRecipe_success", {
      taskId: taskId,
    });
  }

  function navigationOnErrorButtonClick() {
    navigation.dispatch((state) => {
      const routes = state.routes.filter(
        (r) =>
          r.name !== "CustomRecipeLoadingScreen" &&
          r.name !== "CustomRecipeCookingTime" &&
          r.name !== "CustomRecipeIngredientsScreen"
      );
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    weEventTrack("CustomRecipe_failure", {});
  }

  useEffect(() => {
    if (fetchingStatus === "done" && generatedTaskId) {
      navigateOnSuccess(generatedTaskId);
    }
  }, [fetchingStatus, generatedTaskId]);

  return (
    <>
      {fetchingStatus === "error" ? (
        <>
          <View className="w-full h-full flex justify-between items-center bg-[#232136] ">
            <View></View>
            <View className="px-20">
              <Text
                numberOfLines={2}
                className="text-[#FF6069] text-xl font-semibold tracking-wide text-center"
              >
                Error : Recipe could not be generated
              </Text>
            </View>
            <View className="w-full px-2">
              <View className="">
                <CustomRecipeButton
                  isIconSvg={false}
                  onPress={navigationOnErrorButtonClick}
                  text="Retry recipe"
                />
              </View>
            </View>
          </View>
        </>
      ) : (
        <View className="w-full h-full  flex justify-center items-center bg-[#232136]">
          <View className=" w-32 aspect-[115/95] mb-3">
            <LoadingSpinner title="Customizing this Recipe..." />
          </View>
        </View>
      )}
    </>
  );
};

export default CustomRecipeLoadingScreen;
