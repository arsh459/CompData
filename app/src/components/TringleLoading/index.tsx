import { memo, useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const BOX_RATIO = 70 / 65;
const animationTime = 3000;
const inputRange = [0, 0.5, 0.75, 1.25, 1.5, 2, 2.25];
const animateConfig = {
  toValue: inputRange[inputRange.length - 1],
  duration: animationTime,
  easing: Easing.linear,
  useNativeDriver: true,
};

interface Props {
  boxWidth: number;
}

const TringleLoading: React.FC<Props> = ({ boxWidth }) => {
  const first = { top: 0, left: boxWidth / 4 };
  const third = { top: boxWidth / BOX_RATIO / 2, left: 0 };
  const second = { top: boxWidth / BOX_RATIO / 2, left: boxWidth / 2 };

  const firstTopVal = useRef(new Animated.Value(inputRange[0])).current;
  const firstLeftVal = useRef(new Animated.Value(inputRange[0])).current;

  const secondTopVal = useRef(new Animated.Value(inputRange[0])).current;
  const secondLeftVal = useRef(new Animated.Value(inputRange[0])).current;

  const thirdTopVal = useRef(new Animated.Value(inputRange[0])).current;
  const thirdLeftVal = useRef(new Animated.Value(inputRange[0])).current;

  const firstTop = firstTopVal.interpolate({
    inputRange,
    outputRange: [
      first.top,
      second.top,
      second.top,
      third.top,
      third.top,
      first.top,
      first.top,
    ],
  });
  const firstLeft = firstLeftVal.interpolate({
    inputRange,
    outputRange: [
      first.left,
      second.left,
      second.left,
      third.left,
      third.left,
      first.left,
      first.left,
    ],
  });

  const secondTop = secondTopVal.interpolate({
    inputRange,
    outputRange: [
      second.top,
      third.top,
      third.top,
      first.top,
      first.top,
      second.top,
      second.top,
    ],
  });
  const secondLeft = secondLeftVal.interpolate({
    inputRange,
    outputRange: [
      second.left,
      third.left,
      third.left,
      first.left,
      first.left,
      second.left,
      second.left,
    ],
  });

  const thirdTop = thirdTopVal.interpolate({
    inputRange,
    outputRange: [
      third.top,
      first.top,
      first.top,
      second.top,
      second.top,
      third.top,
      third.top,
    ],
  });
  const thirdLeft = thirdLeftVal.interpolate({
    inputRange,
    outputRange: [
      third.left,
      first.left,
      first.left,
      second.left,
      second.left,
      third.left,
      third.left,
    ],
  });

  useEffect(() => {
    Animated.loop(Animated.timing(firstTopVal, animateConfig)).start();
    Animated.loop(Animated.timing(firstLeftVal, animateConfig)).start();
    Animated.loop(Animated.timing(secondTopVal, animateConfig)).start();
    Animated.loop(Animated.timing(secondLeftVal, animateConfig)).start();
    Animated.loop(Animated.timing(thirdTopVal, animateConfig)).start();
    Animated.loop(Animated.timing(thirdLeftVal, animateConfig)).start();
  }, [boxWidth]);

  return (
    <View
      style={{ width: boxWidth, aspectRatio: BOX_RATIO }}
      className="relative z-0"
    >
      <Animated.View
        style={{
          width: boxWidth / 2,
          transform: [{ translateY: firstTop }, { translateX: firstLeft }],
        }}
        className="absolute left-0 top-0 aspect-square p-0.5"
      >
        <View className="w-full h-full bg-[#FF6069] rounded-full" />
      </Animated.View>
      <Animated.View
        style={{
          width: boxWidth / 2,
          transform: [{ translateY: secondTop }, { translateX: secondLeft }],
        }}
        className="absolute left-0 top-0 aspect-square p-0.5"
      >
        <View className="w-full h-full bg-[#3ACFFF] rounded-full" />
      </Animated.View>
      <Animated.View
        style={{
          width: boxWidth / 2,
          transform: [{ translateY: thirdTop }, { translateX: thirdLeft }],
        }}
        className="absolute left-0 top-0 aspect-square p-0.5"
      >
        <View className="w-full h-full bg-[#3AFFB8] rounded-full" />
      </Animated.View>
    </View>
  );
};

export default memo(TringleLoading, (prev, now) => {
  return prev.boxWidth === now.boxWidth;
});
