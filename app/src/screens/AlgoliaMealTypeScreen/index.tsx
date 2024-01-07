import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
// import useAlgoliaNutrition from "@hooks/program/useAlgoliaNutrition";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { MealTypes } from "@models/Tasks/Task";
import AlgoliaMealTypeModule from "@modules/AlgoliaMealTypeModule";
// import { onSwapMealGuidedOnbordDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { onSwapNutritionTask } from "@modules/SwapMain/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
export interface AlgoliaMealTypeScreenParams {
  dayRecommendationId: string;
  swapId: string;
  taskId?: string;
  toSwapMealType?: MealTypes;
}
const AlgoliaMealTypeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useScreenTrack();
  const { uid } = useUserStore(
    (state) => ({
      swapMealGuidedOnboardDone: state.user?.flags?.swapMealGuidedOnboardDone,
      uid: state.user?.uid,
    }),
    shallow
  );
  const { dayRecommendationId, swapId, taskId, toSwapMealType } =
    route.params as AlgoliaMealTypeScreenParams;

  const { overridedMealType, setOverridedMealType } = useAlgoliaStore(
    (state) => ({
      overridedMealType: state.overridedMealType,
      setOverridedMealType: state.setOverridedMealType,
    }),
    shallow
  );

  useEffect(() => {
    setOverridedMealType(toSwapMealType);
  }, [toSwapMealType]);

  async function navigateToNext() {
    if (uid) {
      await onSwapNutritionTask(
        uid,
        dayRecommendationId,
        swapId,
        taskId,
        overridedMealType ? overridedMealType : undefined
      );
      navigation.goBack();
      navigation.goBack();
      // if (swapMealGuidedOnboardDone) {
      //   onSwapMealGuidedOnbordDone(uid, swapId);
      // }
      weEventTrack("AlgoliaMealTypeScreen_onAdd", {});
    }
  }
  return <AlgoliaMealTypeModule onProceed={navigateToNext} />;
};

export default AlgoliaMealTypeScreen;
