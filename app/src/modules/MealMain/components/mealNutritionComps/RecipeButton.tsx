import SvgIcons from "@components/SvgIcons";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { TouchableOpacity, View, Text } from "react-native";
import { shallow } from "zustand/shallow";
const RecipeButton = () => {
  const navigation = useNavigation();

  const { recipeTaskId } = useMealStore(({ task }) => {
    return {
      recipeTaskId: task?.recipeTaskId
        ? task.recipeTaskId
        : task?.id
        ? task.id
        : "",
    };
  }, shallow);

  const navigateToRecipe = () => {
    navigation.navigate("RecipeeDetailScreen", {
      taskId: recipeTaskId,
    });
    weEventTrack("mealScreen_viewRecipee", {});
  };
  return (
    <TouchableOpacity
      className="py-2.5 flex flex-row items-center justify-center"
      onPress={navigateToRecipe}
    >
      <View className="mr-2">
        <View className="w-2.5">
          <SvgIcons iconType="listIcon" color="#fff" />
        </View>
      </View>
      <View>
        <Text
          className="text-white text-xs  tracking-tight"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Tap to view recipe
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default RecipeButton;
