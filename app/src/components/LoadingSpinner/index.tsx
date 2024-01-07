import { useRef, useEffect } from "react";
import { Animated, Easing, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

interface Props {
  title?: string;
}

const LoadingSpinner: React.FC<Props> = ({ title }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinReverseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    const spinReverseAnimation = Animated.loop(
      Animated.timing(spinReverseValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();
    spinReverseAnimation.start();

    return () => {
      spinAnimation.stop();
      spinReverseAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinReverse = spinReverseValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  return (
    <View className="flex-1 flex items-center justify-center">
      <View className="relative w-20 aspect-square rounded-full flex items-center justify-center ">
        <Animated.View
          className="absolute left-0 top-0 right-0 bottom-0"
          style={{ transform: [{ rotate: spin }] }}
        >
          <FastImage
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector_FCnyW1k8A.png?updatedAt=1684739567110",
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View
          className="w-3/5 h-3/5"
          style={{ transform: [{ rotate: spinReverse }] }}
        >
          <FastImage
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector__1__VgfKcPlMp.png?updatedAt=1684739567112",
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <Text
        className="text-base text-center text-white pt-5"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {title ? title : "Saving"}
      </Text>
    </View>
  );
};

export default LoadingSpinner;
