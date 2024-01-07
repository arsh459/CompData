import { Animated, Easing, View } from "react-native";
import {
  BlurMask,
  Canvas,
  Circle,
  CircleProps,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import SocialBoatSVG from "@components/SocialBoat/SocialBoatSVG";

interface Props {
  size?: number;
  hideLogo?: boolean;
  color?: string;
  logoColor?: string;
}

const LoadingV2: React.FC<Props> = ({ size, hideLogo, color, logoColor }) => {
  const remoteSize = size || 200;
  const strokeWidth = remoteSize * 0.02;
  const padding = strokeWidth * 2;
  const center = remoteSize / 2;
  const radius = center - padding;

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const circleProps: CircleProps = {
    cx: center,
    cy: center,
    r: radius,
    color: color,
    style: "stroke",
    strokeWidth: strokeWidth,
    strokeCap: "round",
    strokeJoin: "round",
  };

  return (
    <View className="relative z-0">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Canvas style={{ width: remoteSize, aspectRatio: 1 }}>
          <Circle {...circleProps}>
            <SweepGradient
              c={vec(128, 128)}
              colors={[color || "#C5FF49", "transparent"]}
            />
            <BlurMask blur={strokeWidth} style="normal" />
          </Circle>
          <Circle {...circleProps}>
            <SweepGradient
              c={vec(128, 128)}
              colors={[color || "#C5FF49", "transparent"]}
            />
          </Circle>
        </Canvas>
      </Animated.View>
      {hideLogo ? null : (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center"
          style={{ margin: padding }}
        >
          <View style={{ width: "50%", aspectRatio: 1 }}>
            <SocialBoatSVG color={logoColor || "#FFFFFF"} />
          </View>
        </View>
      )}
    </View>
  );
};

export default LoadingV2;
