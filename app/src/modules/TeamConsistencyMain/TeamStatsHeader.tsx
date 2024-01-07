import { View, Text, Image, StyleProp, ViewStyle } from "react-native";

import { teamConsistencyGrid } from "@constants/imageKitURL";
import SvgIcons, { iconTypes } from "@components/SvgIcons";
import GradientText from "@components/GradientText";
interface Props {
  iconType?: iconTypes;
  iconColor?: string;
  iconRightText?: string;
  text?: string;
  gradientTextColor1?: string;
  gradientTextColor2?: string;
  iconStyle?: StyleProp<ViewStyle>;
  gridImg?: string;
  headerHeight?: number;
}
const TeamStatsHeader: React.FC<Props> = ({
  gradientTextColor1,
  gradientTextColor2,
  iconColor,
  iconRightText,
  iconType,
  text,
  iconStyle,
  gridImg,
  headerHeight,
}) => {
  return (
    <View className="bg-[#100F1A] relative" style={{ marginTop: headerHeight }}>
      <Image
        source={{ uri: gridImg ? gridImg : teamConsistencyGrid }}
        className="w-full"
        style={{ aspectRatio: 375 / 243 }}
      />
      <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        <View className="flex flex-row items-center justify-center">
          <View className="w-6  aspect-square " style={iconStyle}>
            <SvgIcons
              iconType={iconType ? iconType : undefined}
              color={iconColor ? iconColor : undefined}
            />
          </View>
          <GradientText
            colors={
              gradientTextColor1 && gradientTextColor2
                ? [gradientTextColor1, gradientTextColor2]
                : ["#74FCC3", "#53D7FE"]
            }
            text={iconRightText ? iconRightText : ""}
            textStyle={{
              fontFamily: "BaiJamjuree-Bold",
              textAlign: "center",
              fontSize: 36,
              paddingLeft: 15,
            }}
          />
        </View>
        <Text
          className="text-white text-center text-lg px-6"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default TeamStatsHeader;
