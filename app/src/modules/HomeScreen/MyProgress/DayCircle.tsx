import { View, Text, useWindowDimensions } from "react-native";

import CirclePercent from "@components/CirclePercent";
import clsx from "clsx";
interface Props {
  middleText?: string;
  percent: number;
  isToday?: boolean;
  inActiveColor?: string;
  isCalender?: boolean;
  calenderStyleTw?: string;
}

const DayCircle: React.FC<Props> = ({
  middleText,
  percent,
  isToday,
  inActiveColor,
  isCalender,
  calenderStyleTw,
}) => {
  const { width: Width } = useWindowDimensions();
  return (
    <View
      className={clsx(
        " relative py-0.5 iphoneX:py-2 flex items-center",
        calenderStyleTw
      )}
    >
      <CirclePercent
        circleSize={Width / 10.5}
        percent={percent / 100}
        activeColor={"#FF3B80"}
        strokeWidth={4}
        padding={2}
        inActiveColor={inActiveColor ? inActiveColor : "#010A15"}
        showInactive={true}
      >
        <View className="flex items-center justify-center absolute  left-0 right-0 top-0 bottom-0">
          <Text
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            className={clsx("text-white text-xs")}
          >
            {middleText}
          </Text>
        </View>
      </CirclePercent>
      {isToday ? (
        <View
          className={clsx(
            "mt-1 h-1 rounded-md w-5 bg-[#FF3B80]"
            // "absolute w-5  ",
            // isCalender ? "h-1   -bottom-[10%]" : "h-5   -bottom-[40%]"
          )}
        >
          {/* <View className="bg-[#FF3B80] flex-1 rounded-sm" /> */}
        </View>
      ) : null}
    </View>
  );
};

export default DayCircle;
