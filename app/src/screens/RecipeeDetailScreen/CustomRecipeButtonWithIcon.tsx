import {
  View,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import clsx from "clsx";
import SvgIcons, { iconTypes } from "@components/SvgIcons";

interface Props {
  bgColor?: string;
  textColor?: string;
  title?: string;
  textStyle?: string;
  onPress?: () => void;
  roundedStr?: string;
  iconUrl?: string;
  iconStyle?: string;
  fontFamily?: string;
  layoutStyle?: StyleProp<ViewStyle>;
  textInlineStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isIconSvg?: boolean;
  iconType?: iconTypes;
}
const CustomRecipeButtonWithIcon: React.FC<Props> = ({
  bgColor,
  textColor,
  title,
  onPress,
  textStyle,
  roundedStr,
  iconUrl,
  iconStyle,
  fontFamily,
  layoutStyle,
  textInlineStyle,
  disabled,
  isIconSvg,
  iconType,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={clsx(
          "flex flex-row items-center",
          roundedStr ? roundedStr : "rounded-lg",
          bgColor
        )}
        style={layoutStyle ? layoutStyle : {}}
      >
        {isIconSvg ? (
          <View
            className="w-3 aspect-square"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View className="items-center">
              <SvgIcons iconType={iconType} />
            </View>
          </View>
        ) : (
          <></>
        )}

        <View className={`${isIconSvg ? "ml-2" : ""}`}>
          <Text
            className={clsx(textColor ? textColor : "", textStyle)}
            style={{ fontFamily: fontFamily ? fontFamily : "BaiJamjuree-Bold" }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRecipeButtonWithIcon;
