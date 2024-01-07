import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddNewItemMealTypeModule from "@modules/AddNewItemMealTypeModule";
import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AddNewItemScreenParams } from "@screens/AddNewItemSearchScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

const AddNewItemMealTypeScreen = () => {
  const route = useRoute();
  const params = route.params as AddNewItemScreenParams;
  useScreenTrack();
  const navigation = useNavigation();

  const { mealType, setMealType } = useAddNewItem(
    (state) => ({
      mealType: state.mealType,
      setMealType: state.setMealType,
    }),
    shallow
  );

  useEffect(() => {}, []);
  function navigateToNext() {
    navigation.navigate("AddNewItemScreen", {
      taskId: params.taskId,
      dayRecommendationId: params.dayRecommendationId,
    });
    weEventTrack("AddNewItemMealTypeScreen_proceed", {});
  }
  return (
    <AddNewItemMealTypeModule
      onProceed={navigateToNext}
      mealType={mealType}
      setMealType={setMealType}
    />
  );
};

export default AddNewItemMealTypeScreen;
