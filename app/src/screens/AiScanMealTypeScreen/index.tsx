import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddNewItemMealTypeModule from "@modules/AddNewItemMealTypeModule";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImageCaptureScreenParams } from "@screens/ImageCaptureScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

const AiScanMealTypeScreen = () => {
  const route = useRoute();
  const params = route.params as ImageCaptureScreenParams;
  useScreenTrack();
  const navigation = useNavigation();

  const { mealType, setMealType } = useCameraImage(
    (state) => ({
      mealType: state.mealType,
      setMealType: state.setMealType,
    }),
    shallow
  );

  useEffect(() => {
    setMealType(params.mealType);
  }, [params.mealType]);

  // console.log("mealType", params.mealType);

  function navigateToNext() {
    navigation.navigate("ImageCaptureScreen", {
      taskId: params.taskId,
      dayRecommendationId: params.dayRecommendationId,
      mealType: mealType,
    });
    weEventTrack("AiScanMealTypeScreen_proceed", {});
  }
  return (
    <AddNewItemMealTypeModule
      onProceed={navigateToNext}
      mealType={mealType}
      setMealType={setMealType}
    />
  );
};

export default AiScanMealTypeScreen;
