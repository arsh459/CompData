import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  CalendarDate,
  useCurrentPeriodStore,
} from "@providers/period/periodStore";
import { useCallback, useEffect, useRef } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewToken,
} from "react-native";
import HorizontalDayComponentV2, {
  calendatItemWidth,
  horizontalItemHeight,
} from "@modules/Nutrition/V2/DaySelector/V3/HorizontalDayComponentV2";
import { shallow } from "zustand/shallow";
import { useUserContext } from "@providers/user/UserProvider";
import { useIsForeground } from "@hooks/utils/useIsForeground";
// import { refreshPeriodTrackerData } from "./utils";
// import { format } from "date-fns";
// import { updatePeriodSync } from "@models/User/updateUtils";

interface Props {}

const HorizontalPeriodCalendarV2: React.FC<Props> = ({}) => {
  // const { todayUnix } = useAuthContext();

  const flashListRef = useRef<FlashList<CalendarDate>>(null);

  const {
    initialise,
    onEndReached,
    // toggleLoading,
    onViewMonthChange,
    onPreviousWeek,
    onToggleDayLoading,
    // onPreviousWeekData,

    onEndReachedData,
  } = useCurrentPeriodStore(
    (state) => ({
      onEndReached: state.onNextWeek,
      onEndReachedData: state.onNextWeekData,
      initialise: state.initData,
      onPreviousWeek: state.onPreviousWeek,
      // onPreviousWeekData: state.onPreviousWeekData,
      toggleLoading: state.toggleLoading,
      onViewMonthChange: state.onViewMonthChange,
      onToggleDayLoading: state.onToggleDayLoading,
    }),
    shallow
  );

  const { periodData, initialScrollIndex } = useCurrentPeriodStore(
    (state) => ({
      periodData: state.horizontalDateList,
      initialScrollIndex: state.initialScrollIndex,
    }),
    shallow
  );

  const onNext = useCallback(() => {
    onEndReached();
    onEndReachedData();
  }, []);

  const { user } = useUserContext();
  const { state, todayUnix, today } = useAuthContext();

  const { appStateVisible } = useIsForeground();
  useEffect(() => {
    const resyncUser = async (uid: string) => {
      // await refreshPeriodTrackerData(uid);
      initialise(uid, todayUnix);
      // await updatePeriodSync(uid, format(todayUnix, "yyyy-MM-dd"));
    };

    if (
      appStateVisible === "active" &&
      state.uid &&
      today !== user?.periodTrackerObj?.lastRefresh
    ) {
      // console.log("resyncing");
      resyncUser(state.uid);
    } else if (state.uid && appStateVisible === "active") {
      // console.log("just reload");
      initialise(state.uid, todayUnix);
    }
  }, [
    user?.periodTrackerObj?.lastRefresh,
    today,
    state.uid,
    todayUnix,
    appStateVisible,
  ]);

  const keyExtractor = (item: CalendarDate) => item.currentDate;

  //   return <View />;
  const renderItem = (item: ListRenderItemInfo<CalendarDate>) => {
    return <HorizontalDayComponentV2 {...item} />;
  };

  const onViewableItemsChanged = useCallback(
    (v: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (v.viewableItems.length >= 3) {
        if (v.viewableItems[2] && v.viewableItems[2].isViewable) {
          const item = v.viewableItems[2].item as CalendarDate;
          const viewingMonth = item.currentDate.split("-")[1];

          onViewMonthChange(viewingMonth);
        }
      }
    },
    []
  );

  const onScrollBegin = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.x === 0) {
        onToggleDayLoading(true);
        onPreviousWeek();
        // onPreviousWeekData();
      }
    },
    []
  );

  const [forceScroll, postScroll] = useCurrentPeriodStore(
    (state) => [state.forceScrollIndex, state.postForceScroll],
    shallow
  );

  useEffect(() => {
    if (forceScroll >= 0) {
      setTimeout(() => {
        flashListRef.current?.scrollToIndex({
          animated: true,
          index: forceScroll,
          viewPosition: 0,
        });
        postScroll();
      }, 200);
    }
  }, [forceScroll]);

  return periodData.length && initialScrollIndex >= 0 ? (
    <View
      className=""
      style={{
        width: calendatItemWidth * 7,
        height: horizontalItemHeight,
        flex: 1,
      }}
    >
      <FlashList
        ref={flashListRef}
        scrollEventThrottle={16}
        data={periodData}
        onEndReached={onNext}
        onEndReachedThreshold={0.9}
        onViewableItemsChanged={onViewableItemsChanged}
        horizontal={true}
        onScrollEndDrag={onScrollBegin}
        // onScrollBeginDrag={onScrollBegin}
        estimatedItemSize={calendatItemWidth}
        keyExtractor={keyExtractor}
        initialScrollIndex={initialScrollIndex}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={calendatItemWidth * 7}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  ) : (
    <View
      style={{
        width: calendatItemWidth * 7,
        height: horizontalItemHeight,
      }}
    />
  );
};

export default HorizontalPeriodCalendarV2;
