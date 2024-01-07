import clsx from "clsx";
import { useState } from "react";
import { Text, Pressable } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop, G } from "react-native-svg";

interface Props {
  text: string;
  onPress?: () => void;
  fontsStyle?: string;
  showWave?: boolean;
  gradient?: boolean;
  gradientDirection?: "left" | "right" | "bottom" | "top";
  color1?: string;
  color2?: string;
}

const WaveBtn: React.FC<Props> = ({
  text,
  onPress,
  fontsStyle,
  showWave,
  gradient,
  gradientDirection,
  color1,
  color2,
}) => {
  const [boxDimensions, setBoxDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const gradientCords =
    gradientDirection === "bottom"
      ? { x1: 106, x2: 106, y1: 60, y2: 0 }
      : gradientDirection === "left"
      ? { x1: 211, x2: 0, y1: 30, y2: 30 }
      : gradientDirection === "top"
      ? { x1: 106, x2: 106, y1: 0, y2: 60 }
      : { x1: 0, x2: 211, y1: 30, y2: 30 };

  const gradientColors = gradient
    ? {
        startColor: color1 ? color1 : color2 ? color2 : "#ff735c",
        endColor: color2 ? color2 : color1 ? color1 : "#ff735c",
      }
    : {
        startColor: color1 ? color1 : color2 ? color2 : "#ff735c",
        endColor: color1 ? color1 : color2 ? color2 : "#ff735c",
      };

  return (
    <Pressable
      onPress={onPress}
      className="w-max h-max relative z-0 flex flex-row justify-center items-center overflow-hidden"
      onLayout={(e) =>
        setBoxDimensions({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })
      }
    >
      <Svg
        className="absolute left-0 top-0 -z-10"
        width={boxDimensions.width}
        height={boxDimensions.height}
        viewBox="0 0 211 60"
        fill="none"
      >
        <Rect
          x={9}
          y={6}
          width={193}
          height={47.476}
          rx={23.738}
          fill="url(#prefix_paint_linear_gradient)"
        />
        <G opacity={showWave ? 1 : 0}>
          <Rect
            x={6.5}
            y={4.5}
            width={198}
            height={51}
            rx={25.5}
            stroke="url(#prefix_paint_linear_gradient)"
          />
          <Rect
            x={3.25}
            y={2.25}
            width={204.5}
            height={55.5}
            rx={27.75}
            stroke="url(#prefix_paint_linear_gradient)"
            strokeWidth={0.5}
          />
          <Rect
            x={0.1}
            y={0.1}
            width={210.8}
            height={59.8}
            rx={29.9}
            stroke="url(#prefix_paint_linear_gradient)"
            strokeWidth={0.2}
          />
        </G>
        <Defs>
          <LinearGradient
            id="prefix_paint_linear_gradient"
            x1={gradientCords.x1}
            y1={gradientCords.y1}
            x2={gradientCords.x2}
            y2={gradientCords.y2}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={gradientColors.startColor} />
            <Stop offset={1} stopColor={gradientColors.endColor} />
          </LinearGradient>
        </Defs>
      </Svg>
      <Text
        className={clsx(
          fontsStyle ? fontsStyle : "text-xl text-white px-4 py-4"
        )}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default WaveBtn;
