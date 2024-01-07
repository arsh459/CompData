import { useEffect } from "react";
import { useState } from "react";
import { View } from "react-native";
import DescriptionText from "./DescriptionText";
import ActionableComp from "./ActionableComp";
import { MealTypes } from "@models/Tasks/Task";
import CameraViewComp from "./CameraViewComp";
import { Camera } from "expo-camera";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
import { shallow } from "zustand/shallow";

interface Props {
  mealType: MealTypes;
  taskId?: string;
  dayRecommendationId: string;
}
const ImageMain: React.FC<Props> = ({
  mealType,
  taskId,
  dayRecommendationId,
}) => {
  const navigation = useNavigation();

  const { stage, itemsStringArray } = useCameraImage(
    (state) => ({
      stage: state.stage,
      itemsStringArray: state.itemsStringArray,
    }),
    shallow
  );

  const navigateToNext = () => {
    navigation.dispatch((state) => {
      const routes = state.routes.filter(
        (r) =>
          r.name !== "AiScanOnboardingScreen" &&
          r.name !== "AiScanItemSelectionScreen"
      );
      const toPushParams: SwapItemParams = {
        dayRecommendationId: dayRecommendationId,
        taskId: taskId ? taskId : undefined,
      };
      routes.push({
        key: `AiScanItemSelectionScreen-${Math.random() * 1000}`,
        name: "AiScanItemSelectionScreen",
        params: {
          toBeSwaped: toPushParams,
        },
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  useEffect(() => {
    if (stage === "scanned" && itemsStringArray) {
      navigateToNext();
    }
  }, [stage, itemsStringArray]);

  const [camera, setCamera] = useState<Camera | null>(null);

  return (
    <View className="flex-1 w-full pt-20 relative">
      <CameraViewComp
        mealType={mealType}
        camera={camera}
        setCamera={setCamera}
      />
      <DescriptionText />
      <ActionableComp
        camera={camera}
        mealType={mealType}
        navigateOnDone={navigateToNext}
      />
    </View>
  );
};

export default ImageMain;
