import SvgIcons, { iconTypes } from "@components/SvgIcons";
import clsx from "clsx";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  contentColor?: string;
  bgColor?: string;
  icon?: iconTypes;
  text?: string;
  onPress?: () => void;
}

const IconTextBtn: React.FC<Props> = ({
  contentColor,
  bgColor,
  text,
  icon,
  onPress,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const contentColorLocal = contentColor ? contentColor : "#FFFFFF";
  const bgColorLocal = bgColor ? bgColor : "#000000";

  const handlePress = () => {
    setIsClicked(true);
    onPress && onPress();
  };

  return icon || text ? (
    <TouchableOpacity onPress={handlePress}>
      <View
        className="flex flex-row items-center rounded-xl px-4 py-2"
        style={{
          backgroundColor: isClicked ? contentColorLocal : bgColorLocal,
          borderColor: contentColorLocal,
          borderWidth: 1,
        }}
      >
        <View className="w-4 iphoneX:w-5 h-4 iphoneX:h-5">
          <SvgIcons
            iconType={icon}
            color={isClicked ? bgColorLocal : contentColorLocal}
          />
        </View>
        <Text
          style={{
            color: isClicked ? bgColorLocal : contentColorLocal,
            // fontFamily: "BaiJamjuree-Bold",
          }}
          className={clsx(
            "flex-1 text-sm text-center iphoneX:text-lg",
            icon && "ml-3 iphoneX:ml-4"
          )}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default IconTextBtn;
