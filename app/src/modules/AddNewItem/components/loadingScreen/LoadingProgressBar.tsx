import CirclePercent from "@components/CirclePercent";
import clsx from "clsx";

import { View, Text } from "react-native";

interface Props {
  valueCircleAnimation: number;
  valuePercent: number;
  animationDuration: number;
  title?: string;
  activeColor?: string;
  inActiveColor?: string;
  strokeWidth?: number;
  circleSize?: number;
  textStyle?: string;
  textStyleFont?: string;
  showInactive?: boolean;
  showTitle?: boolean;
  padding?: string;
  border?: string;
}

const LoadingProgressBar: React.FC<Props> = ({
  valueCircleAnimation,
  valuePercent,
  animationDuration,
  title,
  activeColor,
  inActiveColor,
  strokeWidth,
  circleSize,
  textStyle,
  textStyleFont,
  showInactive = true,
  showTitle = true,
  padding,
}) => {
  return (
    <View
      className={clsx(
        "flex-1 bg-[#232136]  rounded-full",
        padding ? padding : "p-4"
      )}
    >
      <View className="flex-1 flex justify-center items-center">
        <CirclePercent
          circleSize={circleSize ? circleSize : 100}
          percent={valueCircleAnimation}
          showInactive={showInactive}
          strokeWidth={strokeWidth ? strokeWidth : 8}
          activeColor={activeColor ? activeColor : "#8F74FF"}
          inActiveColor={inActiveColor ? inActiveColor : "#8F74FF33"}
          animationDuration={animationDuration}
        >
          <View>
            <Text
              className={clsx(" text-base")}
              style={{
                fontFamily: "Poppins-Medium",
                color: activeColor ? activeColor : "#8F74FF",
              }}
            >
              {valuePercent}%
            </Text>
          </View>
        </CirclePercent>
        {showTitle ? (
          <View className="mt-4">
            <Text
              className={clsx(textStyle ? textStyle : "text-[#8F74FF] text-xl")}
              style={{
                fontFamily: textStyleFont ? textStyleFont : "Nunito-Bold",
              }}
            >
              {title ? title : "Loading..."}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default LoadingProgressBar;
