import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import MealMain from "@modules/MealMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useRoute } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import Loading from "@components/loading/Loading";
import { View } from "react-native";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
import { useTaskUpdate } from "@modules/MealMain/hooks/useTaskUpdate";
import { RootStackParamList } from "@routes/MainStack";
import { MealTypes } from "@models/Tasks/Task";

export interface MealScreenTypes {
  taskId: string;
  selectedUnix?: number;
  mealType?: MealTypes;
  toBeSwaped?: SwapItemParams;
  navBackScreen?: keyof RootStackParamList;
  dayRecommendationId?: string;
}

const MealScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const {
    taskId,
    selectedUnix,
    toBeSwaped,
    navBackScreen,
    dayRecommendationId,
    mealType,
  } = route.params as MealScreenTypes;

  const { uid } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
    };
  }, shallow);

  useTaskUpdate(taskId);

  const {
    initializing,
    initMealStore,
    resetMealStore,
    setDayRecommendationId,
    setOverridedMealType,
  } = useMealStore((state) => {
    return {
      initializing: state.initializing,
      initMealStore: state.onInit,
      resetMealStore: state.onReset,
      setDayRecommendationId: state.setDayRecommendationId,
      setOverridedMealType: state.setOverridedMealType,
    };
  }, shallow);

  useEffect(() => {
    if (uid && taskId && selectedUnix) {
      initMealStore(uid, taskId, selectedUnix);
      setDayRecommendationId(dayRecommendationId);
      setOverridedMealType(mealType);

      return () => resetMealStore();
    }
  }, [uid, taskId, selectedUnix]);

  return initializing ? (
    <View className="flex-1 bg-[#232136] flex justify-center items-center">
      <Loading />
    </View>
  ) : (
    <MealMain
      toBeSwaped={toBeSwaped}
      dayRecommendationId={dayRecommendationId}
      navBackScreen={navBackScreen}
    />
  );
};

export default MealScreen;
