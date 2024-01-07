import ArrowCountIcon from "@components/ArrowCountIcon";
import { View, Text } from "react-native";

const SwipeDown = () => {
  return (
    <View className="flex justify-center items-center">
      <Text
        className="text-white/70 text-xs iphoneX:text-sm text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Swipe Down
      </Text>
      <View className="w-4 iphoneX:w-5 aspect-square mt-1 iphoneX:mt-2">
        <ArrowCountIcon
          direction="bottom"
          color1="#FFFFFF"
          color2="#FFFFFF"
          color3="#FFFFFF"
          opacity={0.7}
        />
      </View>
    </View>
  );
};

export default SwipeDown;
