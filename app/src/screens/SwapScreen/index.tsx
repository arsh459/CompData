import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { MealTypes } from "@models/Tasks/Task";
import SwapMain from "@modules/SwapMain";
import { useRoute } from "@react-navigation/native";
import { useMealTiming } from "./useMealTimings";

export interface NutritionSwapParams {
  mealType?: MealTypes;
  taskId?: string;
  dayRecommendationId: string;
}
const SwapScreen = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params as NutritionSwapParams;
  const { mealType } = useMealTiming();

  return (
    <SwapMain
      mealType={
        params.mealType ? params.mealType : mealType ? mealType : "Breakfast"
      }
      taskId={params.taskId}
      dayRecommendationId={params.dayRecommendationId}
    />
  );
};
export default SwapScreen;
