import { View, Text, Animated, Easing } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { useEffect } from "react";

import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import { shallow } from "zustand/shallow";

interface Props {
  text?: string;
  textColor?: string;
}

const BotTypingV2: React.FC<Props> = ({ text, textColor }) => {
  const scaleVal1 = new Animated.Value(0);
  const scaleVal2 = new Animated.Value(0);
  const scaleVal3 = new Animated.Value(0);
  const { sakhiState } = useSakhiAIStore(
    (state) => ({
      sakhiState: state.sakhiState,
    }),
    shallow
  );
  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleVal1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 0,
      })
    ).start();
    Animated.loop(
      Animated.timing(scaleVal2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 400,
      })
    ).start();
    Animated.loop(
      Animated.timing(scaleVal3, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 800,
      })
    ).start();
  }, [sakhiState]);

  const scale = [scaleVal1, scaleVal2, scaleVal3].map((each) =>
    each.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.2, 1],
    })
  );
  return (
    <>
      {sakhiState === "FETCHING" || sakhiState === "ANALYZING" ? (
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
            {text ? text : "Sakhi is analyzing"}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default BotTypingV2;
