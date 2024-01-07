import { dayArr } from "@modules/PeriodCalenderLogMain/DayHeader";
import PeriodMonthComponent from "@modules/PeriodCalenderLogMain/PeriodMonthComponent";
import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  CalendarMonth,
  useCurrentPeriodStore,
} from "@providers/period/periodStore";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  ColorValue,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getMonthEditScrollIndex } from "@providers/period/funcs/utils";

export const calendarHeight = Dimensions.get("window").width;

interface Props {
  beforeLastPeriod?: boolean;
  highlightedColor: ColorValue;
}

const OnboardPeriodCalender: React.FC<Props> = ({
  beforeLastPeriod,
  highlightedColor,
}) => {
  const fRef = useRef<FlatList>(null);
  const { todayUnix } = useAuthContext();
  const [fetching, setFetching] = useState<"fetching" | "scroll" | "none">(
    "fetching"
  );

  const {
    months,
    onMonthInit,
    onEndReached,
    prepopulateDates,
    lastMarkedPeriodDate,
    onExtendMonths,
  } = useCurrentPeriodStore(
    (state) => ({
      months: state.editMonths,
      onMonthInit: state.onMonthEditView,
      prepopulateDates: state.prepolulatePeriodDates,
      onEndReached: state.onPreviousMonth,
      onExtendMonths: state.onExtendMonths,
      lastMarkedPeriodDate: state.lastMarkedPeriodDate,
    }),
    shallow
  );

  const { uid } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
    };
  }, shallow);

  useEffect(() => {
    const init = async () => {
      uid && onMonthInit(uid, todayUnix);
      await prepopulateDates();
      setFetching("scroll");

      return () => {
        setFetching("fetching");
      };
    };
    init();
  }, [uid, todayUnix]);

  useEffect(() => {
    if (fetching === "scroll" && fRef.current) {
      const targetIndex = getMonthEditScrollIndex(
        lastMarkedPeriodDate,
        beforeLastPeriod
      );

      if (months.length - 1 >= targetIndex) {
        setTimeout(() => {
          fRef.current &&
            fRef.current.scrollToIndex({
              animated: true,
              index: targetIndex,
              viewPosition: 0,
            });
          setFetching("none");
        }, 200);
      } else {
        const currLength = months.length;
        const neededLength = targetIndex + 1;
        const extension = neededLength - currLength;

        onExtendMonths(extension);
      }

      return () => {
        setFetching("fetching");
      };
    }
  }, [
    fetching,
    lastMarkedPeriodDate,
    fRef.current,
    beforeLastPeriod,
    months.length,
  ]);

  const renderItem = (item: ListRenderItemInfo<CalendarMonth>) => {
    return (
      <PeriodMonthComponent
        {...item}
        isEditable={true}
        calendarHeight={calendarHeight}
        markedColor={highlightedColor}
      />
    );
  };

  const keyExtractor = (item: CalendarMonth) =>
    `$OnboardPeriodClaender-${beforeLastPeriod ? "before_last" : "last"}-${
      item.currentDate
    }`;

  const getItemLayout = (
    _: ArrayLike<CalendarMonth> | null | undefined,
    index: number
  ) => {
    return {
      length: calendarHeight,
      offset: calendarHeight * index,
      index,
    };
  };

  return (
    <View className="flex-1 relative z-0">
      <View className="flex flex-row justify-around px-3 py-4 relative z-0">
        <LinearGradient
          colors={
            beforeLastPeriod ? ["#D660FF", "#6792FF"] : ["#FF6069", "#FF67A7"]
          }
          start={[0, 0.5]}
          end={[1, 0.5]}
          className="absolute left-4 right-4 top-2 bottom-2 -z-10 rounded-lg"
        />
        {dayArr.map((item) => (
          <Text
            key={item}
            className="text-white text-xs"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item}
          </Text>
        ))}
      </View>

      <FlatList
        ref={fRef}
        data={months}
        // onLayout={onLayout}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        getItemLayout={getItemLayout}
        onEndReachedThreshold={0.9}
        keyExtractor={keyExtractor}
        inverted={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={<View className="h-16" />}
      />
    </View>
  );
};

export default OnboardPeriodCalender;
