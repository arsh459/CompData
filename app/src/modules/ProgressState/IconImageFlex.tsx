import { View, Text } from "react-native";
import SvgIcons, { iconTypes } from "@components/SvgIcons";
import clsx from "clsx";
interface Props {
  iconType?: iconTypes;
  iconColor?: string;
  text?: string;
  textColor?: string;
}
const IconImageFlex: React.FC<Props> = ({
  iconType,
  iconColor,
  text,
  textColor,
}) => {
  return (
    <View className={clsx("flex-row items-center  ")}>
      <View className="w-4 h-4">
        <SvgIcons iconType={iconType} color={iconColor} />
      </View>
      <Text
        className="text-xs pl-1.5 "
        style={{
          color: textColor ? textColor : "#fff",
          fontFamily: "BaiJamjuree-Bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default IconImageFlex;
