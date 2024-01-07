import { MealTypes } from "@models/Tasks/Task";
import AiScanOnboardingModule from "@modules/AiScanOnboardingScreen/AiScanOnboardingModule";
import { useRoute } from "@react-navigation/native";

export interface AiScanOnboardinScreenParams {
  index: number;
  mealType?: MealTypes;
  taskId?: string;
  dayRecommendationId: string;
}

const AiScanOnboardingScreen = () => {
  const route = useRoute();
  const { index, mealType, taskId, dayRecommendationId } =
    route.params as AiScanOnboardinScreenParams;
  return (
    <AiScanOnboardingModule
      index={index}
      mealType={mealType}
      taskId={taskId}
      dayRecommendationId={dayRecommendationId}
    />
  );
};

export default AiScanOnboardingScreen;
