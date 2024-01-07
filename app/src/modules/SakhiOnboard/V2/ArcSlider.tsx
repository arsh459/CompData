import {
  BlurMask,
  Canvas,
  Circle,
  Path,
  Skia,
  SweepGradient,
  // useSharedValueEffect,
  useValue,
  vec,
  // interpolate,
  // useValueEffect,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const SweepGradientColors = [
  "#00B65E",
  "#00B2FF",
  "#6850FC",
  "#FF4D78",
  "#00B65E",
  "#00B2FF",
  "#6850FC",
];

interface Props {
  currIndex: number;
  breckPoint: number;
  thumbColor: string;
}

export const ArcSlider: React.FC<Props> = ({
  currIndex,
  breckPoint,
  thumbColor,
}) => {
  const breckPointRemote = 12;
  const thumpEndPaddingY = 15;
  const paddingXArc = 40;
  const strokeWidth = 8;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - paddingXArc;
  const startAngle = 2 * Math.PI;
  const endAngle = Math.PI;
  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;
  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);
  const angleDiff = (startAngle - endAngle) / (breckPointRemote - 1);

  const input: number[] = [];
  const outputX: number[] = [];
  const outputY: number[] = [];
  for (let index = 0; index < breckPointRemote; index++) {
    const bufferY =
      index === 0 || index === breckPointRemote - 1 ? thumpEndPaddingY : 0;
    input.push(index);
    const x = center - r * Math.cos(startAngle - angleDiff * index);
    outputX.push(x);
    const y = -r * Math.sin(startAngle - angleDiff * index) + center + bufferY;
    outputY.push(y);
  }

  const movableCx = useSharedValue(0);
  const movableCy = useSharedValue(thumpEndPaddingY);

  const skiaCx = useValue(0);
  const skiaCy = useValue(thumpEndPaddingY);

  useEffect(() => {
    const target = ((breckPointRemote - 1) * currIndex) / (breckPoint - 1);
    const options = {
      duration: 200,
      easing: Easing.linear,
    };
    movableCx.value = withTiming(target, options);
    movableCy.value = withTiming(target, options);
  }, [currIndex]);

  // useSharedValueEffect(
  //   () => {
  //     skiaCx.current = interpolate(movableCx.value, input, outputX);
  //     skiaCy.current = interpolate(movableCy.value, input, outputY);
  //   },
  //   movableCx,
  //   movableCy
  // );

  // useValueEffect()

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  return (
    <View
      className="w-full aspect-[2/1] flex justify-end overflow-hidden"
      style={{ marginBottom: -(paddingXArc / 2) }}
    >
      <Canvas style={{ width, aspectRatio: 1 }}>
        <Path path={skiaBackgroundPath} style="fill" color="#FFFFFF" />
        <Path
          path={skiaBackgroundPath}
          style="stroke"
          strokeWidth={strokeWidth}
        >
          <SweepGradient c={vec(center, center)} colors={SweepGradientColors} />
        </Path>
        <Circle cx={skiaCx} cy={skiaCy} r={15} color={thumbColor} style="fill">
          <BlurMask blur={10} style="normal" />
        </Circle>
        <Circle
          cx={skiaCx}
          cy={skiaCy}
          r={15}
          color={thumbColor}
          style="fill"
        />
        <Circle cx={skiaCx} cy={skiaCy} r={10} color="white" style="fill" />
      </Canvas>
    </View>
  );
};
