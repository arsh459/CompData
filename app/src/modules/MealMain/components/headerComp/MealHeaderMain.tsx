import Header from "@modules/Header";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
// import RecipeOptionNode from "./RecipeOptionNode";

interface Props {
  // recipeTaskId?: string;
  toBeSwaped?: SwapItemParams;
  dayRecommendationId?: string;
}

const MealHeaderMain: React.FC<Props> = ({
  toBeSwaped,
  dayRecommendationId,
}) => {
  // const onAiScan = () => {
  //   if (dayRecommendationId) {
  //     if (mealTrackOnboarding) {
  //       navigation.navigate("AiScanMealTypeScreen", {
  //         mealType: task?.mealTypes,
  //         taskId: task?.id,
  //         dayRecommendationId,
  //       });
  //       weEventTrack("MealScreen_ImageCaptureScreen", {
  //         dayRecommendationId,
  //         taskId: task?.id ? task.id : "",
  //       });
  //     } else {
  //       navigation.navigate("AiScanOnboardingScreen", {
  //         index: 0,
  //         mealType: task?.mealTypes,
  //         taskId: task?.id,
  //         dayRecommendationId,
  //       });
  //       weEventTrack("MealScreen_AiScanOnboarding", {
  //         dayRecommendationId,
  //         taskId: task?.id ? task.id : "",
  //       });
  //     }
  //   }
  // };

  return (
    <Header
      back={true}
      headerType="transparent"
      tone="dark"
      backIcon="arrow_filled"
      headerColor="#070707"
      // optionNode={
      //   !toBeSwaped &&
      //   dayRecommendationId && <AiScanOptionNode onAiScan={onAiScan} />
      // }
    />
  );
};

export default MealHeaderMain;
