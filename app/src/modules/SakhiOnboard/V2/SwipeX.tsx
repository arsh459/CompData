import ArrowCountIcon from "@components/ArrowCountIcon";
import { View, Text } from "react-native";

const SwipeX = () => {
  return (
    <View className="w-full flex flex-row justify-between items-center px-5 iphoneX:px-8">
      <View className="w-4 iphoneX:w-5 aspect-square">
        <ArrowCountIcon
          direction="left"
          color1="#FFFFFF"
          color2="#FFFFFF"
          color3="#FFFFFF"
          opacity={0.7}
        />
      </View>
      <Text
        className="text-white/70 text-xs iphoneX:text-sm text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Swipe left of right to interact
      </Text>
      <View className="w-4 iphoneX:w-5 aspect-square">
        <ArrowCountIcon
          direction="right"
          color1="#FFFFFF"
          color2="#FFFFFF"
          color3="#FFFFFF"
          opacity={0.7}
        />
      </View>
    </View>
  );
};

export default SwipeX;
