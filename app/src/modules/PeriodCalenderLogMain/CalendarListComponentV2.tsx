import { Platform, View, FlatList, ListRenderItem } from "react-native";
// import { ListRenderItemInfo } from "@shopify/flash-list";
// import { FlashList } from "@shopify/flash-list";
import PeriodMonthComponent, {
  monthElementHeight,
} from "./PeriodMonthComponent";
import SaveElement from "./SaveElement";
import {
  CalendarMonth,
  useCurrentPeriodStore,
} from "@providers/period/periodStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";
import BottomSheetView, { collapsedHeight } from "./BottomSheetView";
import { shallow } from "zustand/shallow";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import Loading from "@components/loading/Loading";

interface Props {
  isEditable?: boolean;
}

const CalendarListComponentV2: React.FC<Props> = ({ isEditable }) => {
  const renderItem: ListRenderItem<CalendarMonth> = (item) => {
    return <PeriodMonthComponent {...item} isEditable={isEditable} />;
  };

  const {
    months,
    onMonthInit,
    onEndReached,
    prepopulateDates,
    onNextWeekData,
  } = useCurrentPeriodStore(
    (state) => ({
      months: isEditable ? state.editMonths : state.months,
      onMonthInit: isEditable ? state.onMonthEditView : state.onMonthView,
      onNextWeekData: state.onNextWeekData,
      prepopulateDates: state.prepolulatePeriodDates,
      onEndReached: isEditable ? state.onPreviousMonth : state.onNextMonth,
    }),
    shallow
  );

  const initialMonthScrollIndex = useCurrentPeriodStore(
    (state) => state.initialMonthScrollIndex
  );
  // const fRef = useRef<FlashList<CalendarMonth>>(null);
  const fRef = useRef<FlatList>(null);

  const { todayUnix, state } = useAuthContext();

  useEffect(() => {
    state.uid && onMonthInit(state.uid, todayUnix);

    if (isEditable) {
      // add init dates
      prepopulateDates();
    }
  }, [state.uid, todayUnix, isEditable]);

  const [ready, setReady] = useState<boolean>(false);
  const onLayout = () => {
    setReady(true);
    if (isEditable) {
      setTimeout(() => {
        fRef.current?.scrollToIndex({
          animated: true,
          index: 1,
          viewPosition: 0,
        });
      }, 500);
    } else if (initialMonthScrollIndex !== -1)
      setTimeout(() => {
        fRef.current?.scrollToIndex({
          animated: true,
          index: initialMonthScrollIndex,
          viewPosition: 0,
        });
      }, 500);
  };

  const keyExtractor = (item: CalendarMonth) =>
    `${isEditable}-${item.currentDate}`;

  const onEndReachedFinal = useCallback(() => {
    if (isEditable) {
      onEndReached();
    } else {
      onEndReached();
      onNextWeekData();
    }
  }, [isEditable]);

  const getItemLayout = (
    _: ArrayLike<CalendarMonth> | null | undefined,
    index: number
  ) => {
    return {
      length: monthElementHeight,
      offset: monthElementHeight * index,
      index,
    };
  };

  const { interactionStatus } = useInteractionContext();

  return (
    <View className="flex-1 relative z-0">
      {!ready && Platform.OS === "android" ? (
        <View className="p-10 flex justify-center items-center">
          <Loading width="w-10" />
        </View>
      ) : null}

      {(Platform.OS === "android" && interactionStatus) ||
      Platform.OS === "ios" ? (
        <FlatList
          ref={fRef}
          data={months}
          onLayout={onLayout}
          scrollEventThrottle={16}
          onEndReached={onEndReachedFinal}
          getItemLayout={getItemLayout}
          onEndReachedThreshold={0.9}
          // estimatedItemSize={monthElementHeight}
          keyExtractor={keyExtractor}
          inverted={isEditable}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            <View style={{ height: isEditable ? 0 : collapsedHeight }} />
          }
        />
      ) : null}

      {/* <FlashList
          ref={fRef}
          data={months}
          onLayout={onLayout}
          scrollEventThrottle={16}
          onEndReached={onEndReachedFinal}
          onEndReachedThreshold={0.9}
          estimatedItemSize={monthElementHeight}
          keyExtractor={keyExtractor}
          inverted={isEditable}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            <View style={{ height: isEditable ? 0 : collapsedHeight }} />
          }
        /> */}

      {isEditable ? <SaveElement /> : <BottomSheetView />}
    </View>
  );
};

export default CalendarListComponentV2;
