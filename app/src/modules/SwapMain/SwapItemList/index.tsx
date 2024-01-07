import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { onSwapMealGuidedOnbordDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import { FlashList } from "@shopify/flash-list";
import { taskCardHeight } from "@modules/SearchMain/TaskCard";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { shallow } from "zustand/shallow";
import SwapItemCard from "../SwapItemCard";
import { onSwapNutritionTask } from "../utils";
// import { useEffect } from "react";
import Footer from "./Footer";
import { useUserStore } from "@providers/user/store/useUserStore";
import TaskCardSwap from "../TaskCardSwap";
import { FuseResult } from "fuse.js";
import { MealTypes, Task } from "@models/Tasks/Task";
// import { useWorkoutTask } from "@hooks/program/useWorkoutTask";

interface Props {
  taskId?: string;
  dayRecommendationId: string;
  toSwapMealType?: MealTypes;
}

const SwapItemList: React.FC<Props> = ({
  taskId,
  dayRecommendationId,
  toSwapMealType,
}) => {
  const navigation = useNavigation();
  const { uid } = useUserStore(
    (state) => ({
      swapMealGuidedOnboardDone: state.user?.flags?.swapMealGuidedOnboardDone,
      uid: state.user?.uid,
    }),
    shallow
  );

  // const { task } = useWorkoutTask(taskId);

  const {
    data,
    // changeIndex,
    index,
    onNext: onEndReached,
    fuseSearchOn,
    fuseData,
    // fuse,
  } = useAlgoliaStore(
    (state) => ({
      data: state.data,
      index: state.index,
      onNext: state.onNext,
      changeIndex: state.changeIndex,
      fuseSearchOn: state.recommended,
      fuseData: state.fuseData,
      fuse: state.recommendedFuse,
    }),
    shallow
  );

  // update index
  // useEffect(() => {
  //   if (index === "appsearch") {
  //     changeIndex("dietsearch");
  //   }
  // }, [index]);

  const onSwap = async (swapId: string) => {
    if (uid) {
      // console.log("task", toSwapMealType);
      if (taskId) {
        await onSwapNutritionTask(
          uid,
          dayRecommendationId,
          swapId,
          taskId,
          toSwapMealType ? toSwapMealType : undefined
        );

        navigation.goBack();
        // if (swapMealGuidedOnboardDone) {
        //   onSwapMealGuidedOnbordDone(uid, swapId);
        // }

        weEventTrack("swapScreen_onSwap", {});
      } else {
        navigation.navigate("AlgoliaMealTypeScreen", {
          dayRecommendationId,
          swapId,
          taskId,
          toSwapMealType: toSwapMealType ? toSwapMealType : undefined,
        });
      }
    }
  };

  const keyExtractor = (item: AlgoliaAppSearch, index: number) =>
    `${item.objectID}-${index}`;

  const keyExtractorFuse = (item: FuseResult<Task>, index: number) =>
    `${item.item.id}-${index}`;

  const ItemSeparatorComponent = () => <View className="w-4 aspect-square" />;

  const renderItem = ({ item }: { item: AlgoliaAppSearch; index: number }) => {
    return (
      <View>
        <SwapItemCard
          item={item}
          onSwap={() => onSwap(item.objectID)}
          generateNew={taskId ? false : true}
        />
      </View>
    );
  };

  const renderItemFuse = ({
    item,
  }: {
    item: FuseResult<Task>;
    index: number;
  }) => {
    return (
      <View>
        <TaskCardSwap
          item={item.item}
          onSwap={() => onSwap(item.item.id)}
          generateNew={taskId ? false : true}
        />
      </View>
    );
  };

  // console.log("results", fuseData.length);

  return (
    <>
      {fuseSearchOn ? (
        <>
          <FlashList
            data={fuseData}
            renderItem={renderItemFuse}
            keyExtractor={keyExtractorFuse}
            ItemSeparatorComponent={ItemSeparatorComponent}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            bounces={false}
            className="flex-1 mb-6"
            ListFooterComponent={Footer}
            estimatedItemSize={taskCardHeight}
          />
        </>
      ) : index === "dietsearch" ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          bounces={false}
          className="flex-1 mb-6"
          ListFooterComponent={Footer}
          estimatedItemSize={taskCardHeight}
        />
      ) : null}
    </>
  );
};

export default SwapItemList;
