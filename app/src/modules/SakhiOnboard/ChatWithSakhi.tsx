import { View, Text } from "react-native";

import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import ArrowCountIcon from "@components/ArrowCountIcon";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

interface FloatingProps {
  showScrollDown: boolean;
  goBack?: boolean;
}

const ChatWithSakhi: React.FC<FloatingProps> = ({ showScrollDown, goBack }) => {
  const navigation = useNavigation();

  const onChat = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.navigate("StartNewChat");
    }
  };
  return (
    <LinearGradient
      colors={["#9558E800", "#9558E8C8", "#9558E8"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      locations={[0, 0.4236, 0.7027]}
      className="absolute bottom-0 left-0 right-0 pb-6 "
    >
      <View
        className="flex flex-row py-5 justify-center items-center"
        style={{ opacity: showScrollDown ? 0 : 1 }}
      >
        <View className="w-2.5 aspect-square">
          <ArrowCountIcon
            color1="#fff"
            color2="#fff"
            color3="#fff"
            direction="bottom"
          />
        </View>
        <Text className="text-white/70 font-sans text-xs text-center mx-2 mb-0.5">
          Scroll Down
        </Text>
        <View className="w-2.5 aspect-square">
          <ArrowCountIcon
            color1="#fff"
            color2="#fff"
            color3="#fff"
            direction="bottom"
          />
        </View>
      </View>
      <StartButton
        title="Start a chat with Sakhi"
        bgColor="bg-[#fff] mx-4"
        textColor="text-[#6D55D1] "
        roundedStr="rounded-xl"
        onPress={onChat}
        textStyle="py-4  text-center text-base "
        fontFamily="Nunito-Bold" //   onPress={onWA}
      />
    </LinearGradient>
  );
};

export default ChatWithSakhi;
