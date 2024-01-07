import { View } from "react-native";
import { getDemoCalander } from "./utils";
import { FlashList } from "@shopify/flash-list";
import {
  calendatItemWidth,
  horizontalItemHeight,
} from "@modules/Nutrition/V2/DaySelector/V3/HorizontalDayComponentV2";
import { CalendarDate } from "@providers/period/periodStore";
import { periodDateType } from "@models/User/User";
import clsx from "clsx";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { Text } from "react-native";
import CycleIndicator from "@modules/PeriodTrackerMain/CycleIndicator";

const demoPeriodData: CalendarDate[] = getDemoCalander();

const DemoPeriodTrackerCalender: React.FC<{}> = () => {
  const { today, todayUnix } = useAuthContext();

  const renderItem = ({
    item,
    index,
  }: {
    item: CalendarDate;
    index: number;
  }) => {
    const isToday = today === item.currentDate;
    const isFuture = item.unix > todayUnix;

    const type: periodDateType =
      index === 0
        ? "PERIOD"
        : index === 1 || index === 2
        ? "ESTIMATED_PERIOD"
        : index === 5
        ? "OVULATION"
        : "LUTEAL";

    return (
      <View
        className="flex justify-start "
        style={{ width: calendatItemWidth, height: horizontalItemHeight }}
      >
        <View
          className={clsx(
            isToday ? "bg-[#343150]" : "",
            "py-2 pb-4",
            "flex justify-between items-center rounded-xl"
          )}
          style={{ width: calendatItemWidth }}
        >
          <View className="">
            <Text
              className="text-white/80 text-xs font-medium"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {item.day}
            </Text>
          </View>
          <View className="">
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {item.visibleDate}
            </Text>
          </View>
          <View className="flex pb-1 justify-center items-center">
            <CycleIndicator
              future={isFuture}
              type={type}
              symptom={false}
              radius={calendatItemWidth / 3}
            />
          </View>

          {isToday ? (
            <View className="">
              <View className="w-4 h-1 mt-2  bg-red-400 rounded-full" />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const keyExtractor = (item: CalendarDate) => item.currentDate;

  return (
    <View
      style={{
        width: calendatItemWidth * 7,
        height: horizontalItemHeight,
        flex: 1,
      }}
    >
      <FlashList
        data={demoPeriodData}
        horizontal={true}
        estimatedItemSize={calendatItemWidth}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

export default DemoPeriodTrackerCalender;
