import { View, Text, Pressable } from "react-native";
import { DateData } from "react-native-calendars";
import clsx from "clsx";
import SvgIcons from "@components/SvgIcons";
import { periodDateType } from "@models/User/User";
import React from "react";

interface Props {
  date: DateData;
  itemWidth: number;
  color?: string;
  periodType: periodDateType;

  onPressDay?: () => void;
  isEditMode?: boolean;
}
export const getColorCode = (value: periodDateType) => {
  if (value === "PERIOD") {
    return "#fff";
  } else if (value === "ESTIMATED_PERIOD") {
    return "#ff6069";
  } else {
    return "#343150";
  }
};

const CustomPeriodDay: React.FC<Props> = React.memo(
  ({
    date,
    itemWidth,
    color,

    periodType,
    onPressDay,
    isEditMode,
  }) => {
    return isEditMode ? (
      <Pressable
        onPress={onPressDay}
        className={clsx("flex justify-center items-center rounded-xl py-2")}
        style={{ width: itemWidth }}
      >
        <Text
          className={clsx(
            " text-xs pb-1",
            periodType === "PERIOD" ? "text-red-400" : "text-white"
          )}
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {date.day}
        </Text>
        <View
          className={clsx(
            "aspect-square rounded-full flex justify-center items-center ",
            periodType === "PERIOD"
              ? "bg-red-400"
              : periodType === "ESTIMATED_PERIOD"
              ? "border border-red-400 border-dashed"
              : "bg-[#343150]"
          )}
          style={{ height: itemWidth * 0.5 }}
        >
          <View className="w-full p-1">
            <SvgIcons
              iconType="tickCheck"
              color={periodType === "UNKNOWN" ? "transparent" : color}
            />
          </View>
        </View>
      </Pressable>
    ) : (
      <View
        className={clsx("flex justify-center items-center rounded-xl py-2")}
        style={{ width: itemWidth }}
      >
        <View
          className={clsx(
            "aspect-square rounded-full flex justify-center items-center ",
            periodType === "PERIOD"
              ? "bg-red-400"
              : periodType === "ESTIMATED_PERIOD"
              ? "border border-red-400 border-dashed"
              : "bg-[#343150]"
          )}
          style={{ height: itemWidth * 0.5 }}
        >
          <Text
            className={clsx(
              " text-xs ",
              periodType === "ESTIMATED_PERIOD" ? "text-red-400" : "text-white"
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {date.day}
          </Text>
        </View>
      </View>
    );
  }
);

export default CustomPeriodDay;
