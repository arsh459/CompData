import { useEffect, useMemo } from "react";
import {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const animateDur = 2000;
interface Props {
  percent: number;
  circleSize: number;
  circleRatio?: number;
  strokeWidth?: number;
  padding?: number;
  noAnimation?: boolean;
  animationDuration?: number;
}

export const useCircleValue = ({
  percent,
  circleSize,
  circleRatio,
  strokeWidth,
  padding,
  noAnimation,
}: Props) => {
  const circleRatioLocal = useMemo(
    () =>
      circleRatio && circleRatio >= 0 && circleRatio <= 1 ? circleRatio : 1,
    [circleRatio]
  );
  const strokeWidthLocal = useMemo(
    () => (strokeWidth ? strokeWidth : 1),
    [strokeWidth]
  );
  const paddingLocal = useMemo(
    () => strokeWidthLocal + (padding ? padding : 1),
    [strokeWidthLocal, padding]
  );
  const radius = useMemo(
    () => circleSize / 2 - strokeWidthLocal / 2,
    [strokeWidthLocal, circleSize]
  );
  const circumference = useMemo(
    () => 2 * Math.PI * radius * circleRatioLocal,
    [strokeWidthLocal, radius]
  );
  const strokeDasharray = useMemo(
    () => `${circumference} ${360 * (1 - circleRatioLocal) + circumference}`,
    [circleRatioLocal, circumference]
  );
  const remotePercent = useMemo(
    () => (percent > 1 ? 1 : percent < 0 ? 0 : percent),
    [percent]
  );

  const animatedValue = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference * (1 - (noAnimation ? remotePercent : animatedValue.value)),
  }));

  useEffect(() => {
    animatedValue.value = withTiming(remotePercent, {
      duration: animateDur * remotePercent,
      easing: Easing.linear,
    });
  }, [animatedValue, remotePercent]);

  return {
    animatedProps,
    radius,
    strokeDasharray,
    paddingLocal,
  };
};

export const useCircleValueAnimated = ({
  percent,
  circleSize,
  circleRatio,
  strokeWidth,
  padding,
  noAnimation,
  animationDuration,
}: Props) => {
  const circleRatioLocal = useMemo(
    () =>
      circleRatio && circleRatio >= 0 && circleRatio <= 1 ? circleRatio : 1,
    [circleRatio]
  );
  const strokeWidthLocal = useMemo(
    () => (strokeWidth ? strokeWidth : 1),
    [strokeWidth]
  );
  const paddingLocal = useMemo(
    () => strokeWidthLocal + (padding ? padding : 1),
    [strokeWidthLocal, padding]
  );
  const radius = useMemo(
    () => circleSize / 2 - strokeWidthLocal / 2,
    [strokeWidthLocal, circleSize]
  );
  const circumference = useMemo(
    () => 2 * Math.PI * radius * circleRatioLocal,
    [strokeWidthLocal, radius]
  );
  const strokeDasharray = useMemo(
    () => `${circumference} ${360 * (1 - circleRatioLocal) + circumference}`,
    [circleRatioLocal, circumference]
  );
  const remotePercent = useMemo(
    () => (percent > 1 ? 1 : percent < 0 ? 0 : percent),
    [percent]
  );

  const animatedValue = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference * (1 - (noAnimation ? remotePercent : animatedValue.value)),
  }));

  useEffect(() => {
    animatedValue.value = withTiming(remotePercent, {
      duration: (animationDuration ? animationDuration : 7000) * remotePercent,
      easing: Easing.linear,
    });
  }, [animatedValue, remotePercent]);

  return {
    animatedProps,
    radius,
    strokeDasharray,
    paddingLocal,
  };
};
