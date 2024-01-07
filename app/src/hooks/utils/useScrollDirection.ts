import { Animated } from "react-native";

export const useScrollDirection = (height: number) => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, height);
  const translateY = diffClamp.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
  });

  return {
    scrollY,
    translateY,
  };
};
