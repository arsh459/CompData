import SvgIcons from "@components/SvgIcons";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { memo } from "react";
import { ColorValue, Pressable } from "react-native";
import { View, Dimensions, Text } from "react-native";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";

const { width } = Dimensions.get("window");
const itemWidth = width / 8;

const PeriodDayComponentV2: React.FC<
  DayProps & {
    date?: DateData | undefined;
    markedColor?: ColorValue;
  }
> = ({ date, markedColor }) => {
  const onPress = useCurrentPeriodStore((state) => state.logPeriod);
  const isPeriod = useCurrentPeriodStore((state) => {
    if (date?.dateString) {
      const dateType = state.selectedState[date?.dateString];
      return dateType === "PERIOD";
    }

    return undefined;
  });

  const isFuture = date?.timestamp && date?.timestamp > Date.now();

  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          onPress(date?.dateString ? date.dateString : "");
          weEventTrack("calendar_logPeriod", {});
        }}
        className="flex justify-center items-center rounded-xl py-2"
        style={{ width: itemWidth }}
      >
        <Text
          className="text-xs pb-1"
          style={{
            fontFamily: "Nunito-Regular",
            color: isPeriod ? markedColor || "#FF6069" : "#FFFFFF",
          }}
        >
          {date?.day}
        </Text>
        <View
          className="aspect-square rounded-full flex justify-center items-center"
          style={{
            height: itemWidth * 0.5,
            backgroundColor: isFuture
              ? undefined
              : isPeriod
              ? markedColor || "#FF6069"
              : "#343150",
          }}
        >
          {isPeriod ? (
            <View className="w-full p-1">
              <SvgIcons iconType="tickCheck" color={"#fff"} />
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  } else {
    return <View style={{ width: itemWidth, height: itemWidth }} />;
  }
};
//@Krishanu
export default memo(PeriodDayComponentV2, (prev, now) => {
  return prev.date?.dateString === now.date?.dateString;
});
