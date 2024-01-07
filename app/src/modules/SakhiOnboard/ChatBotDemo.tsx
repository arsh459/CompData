import ImageWithURL from "@components/ImageWithURL";
import { useEffect, useState } from "react";
import { chatAiIcon } from "@constants/imageKitURL";
import BotTyping from "../ChatBot/ChatRoomMain/BotTyping";
import { Animated, Easing, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";

const dur = 1200;

interface Props {
  init: boolean;
  userText: string;
  assistantText: string;
}

const ChatBotDemo: React.FC<Props> = ({ init, userText, assistantText }) => {
  const [typing, setTyping] = useState<number>(0);
  const [ansHeight, setAnsHeight] = useState<number>(1000);
  const translateYVal = new Animated.Value(0);

  const translateY = translateYVal.interpolate({
    inputRange: [0, 1],
    outputRange: [ansHeight, 0],
  });

  useEffect(() => {
    if (init) {
      setTyping(1);
      setTimeout(() => {
        setTyping(2);
      }, 1000);
    }
  }, [init]);

  useEffect(() => {
    if (typing === 2) {
      Animated.timing(translateYVal, {
        toValue: 1,
        duration: dur / 2,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [typing]);

  return (
    <View className="w-80 rounded-3xl overflow-hidden mx-auto relative z-0">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Group_1628_9u27hX1gt.png?updatedAt=1681542649081",
        }}
        className="absolute left-0 right-0 top-0 bottom-0 -z-10"
        resizeMode="cover"
      />
      <GradientText
        colors={["#7B2BFF", "#4F80FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        text={userText}
        txtTlStyle="text-[#7B2BFF] text-xl font-bold mx-6 my-8"
      />
      {typing === 1 ? (
        <View className="relative z-0">
          <View className="absolute left-0 right-0">
            <BotTyping textColor="#8A79F2" />
          </View>
        </View>
      ) : null}
      <Animated.View
        style={{ transform: [{ translateY }] }}
        onLayout={(e) => setAnsHeight(e.nativeEvent.layout.height)}
      >
        <LinearGradient
          colors={["#DBC6FE", "#C6CFFE"]}
          className="w-full px-6 py-8 rounded-3xl overflow-hidden"
        >
          <View className="flex flex-row pb-4">
            <ImageWithURL
              source={{ uri: chatAiIcon }}
              className="w-8 aspect-[1.5]"
              resizeMode="contain"
            />
            <Text
              className="text-[#5F46CA] text-xs px-2"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Sakhi
            </Text>
          </View>
          <Text className="text-sm text-[#232136]">{assistantText}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default ChatBotDemo;
