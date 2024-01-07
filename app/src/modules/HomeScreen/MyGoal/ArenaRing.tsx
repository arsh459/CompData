import { View, Text } from "react-native";

import CirclePercent from "@components/CirclePercent";
interface Props {
  middleText?: string;
  bottomText?: string;
  percent: number;
}
const ArenaRing: React.FC<Props> = ({ middleText, bottomText, percent }) => {
  return (
    <View className="flex items-center">
      <CirclePercent
        circleSize={80}
        percent={percent}
        activeColor={"#A5DAFF"}
        strokeWidth={8}
        padding={2}
        inActiveColor="#010A15"
        showInactive={true}
      >
        <View className="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
          <Text
            style={{ fontFamily: "BaiJamjuree-Semibold" }}
            className="text-white text-xs"
          >
            {middleText}
          </Text>
        </View>
      </CirclePercent>
      <Text
        className="text-[#A5DAFF] text-[11px] iphoneX:text-[13px] py-2"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {bottomText}
      </Text>
    </View>
  );
};

export default ArenaRing;
