import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import SocialBoatSVG from "./SocialBoatSVG";

interface Props {
  iconColor?: string;
  iconClass?: string;
  textColor?: string;
  textClass?: string;
  gradientColors?: string[];
}

const SocialBoat: React.FC<Props> = ({
  iconColor,
  iconClass,
  textColor,
  textClass,
  gradientColors,
}) => {
  return (
    <View className="flex flex-row justify-center items-center">
      <LinearGradient
        colors={
          gradientColors && gradientColors.length === 2
            ? gradientColors
            : ["transparent", "transparent"]
        }
        className={clsx(
          iconClass ? iconClass : "w-7 h-7", // "w-5 iphoneX:w-7 h-5 iphoneX:h-7",
          "mr-2"
        )}
      >
        <SocialBoatSVG color={iconColor} />
      </LinearGradient>
      <Text
        className={clsx(textClass ? textClass : "text-2xl")}
        style={{ color: textColor, fontFamily: "BaiJamjuree-Bold" }}
      >
        SocialBoat
      </Text>
    </View>
  );
};

export default SocialBoat;
