import { View, useWindowDimensions } from "react-native";

import TextAlert from "../TextAlert";
import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";

const EndRunning = () => {
  const { width } = useWindowDimensions();

  return (
    <TextAlert>
      <View className="flex     justify-center items-center flex-1 pb-8">
        <GradientText
          text="Run"
          textStyle={{
            fontFamily: "BaiJamjuree-Medium",
            fontWeight: "700",
            color: "white",
            fontSize: width > iPhoneX ? 66 : 56,
            fontStyle: "italic",
          }}
          colors={["#1DA0FF", "#2560FF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          fallbackColor="white"
        />
        <GradientText
          text="Ended"
          textStyle={{
            fontFamily: "BaiJamjuree-Medium",
            fontWeight: "700",
            color: "white",
            fontSize: width > iPhoneX ? 66 : 56,
            fontStyle: "italic",
          }}
          colors={["#1DA0FF", "#2560FF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          fallbackColor="white"
        />
      </View>
      <View className="h-12" />
    </TextAlert>
  );
};

export default EndRunning;
