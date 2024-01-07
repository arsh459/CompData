import { View } from "react-native";
import AddNewItem from "@modules/AddNewItem";
import Header from "@modules/Header";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AddNewItemScreenParams } from "@screens/AddNewItemSearchScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { shallow } from "zustand/shallow";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";

const AddNewItemScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const navigation = useNavigation();
  const { taskId, dayRecommendationId } =
    route.params as AddNewItemScreenParams;

  // generate
  const { config } = useConfigContext();
  const { gptPrompt } = useGPTPrompt("customNutritionTask");
  const onAddItem = useAddNewItem((state) => state.onAddItem, shallow);
  // const { queryItem, cookingType } = useAddNewItem((state) => state);
  // console.log(queryItem, cookingType);

  // console.log("gpt", gptPrompt?.prompt);

  function onPress() {
    if (config?.apiKey) {
      onAddItem(config?.apiKey, gptPrompt);

      navigation.navigate("AddNewItemLoadingScreen", {
        taskId,
        dayRecommendationId,
      });
    }

    weEventTrack("AddNewItemLoadingScreen_proceedClick", {});
  }

  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <AddNewItem />
      <AddButton onPress={onPress} cta={"Generate My Meal"} />
    </View>
  );
};

export default AddNewItemScreen;
