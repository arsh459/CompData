import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import useCustomRecipe from "@providers/customRecipe/useCustomRecipe";
import IngredientsItem from "../../modules/CustomRecipeIngredients/IngredientsItem";
import { useCustomRecipeInitialization } from "@hooks/customRecipe/useCustomRecipeInitialization";
import { useNavigation } from "@react-navigation/native";
import CustomRecipeButton from "@screens/RecipeeDetailScreen/CustomRecipeButton";
import CustomRecipeHeader from "@components/CustomRecipeHeader/CustomRecipeHeader";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";

export interface TaskIdParams {
  taskId: string | undefined;
}

const CustomRecipeIngredientsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as TaskIdParams;
  useCustomRecipeInitialization(params.taskId);
  useScreenTrack();

  const { selectedIngredientsArrayOrdered } = useCustomRecipe((state) => ({
    selectedIngredientsArrayOrdered: state.selectedIngredientsArrayOrdered,
  }));

  const { gptPrompt } = useGPTPrompt("ingredientReplacement");

  function navigateToNext() {
    weEventTrack("CustomRecipeIngredientsScreen", {
      taskId: params.taskId ? params.taskId : "no name",
    });
    navigation.navigate("CustomRecipeCookingTime", {
      taskId: params.taskId,
    });
  }
  return (
    <>
      <CustomRecipeHeader
        title="Customize this recipe"
        progress={0.33}
        color="#FF5970"
        iconType="CustomRecipe"
      />

      <View className="">
        <View className="h-full w-full bg-[#232136] px-2">
          {/* page description */}
          <View className="px-4">
            <View className="w-full mt-28 mb-8">
              <Text className="text-zinc-100 text-xl font-bold font-['Nunito'] tracking-wider">
                Choose the ingredients you want to replace or remove from the
                recipe 🥣
              </Text>
            </View>
          </View>

          {/* Ingredients list */}
          <ScrollView className="px-4">
            {selectedIngredientsArrayOrdered.length > 0 &&
              selectedIngredientsArrayOrdered.map((ingredient, index) => (
                <IngredientsItem
                  key={ingredient.name + "-" + index}
                  title={ingredient.name}
                  index={index}
                  gptPrompt={gptPrompt}
                />
              ))}
          </ScrollView>

          {/* Next button */}
          <View className="">
            <View className="">
              <CustomRecipeButton
                isIconSvg={false}
                iconType="CustomRecipe"
                onPress={navigateToNext}
                text="Next"
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomRecipeIngredientsScreen;
