import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import ErrorComp from "@modules/AddNewItem/components/loadingScreen/ErrorComp";
import { useLoadingAnimation } from "./hooks/useLoadingAnimation";
import LoadingProgressBar from "@modules/AddNewItem/components/loadingScreen/LoadingProgressBar";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";

interface Props {
  taskId?: string;
  dayRecommendationId: string;
}

const AddNewItemLoading: React.FC<Props> = ({
  taskId,
  dayRecommendationId,
}) => {
  //setting route and navigation

  const navigation = useNavigation();

  const { activeUnix } = useDietCalendar((state) => {
    return { activeUnix: state.active?.unix };
  });

  const { fetchingStatus, genTaskId } = useAddNewItem(
    (state) => ({
      fetchingStatus: state.fetchingStatus,
      genTaskId: state.genTask?.id,
    }),
    shallow
  );

  useEffect(() => {
    if (fetchingStatus === "done" && genTaskId) {
      navigation.dispatch((state) => {
        const routes = state.routes.filter(
          (r) => r.name !== "AddNewItemLoadingScreen"
        );

        const toPushParams: SwapItemParams = {
          dayRecommendationId: dayRecommendationId,
          taskId: taskId ? taskId : undefined,
        };

        routes.push({
          key: `MealScreen-${Math.random() * 1000}`,
          name: "MealScreen",
          params: {
            taskId: genTaskId,
            selectedUnix: activeUnix,
            toBeSwaped: toPushParams,
          },
        });

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }
  }, [fetchingStatus, genTaskId]);

  const { value, valueCircle, LOADING_TIME } = useLoadingAnimation();

  return (
    <View className="flex-1 bg-[#232136]">
      {fetchingStatus === "fetching" || fetchingStatus === "done" ? (
        <LoadingProgressBar
          valueCircleAnimation={valueCircle}
          valuePercent={value}
          animationDuration={LOADING_TIME}
        />
      ) : fetchingStatus === "error" ? (
        <ErrorComp />
      ) : (
        <></>
      )}
    </View>
  );
};

export default AddNewItemLoading;
