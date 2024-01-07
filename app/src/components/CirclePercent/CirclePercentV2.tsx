import { View } from "react-native";
// import Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
// import { useCircleValue } from "./hook/useCircleValue";

interface Props {
  percent: number;
  circleSize: number;
  strokeWidth?: number;
  padding?: number;
  showInactive?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  startAngle?: number;
  circleRatio?: number;
  noAnimation?: boolean;
  children?: React.ReactNode;
}

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CirclePercentV2: React.FC<Props> = ({
  circleSize,
  percent,
  strokeWidth,
  padding,
  showInactive,
  activeColor,
  inActiveColor,
  startAngle,
  circleRatio,
  noAnimation,
  children,
}) => {
  //   const { animatedProps, radius, strokeDasharray, paddingLocal } =
  //     useCircleValue({
  //       percent,
  //       circleSize,
  //       circleRatio,
  //       strokeWidth,
  //       padding,
  //       noAnimation,
  //     });

  return (
    <View
      style={{ width: circleSize, height: circleSize }}
      className="relative z-0"
    >
      <Svg
        fill="none"
        className="w-full h-full"
        style={{
          transform: [
            {
              rotate: `${
                startAngle && startAngle >= 0 && startAngle <= 360
                  ? startAngle - 90
                  : -90
              }deg`,
            },
          ],
        }}
      >
        {strokeWidth ? (
          <Circle
            strokeWidth={strokeWidth}
            fill="transparent"
            r={circleSize / 2 - strokeWidth / 2}
            cx={circleSize / 2}
            cy={circleSize / 2}
            stroke={inActiveColor ? inActiveColor : "#DFDFDF"}
            strokeLinecap="round"
            // strokeDasharray={strokeDasharray}
          />
        ) : null}
        {/* {showInactive && strokeWidth ? (
          <Circle
            strokeWidth={strokeWidth}
            fill="transparent"
            r={circleSize / 2 - strokeWidth / 2}
            cx={circleSize / 2}
            cy={circleSize / 2}
            stroke={inActiveColor ? inActiveColor : "#DFDFDF"}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
          />
        ) : null}
        <AnimatedCircle
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={circleSize / 2}
          cy={circleSize / 2}
          stroke={activeColor ? activeColor : "#FFFFFF"}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          animatedProps={animatedProps}
        /> */}
      </Svg>
      {children ? (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 z-10"
          //   style={{ padding: paddingLocal }}
        >
          {children}
        </View>
      ) : null}
    </View>
  );
};

export default CirclePercentV2;
