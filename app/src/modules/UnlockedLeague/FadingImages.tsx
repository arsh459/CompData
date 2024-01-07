import React, { useEffect } from "react";
import { View, Image } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SpreadColorBall from "@components/SpreadColorBall";
interface Props {
  color1?: string;
  color2?: string;
  imageUrl?: string;
}
const FadingImages: React.FC<Props> = ({ color1, color2, imageUrl }) => {
  const uri = imageUrl ? imageUrl : undefined;
  const fadeValue = useSharedValue(0);

  const fadeInImages = () => {
    fadeValue.value = withTiming(1, {
      duration: 5_000,
      easing: Easing.linear,
    });
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
    };
  });

  useEffect(() => {
    fadeInImages();
  }, []);
  return (
    <View className=" w-full aspect-square  justify-center items-center relative  z-0">
      <Animated.View style={[containerStyle]} className={"w-3/5 aspect-square"}>
        {uri ? <Image source={{ uri: uri }} style={{ flex: 1 }} /> : null}
      </Animated.View>
      <Animated.View
        style={[containerStyle]}
        className={"absolute bottom-0 top-0 left-0 right-0  "}
      >
        <SpreadColorBall
          color1={color1 ? color1 : "#E9C55B"}
          color2={color2 ? color2 : "#E9C55B"}
          opacity1={0.55}
          opacity2={fadeValue.value}
        />
      </Animated.View>
    </View>
  );
};

export default FadingImages;
