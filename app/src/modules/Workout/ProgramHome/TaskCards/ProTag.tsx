import SvgIcons from "@components/SvgIcons";
import { View, Text } from "react-native";

const ProTag = () => {
  return (
    <View
      className="absolute top-2 right-2 flex flex-row justify-center items-center bg-[#FF556C] rounded-full px-2 py-0.5 z-50"
      style={{ elevation: 50 }}
    >
      <View className="w-2 iphoneX:w-3 aspect-square mr-1">
        <SvgIcons iconType="pro" />
      </View>
      <Text
        className="text-white font-bold text-[10px] iphoneX:text-xs"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Pro
      </Text>
    </View>
  );
};

export default ProTag;
