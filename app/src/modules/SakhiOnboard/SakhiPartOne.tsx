import { View, Text, useWindowDimensions } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { encryptedHelp, meetSakhiBg } from "@constants/imageKitURL";
import GradientText from "@components/GradientText";

const SakhiPartOne = () => {
  const { height } = useWindowDimensions();
  return (
    <View className="pt-8" style={{ height }}>
      <ImageWithURL
        source={{ uri: meetSakhiBg }}
        className="w-full aspect-[375/360]"
        resizeMode="contain"
      />
      <View className="flex items-center pt-1 ">
        <View className="flex flex-row">
          <GradientText
            text={"Meet"}
            colors={["#fff", "#fff"]}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            textStyle={{
              lineHeight: 30,
              fontSize: 24,
              textAlign: "left",
              fontWeight: "400",
              paddingLeft: 12,
            }}
          />
          <GradientText
            text={"Sakhi,"}
            colors={["#73FFE6", "#2BD9FF", "#2BBFFF"]}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            textStyle={{
              lineHeight: 30,
              fontSize: 24,
              textAlign: "left",
              fontWeight: "700",
              paddingLeft: 12,
            }}
          />
          <GradientText
            text={"your Health"}
            colors={["#fff", "#fff"]}
            end={{ x: 0, y: 1 }}
            start={{ x: 1, y: 0 }}
            textStyle={{
              lineHeight: 30,
              fontSize: 24,
              textAlign: "left",
              fontWeight: "400",
              paddingLeft: 12,
            }}
          />
        </View>

        <Text className="text-[#FCD94B] text-2xl">
          <Text className="text-white">and</Text> Menstrual Friend 💛
        </Text>
      </View>
      <View className="flex flex-row items-center px-4 justify-center pt-5">
        <ImageWithURL source={{ uri: encryptedHelp }} className="w-2.5 h-3" />
        <Text
          className="text-white/70  text-xs pl-1"
          style={{
            fontFamily: "Nunito-Regular",
          }}
        >
          Private and Encrypted chats
        </Text>
      </View>
    </View>
  );
};

export default SakhiPartOne;
