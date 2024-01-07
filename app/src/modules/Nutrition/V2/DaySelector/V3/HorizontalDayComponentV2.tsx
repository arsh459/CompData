// import { PeriodDateObj } from "@models/User/User";
// import { periodDateType } from "@models/User/User";
import { PeriodDateObj } from "@models/User/User";
import CycleIndicator from "@modules/PeriodTrackerMain/CycleIndicator";
import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  CalendarDate,
  useCurrentPeriodStore,
} from "@providers/period/periodStore";
import { ListRenderItemInfo } from "@shopify/flash-list";
// import { shallow } from "zustand/shallow";

import clsx from "clsx";
// import { format } from "date-fns";
import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { View, Dimensions, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { shallow } from "zustand/shallow";

const { width } = Dimensions.get("window");
export const calendatItemWidth = Math.round(width / 7);
export const horizontalItemHeight = calendatItemWidth * 2.1;

const HorizontalDayComponentV2: React.FC<ListRenderItemInfo<CalendarDate>> = ({
  // item,
  item,
}) => {
  // const date = item.date;
  const date = item.currentDate;
  const unix = item.unix;

  const { today, todayUnix } = useAuthContext();

  const isFuture = unix > todayUnix;

  // const { stateOfCal } = useCurrentPeriodStore((state) => {
  //   // date
  //   const periodDateObj = state.periodDateObjStore[date];

  //   const symptomList = periodDateObj?.loggedSymptoms
  //     ? Object.keys(periodDateObj?.loggedSymptoms)
  //     : [];

  //   if (periodDateObj) {
  //     return {
  //       stateOfCal: periodDateObj.type,
  //       symptomsPresent: symptomList.length ? true : false,
  //       // datesLoading: state.datesLoading,
  //     };
  //   } else {
  //     return {
  //       stateOfCal: "UNKNOWN" as periodDateType,
  //       symptomsPresent: false,
  //       // datesLoading: state.datesLoading,
  //     };
  //   }
  // }, shallow);

  const currentPeriodDate = useCurrentPeriodStore(
    (state) => state.periodDateObjStore[date] as PeriodDateObj | undefined,
    shallow
  );

  const stateOfCal = currentPeriodDate?.type;

  const symptomsPresent =
    currentPeriodDate?.loggedSymptoms &&
    Object.keys(currentPeriodDate.loggedSymptoms).length
      ? true
      : false;

  // to capture marking
  const markedObj = useCurrentPeriodStore((state) => {
    return state.markedDates[date];
  }, shallow);
  const onPress = useCurrentPeriodStore(
    (state) => state.toggleSelectedDate,
    shallow
  );

  const isSelected = markedObj?.selected; // currentlySelected === date; // marking?.selected;

  const isToday = today === date;

  return (
    <View
      className="flex justify-start "
      style={{ width: calendatItemWidth, height: horizontalItemHeight }}
    >
      <TouchableOpacity
        className={clsx(
          isSelected ? "bg-[#343150]" : "",
          "py-2 pb-4",
          "flex justify-between items-center rounded-xl"
        )}
        onPress={() => onPress(item.currentDate)}
        style={{ width: calendatItemWidth }}
      >
        <View className="">
          <Text
            className="text-white/80 text-xs font-medium"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item.day}
            {/* {date ? format(new Date(item.date), "eee") : ""} */}
          </Text>
        </View>
        <View className="">
          <Text
            className="text-white  iphoneX:text-lg pb-1 iphoneX:pb-0"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item.visibleDate}
            {/* {parseInt(item.date.split("-")[2])} */}
          </Text>
        </View>
        {!stateOfCal ? (
          <SkeletonPlaceholder
            // backgroundColor="#FFFFFF33"
            backgroundColor="#FFFFFF33"
            highlightColor="#00000033"
            speed={800}
            borderRadius={calendatItemWidth / 3}
          >
            <View
              style={{
                width: calendatItemWidth / 3,
                height: calendatItemWidth / 3,
              }}
              className="rounded-full"
            />
          </SkeletonPlaceholder>
        ) : stateOfCal === "UNKNOWN" ? null : stateOfCal ? (
          <View className="flex pb-1 justify-center items-center">
            <CycleIndicator
              future={isFuture}
              type={stateOfCal}
              symptom={symptomsPresent}
              radius={calendatItemWidth / 3}
            />
          </View>
        ) : null}

        {isToday ? (
          <View className="">
            <View className="w-4 h-1 mt-2  bg-red-400 rounded-full" />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

// export default HorizontalDayComponentV2;

export default memo(HorizontalDayComponentV2, (prev, now) => {
  return (
    prev.item.currentDate === now.item.currentDate // && prev.item.date === now.item.date
    // prev.marking?.textColor === now.marking?.textColor
  );
});
