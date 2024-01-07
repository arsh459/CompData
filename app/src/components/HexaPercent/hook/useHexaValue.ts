import { useEffect, useMemo, useRef, useState } from "react";
import {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

const animateDur = 2000;

interface Props {
  percent: number;
  noAnimation?: boolean;
}

export const useHexaValue = ({ percent, noAnimation }: Props) => {
  const pathRef = useRef<Path>(null);
  const [pathLength, setPathLength] = useState<number>(0);
  const [rendered, setRendered] = useState(false);

  const onLayout = () => {
    if (pathRef.current) {
      const value = pathRef.current?.getTotalLength()
        ? (pathRef.current.getTotalLength() as number)
        : 0;
      setPathLength(value);
      setRendered(true);
    }
  };

  const remotePercent = useMemo(
    () => 1 - (percent > 1 ? 1 : percent < 0 ? 0 : percent),
    [percent]
  );

  const animatedValue = useSharedValue(1);

  const animatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset:
        pathLength * (noAnimation ? remotePercent : animatedValue.value),
    }),
    [pathLength]
  );

  useEffect(() => {
    if (rendered) {
      animatedValue.value = withTiming(remotePercent, {
        duration: animateDur * remotePercent,
        easing: Easing.linear,
      });
    }
  }, [animatedValue, remotePercent, rendered]);

  return {
    animatedProps,
    pathLength,
    pathRef,
    onLayout,
    rendered,
  };
};
