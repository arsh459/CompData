import { View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useCircleValue, useCircleValueAnimated } from "./hook/useCircleValue";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  showActive?: boolean;
  children?: React.ReactNode;
  animationDuration?: number;
}

const CirclePercent: React.FC<Props> = ({
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
  showActive = true,
  animationDuration,
}) => {
  const { animatedProps, radius, strokeDasharray, paddingLocal } =
    animationDuration
      ? useCircleValueAnimated({
          percent,
          circleSize,
          circleRatio,
          strokeWidth,
          padding,
          noAnimation,
          animationDuration,
        })
      : useCircleValue({
          percent,
          circleSize,
          circleRatio,
          strokeWidth,
          padding,
          noAnimation,
        });

  return (
    <View
      style={{ width: circleSize, height: circleSize }}
      className="relative z-0 justify-center items-center"
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
        {showInactive ? (
          <Circle
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={circleSize / 2}
            cy={circleSize / 2}
            stroke={inActiveColor ? inActiveColor : "#DFDFDF"}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
          />
        ) : null}
        {showActive ? (
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
          />
        ) : (
          <></>
        )}
      </Svg>
      {children ? (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 justify-center items-center z-10"
          style={{ padding: paddingLocal }}
        >
          {children}
        </View>
      ) : null}
    </View>
  );
};

export default CirclePercent;
