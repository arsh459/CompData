import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { MealTypes } from "@models/Tasks/Task";
import ImageCaptureScreenModule from "@modules/ImageCaptureScreen";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

export interface ImageCaptureScreenParams {
  mealType?: MealTypes;
  taskId?: string;
  dayRecommendationId: string;
}

const ImageCaptureScreen = () => {
  const route = useRoute();
  const params = route.params as ImageCaptureScreenParams;
  useScreenTrack();

  const { setMealType } = useCameraImage(
    (state) => ({
      setMealType: state.setMealType,
    }),
    shallow
  );

  // console.log("imageCaptureScreenParams", params);
  useEffect(() => {
    setMealType(params.mealType);
  }, [params.mealType]);

  return (
    <InteractionProvider>
      <ImageCaptureScreenModule
        mealType={params.mealType}
        taskId={params.taskId}
        dayRecommendationId={params.dayRecommendationId}
      />
    </InteractionProvider>
  );
};

export default ImageCaptureScreen;
