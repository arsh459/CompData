import { treasureGlow } from "@constants/imageKitURL";
import Header from "@modules/Header";
import { useEffect } from "react";
import { View, Image } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const TreasureBoxAnimation = () => {
  // Shared value for the vertical translation animation
  const translateY = useSharedValue(0);

  // Helper function to create a random delay for dots
  const getRandomDelay = () => Math.random() * 1000;

  // Create an array of dots with their animations
  const randomDots = Array(4)
    .fill(null)
    .map(() => {
      const translateYDot = useSharedValue(0);
      const scaleValue = useSharedValue(1);

      return {
        translateYDot,
        scaleValue,
        delay: getRandomDelay(),
      };
    });

  // Main treasure box animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Dot animated styles
  const animatedStyleDots = (index: number) =>
    useAnimatedStyle(() => ({
      transform: [
        { translateY: randomDots[index].translateYDot.value + 10 },
        { scale: randomDots[index].scaleValue.value },
      ],
    }));

  useEffect(() => {
    // Animation for the main treasure box and dots
    translateY.value = withDelay(
      2000,
      withRepeat(
        withSequence(
          withTiming(-100, { duration: 1000, easing: Easing.inOut(Easing.exp) })
        ),
        -1,
        true
      )
    );

    // Randomize the animation for each dot
    randomDots.forEach((dot, index) => {
      dot.translateYDot.value = withDelay(
        2000 + dot.delay,
        withRepeat(
          withSpring(-50 - Math.random() * 50, { damping: 2, stiffness: 80 }),
          -1,
          true
        )
      );

      dot.scaleValue.value = withDelay(
        2000 + dot.delay,
        withRepeat(
          withSpring(1.2 + Math.random() * 0.5, { damping: 2, stiffness: 80 }),
          -1,
          true
        )
      );
    });
  }, [translateY, randomDots]);

  return (
    <>
      <Header back={true} tone="dark" headerColor="#232136" />
      <View className="flex-1 bg-[#232136] justify-center items-center ">
        <Animated.View style={[animatedStyle]}>
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group%201000001191%201_FHwRsX22K.png?updatedAt=1694971443382",
            }}
            className="w-1/2 aspect-[189/106]"
          />
        </Animated.View>
        <View className="flex flex-row  w-1/2 justify-between px-4  ">
          {randomDots.map((_, index) => (
            <Animated.View
              key={index}
              className="w-4 aspect-square rounded-full bg-[#F6CA44]"
              style={[animatedStyleDots(index)]}
            />
          ))}
        </View>
        <View className="relative z-0">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Frame%201909_EC4MSxqYq.png?updatedAt=1694971443229",
            }}
            className="w-1/2 aspect-[189/106]"
          />
          <View className="absolute left-0 right-0  bottom-full aspect-[235/44]">
            <Image
              source={{
                uri: treasureGlow,
              }}
              className="w-full aspect-[235/44]"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default TreasureBoxAnimation;
