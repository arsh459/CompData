import { View, Text, useWindowDimensions } from "react-native";

import clsx from "clsx";
import HexaPercent from "@components/HexaPercent";
interface Props {
  middleText?: string;
  percent: number;
  isToday?: boolean;
  inActiveColor?: string;
  isCalender?: boolean;
  isFuture?: boolean;
  calenderStyleTw?: string;
  currentDate?: number;
}

const DayCircleV2: React.FC<Props> = ({
  middleText,
  percent,
  isToday,
  inActiveColor,
  isCalender,
  calenderStyleTw,
  currentDate,
  isFuture,
}) => {
  const { width: Width } = useWindowDimensions();

  return (
    <View
      className={clsx(
        " relative py-0.5 iphoneX:py-2 flex items-center",
        calenderStyleTw
      )}
    >
      <View
        className={clsx(isToday && "bg-[#836BE9] px-2 rounded-full", "mb-4")}
      >
        <Text
          className={clsx("text-white text-xs ")}
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {middleText}
        </Text>
      </View>
      {isFuture ? (
        <View
          className="flex justify-center items-center"
          style={{ width: Width / 10.5, height: Width / 10.5 }}
        >
          <View className="flex items-center justify-center absolute  inset-0">
            <Text
              className={clsx("text-white text-xs")}
              style={{ fontFamily: "Nunito-Medium" }}
            >
              {currentDate}
            </Text>
          </View>
        </View>
      ) : (
        <HexaPercent
          height={Width / 10.5}
          width={Width / 10.5}
          percent={percent / 100}
          activeColor={"#fff"} // strokeWidth={4}
          // padding={2}

          inActiveColor={inActiveColor ? inActiveColor : "#00000033"}
          // showInactive={true}
        >
          <View className="flex items-center justify-center absolute  inset-0">
            <Text
              className={clsx("text-white text-xs")}
              style={{ fontFamily: "Nunito-Medium" }}
            >
              {currentDate}
            </Text>
          </View>
        </HexaPercent>
      )}
      {/* {isToday ? (
        <View
          className={clsx(
            "mt-1 h-1 rounded-md w-5 bg-[#FF3B80]"
          
          )}
        >
       
        </View>
      ) : null} */}
    </View>
  );
};

export default DayCircleV2;
