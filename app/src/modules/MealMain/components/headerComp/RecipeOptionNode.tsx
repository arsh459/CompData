import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { TouchableOpacity, Text, View } from "react-native";

interface Props {
  recipeTaskId?: string;
}

const RecipeOptionNode: React.FC<Props> = ({ recipeTaskId }) => {
  const navigation = useNavigation();
  return (
    <View>
      {recipeTaskId ? (
        <>
          <TouchableOpacity
            className="flex flex-row justify-center items-center rounded-lg py-1.5 px-3 shadow-md bg-white"
            onPress={() => {
              navigation.navigate("RecipeeDetailScreen", {
                taskId: recipeTaskId,
              });
              weEventTrack("mealScreen_viewRecipee", {});
            }}
          >
            <Text
              style={{ color: "#6D55D1", fontFamily: "Nunito-Bold" }}
              className="text-sm tracking-wide"
            >
              Recipe
            </Text>
            <View className="w-3 aspect-square ml-1 ">
              <ArrowIcon direction="right" color="#6D55D1" />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default RecipeOptionNode;
