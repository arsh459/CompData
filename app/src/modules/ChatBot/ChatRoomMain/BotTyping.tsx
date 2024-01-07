import { View, Text, Animated, Easing } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { useEffect } from "react";

interface Props {
  text?: string;
  textColor?: string;
}

const BotTyping: React.FC<Props> = ({ text, textColor }) => {
  const scaleVal1 = new Animated.Value(0);
  const scaleVal2 = new Animated.Value(0);
  const scaleVal3 = new Animated.Value(0);

  useEffect(() => {
    let delay = 0;
    [scaleVal1, scaleVal2, scaleVal3].forEach((each) => {
      Animated.loop(
        Animated.timing(each, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
          delay,
        })
      ).start();
      delay = delay + 200;
    });
  }, []);

  const scale = [scaleVal1, scaleVal2, scaleVal3].map((each) =>
    each.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.2, 1],
    })
  );

  return (
    <View className="flex flex-row justify-center items-center p-4">
      <ImageWithURL
        source={{ uri: chatAiIcon }}
        className="w-8 aspect-[1.5]"
        resizeMode="contain"
      />
      <Text
        className="text-xs px-2"
        style={{
          fontFamily: "Nunito-Bold",
          color: textColor ? textColor : "#FFFFFF",
        }}
      >
        {text ? text : "Sakhi is typing"}
      </Text>
      <View className="flex flex-row">
        <Animated.View
          style={{ transform: [{ scale: scale[0] }] }}
          className="w-3 aspect-square bg-[#59FFE8] rounded-full"
        />
        <Animated.View
          style={{ transform: [{ scale: scale[1] }] }}
          className="w-3 aspect-square bg-[#59FFE8] rounded-full"
        />
        <Animated.View
          style={{ transform: [{ scale: scale[2] }] }}
          className="w-3 aspect-square bg-[#59FFE8] rounded-full"
        />
      </View>
    </View>
  );
};

export default BotTyping;
