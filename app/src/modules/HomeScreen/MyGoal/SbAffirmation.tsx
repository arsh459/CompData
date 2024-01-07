import { View, Text } from "react-native";

import SvgIcons from "@components/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
interface Props {
  textString1: string;
  textString2?: string;
}
const SbAffirmation: React.FC<Props> = ({ textString1, textString2 }) => {
  return (
    <LinearGradient
      colors={["#7D7BDC", "#4781C3", "#47B4C3"]}
      start={[0, 1]}
      end={[1, 0]}
      className="  flex-1 flex flex-row my-2 items-center mx-4 rounded-[9px]"
    >
      <View className="w-1/6 aspect-square p-1">
        <SvgIcons iconType="sbwave" />
      </View>
      <View className="pl-2 flex-1">
        <Text
          className="  text-[#FFFFFF] text-sm iphoneX:text-base"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {textString1}
        </Text>
        <Text
          className="  text-[#FFFFFF] text-[10px] iphoneX:text-xs"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {textString2}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default SbAffirmation;
