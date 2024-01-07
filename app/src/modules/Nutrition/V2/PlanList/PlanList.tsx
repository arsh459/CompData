import { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";
import { Task } from "@models/Tasks/Task";
import OnboardPopup from "@components/OnboardPopup";
import { onSwapMealGuidedOnbordDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { FlashList } from "@shopify/flash-list";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import Loading from "@components/loading/Loading";
import NutriCardWithSwapV2 from "@modules/Nutrition/Components/V2/NutriCardWithSwapV2";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { scrollTime } from "./scrollTime";
import { useTasksFromRec } from "@hooks/dayRecs/useTasksFromRec";
import PlanListFooterComp from "./PlanListFooterComp";
import { useNavigation } from "@react-navigation/native";
import PlanListHeading from "./PlanListHeading";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { Text } from "react-native";
import { useMealTiming } from "@screens/SwapScreen/useMealTimings";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { useDayRec } from "@hooks/dayRecs/useDayRec";

export const ItemWidth = 294;
export const horizontalItemHeight = 210;

interface Props {}

const PlanList: React.FC<Props> = ({}) => {
  const flashListRef = useRef<FlashList<Task>>(null);
  const { badgeId } = useSignleBadgeContext();
  const navigation = useNavigation();

  const { activeDate, setActiveTasks } = useDietCalendar((state) => {
    return {
      activeDate: state.active?.currentDate,
      setActiveTasks: state.setActiveTasks,
    };
  }, shallow);

  useDayRec(activeDate, "nutrition", badgeId);

  const {
    uid,
    swapMealGuidedOnboardDone,
    recomendation,
    timings,
    mealTrackOnboarding,
  } = useUserStore((state) => {
    return {
      mealTrackOnboarding: state.user?.flags?.mealTrackOnboarding,
      uid: state.user?.uid,
      swapMealGuidedOnboardDone: state.user?.flags?.swapMealGuidedOnboardDone,
      timings: state.user?.dietForm?.foodTimings,
      recomendation:
        state.recCache && state.recCache[`${badgeId}-${activeDate}`]
          ? state.recCache[`${badgeId}-${activeDate}`]
          : undefined,
    };
  }, shallow);
  // console.log("recommendationId", recomendation?.id);

  const { onQueryChange, changeIndex } = useAlgoliaStore(
    (state) => ({
      onQueryChange: state.onQueryChange,
      changeIndex: state.changeIndex,
    }),
    shallow
  );

  // console.log("recomendationId", recomendation?.id);
  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );

  const { tasks, loading } = useTasksFromRec(
    recomendation?.tasks,
    recomendation?.id
  );

  // console.log("tasks", tasks.length, loading, recomendation?.id);

  const { config } = useConfigContext();

  const [initScroll, setInitScroll] = useState<boolean>(false);

  useEffect(() => {
    setActiveTasks(tasks);
    if (!initScroll && tasks.length) {
      if (config?.mealTimings) {
        const resp = scrollTime(config?.mealTimings, timings);
        if (resp?.selectedMealtype) {
          const index = tasks.findIndex(
            (item) => item.mealTypes === resp.selectedMealtype
          );
          setTimeout(() => {
            flashListRef.current?.scrollToIndex({
              animated: true,
              index: index,
              viewPosition: 0,
            });
          }, 1000);

          setInitScroll(true);
        }
      }
    }
  }, [tasks, initScroll, config?.mealTimings, timings]);
  const { mealType } = useMealTiming();

  function navigationOnAiScanPress() {
    weEventTrack("nutrition_clickAiScan", {});
    if (mealTrackOnboarding) {
      _retakePicture();
      navigation.navigate("AiScanMealTypeScreen", {
        dayRecommendationId: recomendation?.id ? recomendation.id : "",
        mealType: mealType,
      });
    } else {
      _retakePicture();
      navigation.navigate("AiScanOnboardingScreen", {
        index: 0,
        dayRecommendationId: recomendation?.id ? recomendation.id : "",
        mealType: mealType,
      });
    }
  }

  // console.log("hello");

  const keyExtractor = (item: Task, index: number) => `${item.id}-${index}`;

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    return (
      <OnboardPopup
        popupText="Your item has been swapped"
        shouldShow={item.id === swapMealGuidedOnboardDone}
        onPressCta={() => onSwapMealGuidedOnbordDone(uid, "DONE")}
      >
        <View
          className="flex justify-center ml-4 "
          style={{ height: horizontalItemHeight + 70, width: ItemWidth }}
        >
          <NutriCardWithSwapV2
            task={item}
            dayRecommendationId={recomendation?.id ? recomendation.id : ""}
            showWave={item.id === swapMealGuidedOnboardDone}
          />
        </View>
      </OnboardPopup>
    );
  };

  const onAddPress = async () => {
    await changeIndex("dietsearch", undefined, badgeId);
    onQueryChange("", "dietsearch");
    navigation.navigate("SwapScreen", {
      dayRecommendationId: recomendation?.id ? recomendation.id : "",
    });
    weEventTrack("nutrition_clickAdd", {});
  };

  return (
    <View className="mt-10">
      <PlanListHeading
        // navigationOnAddPress={navigationOnAddPress}
        tasksLength={tasks.length}
        onAddPress={onAddPress}
      />

      {loading ? (
        <>
          <View
            className="flex items-center justify-center"
            style={{ height: horizontalItemHeight }}
          >
            <Loading />
          </View>
        </>
      ) : tasks.length === 0 ? (
        <>
          {recomendation?.id ? <></> : <></>}
          <View className="">
            {recomendation?.id ? (
              <PlanListFooterComp
                onAddPress={onAddPress}
                tasksLength={tasks.length}
                navigationOnAiScanPress={navigationOnAiScanPress}
              />
            ) : (
              <View className="px-6 pt-16 pb-12 flex items-center justify-center">
                <Text
                  className="flex-1 text-center items-center justify-centertext-xs text-[#FFDA59]"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  Plan will get generated as you get closer to this day.
                </Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View className="">
            <FlashList
              ref={flashListRef}
              data={tasks}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              onEndReachedThreshold={0.9}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              ListFooterComponent={
                <PlanListFooterComp
                  onAddPress={onAddPress}
                  tasksLength={tasks.length}
                  navigationOnAiScanPress={navigationOnAiScanPress}
                />
              }
              estimatedItemSize={ItemWidth}
              ItemSeparatorComponent={() => (
                <View className="w-4 aspect-square" />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PlanList;
