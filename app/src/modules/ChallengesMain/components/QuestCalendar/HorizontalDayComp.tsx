import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { CalendarDate } from "@providers/period/periodStore";
import { useEffect } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import RenderComp from "./RenderComp";
import { useCallback } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";

const { width } = Dimensions.get("window");
export const calendatItemWidth = Math.round(width / 7);
export const horizontalItemHeight = calendatItemWidth * 2;

const renderItem = (item: ListRenderItemInfo<CalendarDate>) => {
  return <RenderComp {...item} />;
};

const HorizontalDayComp = () => {
  const { roundEnd, roundStart } = useUserStore(
    (state) => ({
      roundStart: state.currentRound?.start,
      roundEnd: state.currentRound?.end,
    }),
    shallow
  );
  const {
    isVisible,
    weeksData,
    onInit,
    onNext,
    getPrevious,
    initialScrollIndex,
  } = useQuestCalendar(
    (state) => ({
      isVisible: state.isVisible,
      weeksData: state.weeksData,
      onInit: state.onInit,
      onNext: state.onNext,
      initialScrollIndex: state.initialScrollIndex,

      getPrevious: state.getPrevious,
    }),
    shallow
  );

  // const onViewableItemsChanged = useCallback(
  //   (v: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
  //     if (v.viewableItems.length >= 7) {
  //       if (v.viewableItems[2] && v.viewableItems[2].isViewable) {
  //         // const item = v.viewableItems[2].item as CalendarDate[];
  //         // const viewingMonth = item.visibleDate.split(" ")[1];
  //         // setViewMonth(viewingMonth);
  //       }
  //     }
  //   },
  //   []
  // );

  // console.log("roundStart", roundStart);

  const keyExtractor = (item: CalendarDate) => `${item.unix}`;

  const onScrollDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.x == 0) {
        // if (round && round.start && round?.start < weeksData[0].unix) {
        getPrevious();
        // }
      }
    },
    []
    // [weeksData]
  );

  useEffect(() => {
    if (roundStart && roundEnd) onInit(roundStart, roundEnd);
  }, [roundStart, roundEnd]);

  return (
    <>
      {isVisible && weeksData.length > 0 ? (
        <View className="w-full mt-4">
          <View
            style={{
              width: calendatItemWidth * 7,
              height: horizontalItemHeight,
              flex: 1,
            }}
            className="flex flex-row"
          >
            <FlashList
              scrollEventThrottle={16}
              // onViewableItemsChanged={onViewableItemsChanged}
              renderItem={renderItem}
              data={weeksData}
              estimatedItemSize={calendatItemWidth}
              horizontal={true}
              keyExtractor={keyExtractor}
              snapToInterval={calendatItemWidth * 7}
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              initialScrollIndex={initialScrollIndex}
              onEndReached={onNext}
              onEndReachedThreshold={0.8}
              onScrollEndDrag={onScrollDrag}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default HorizontalDayComp;
