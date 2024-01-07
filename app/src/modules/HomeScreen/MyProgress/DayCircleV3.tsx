import { View, Text, useWindowDimensions } from "react-native";

import clsx from "clsx";
import HexaPercent from "@components/HexaPercent";
interface Props {
  middleText?: string;
  percent: number;
  isToday?: boolean;
  inActiveColor?: string;
  isCalender?: boolean;
  calenderStyleTw?: string;
  currentDate?: number;
  isFuture?: boolean;
  isSelected: boolean;
}

const DayCircleV3: React.FC<Props> = ({
  middleText,
  percent,
  isToday,
  isFuture,
  inActiveColor,
  isCalender,
  calenderStyleTw,
  currentDate,
  isSelected,
}) => {
  const { width: Width } = useWindowDimensions();

  return (
    <View
      style={{ width: Width / 8, height: Width / 8 }}
      className={clsx(
        "flex relative justify-center items-center ",
        // " relative py-0.5 iphoneX:py-2 flex items-center border border-white",
        calenderStyleTw
      )}
    >
      {isFuture ? (
        <View
          style={{ width: Width / 10.5, height: Width / 10.5 }}
          className="flex items-center justify-center w-full h-full"
          // className="flex items-center justify-center absolute  inset-0"
        >
          <Text
            className={clsx("text-gray-500 text-xs", isToday && "text-base ")}
          >
            {middleText}
          </Text>
        </View>
      ) : percent <= 0 ? (
        <View
          style={{ width: Width / 10.5, height: Width / 10.5 }}
          className="flex items-center justify-center w-full h-full"
          // className="flex items-center justify-center absolute  inset-0"
        >
          <Text className={clsx("text-white text-xs", isToday && "text-base ")}>
            {middleText}
          </Text>
        </View>
      ) : (
        <HexaPercent
          width={isSelected ? Width / 8 : Width / 10.5}
          height={isSelected ? Width / 8 : Width / 10.5}
          percent={percent}
          activeColor={"#fff"}
          // strokeWidth={4}
          // padding={2}

          noAnimation={true}
          inActiveColor={inActiveColor ? inActiveColor : "#00000033"}
          // showInactive={true}
        >
          <View className="flex items-center justify-center absolute  inset-0">
            <Text className={clsx("text-white text-xs")}>{middleText}</Text>
          </View>
        </HexaPercent>
      )}
      {isToday ? (
        <View className={clsx("h-1 rounded-md w-5 bg-[#4BD7CB]")}></View>
      ) : null}
    </View>
  );
};

export default DayCircleV3;
