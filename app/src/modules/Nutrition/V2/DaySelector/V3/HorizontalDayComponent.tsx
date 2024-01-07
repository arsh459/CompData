import { periodDateType } from "@models/User/User";
import { useAuthContext } from "@providers/auth/AuthProvider";

import clsx from "clsx";
import { format } from "date-fns";
import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { View, Dimensions, Text } from "react-native";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";

const { width } = Dimensions.get("window");
export const calendatItemWidth = width / 8;
export const horizontalItemHeight = calendatItemWidth * 2.1;

const HorizontalDayComponent: React.FC<
  DayProps & {
    date?: DateData | undefined;
  }
> = ({ date, marking, onPress }) => {
  // const isPeriod = marking?.textColor === "red";
  const stateOfCal = marking?.color as periodDateType;
  const isSelected = marking?.selected;

  const isPeriod = stateOfCal === "PERIOD";

  // const today = format(dateToday, "yyyy-MM-dd");

  const { today } = useAuthContext();

  const isToday = today === date?.dateString;
  const isSymptomExist = false;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={() => onPress(date)}
        className={clsx(
          "flex  justify-between items-center rounded-xl py-2",
          isSelected ? "bg-[#343150]" : ""
        )}
        style={{ width: calendatItemWidth }}
      >
        <View className="flex-1 ">
          <Text
            className="text-white/80 text-xs font-medium"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {date?.dateString ? format(date?.timestamp, "eee") : ""}
          </Text>
        </View>
        <View className="flex-1 ">
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {date?.day}
          </Text>
        </View>
        <View className="flex-grow  pt-2 flex items-center">
          <View className="flex flex-row justify-center">
            {isPeriod ? (
              <View
                className={clsx(
                  "w-4 aspect-square  rounded-full",
                  isPeriod ? "bg-red-400 " : ""
                )}
              />
            ) : null}
            {isSymptomExist ? (
              <View
                className={clsx(
                  "w-4 aspect-square   rounded-full ",
                  "bg-[#3ACFFF]",
                  isPeriod && "ml-1"
                )}
              />
            ) : null}
          </View>
          {isToday ? (
            <View className="w-4 h-1 mt-2  bg-red-400 rounded-full" />
          ) : null}
        </View>

        {/* <View className="w-1.5 aspect-square" /> */}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{ width: calendatItemWidth, height: horizontalItemHeight }}
      />
    );
  }
};

export default memo(HorizontalDayComponent, (prev, now) => {
  return (
    prev.marking?.selected === now.marking?.selected &&
    prev.marking?.color === now.marking?.color
    // prev.marking?.textColor === now.marking?.textColor
  );
});
