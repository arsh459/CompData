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
import ImageWithURL from "@components/ImageWithURL";
interface Props {
  bgColor?: string;
  textColor?: string;
  title?: string;
  textStyle?: string;
  onPress?: () => void;
  roundedStr?: string;
  iconUrl: string;
  iconStyle?: string;
  fontFamily?: string;
  layoutStyle?: StyleProp<ViewStyle>;
  textInlineStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isIconSvg?: boolean;
  iconType?: iconTypes;
}
const ButtonWithIcon: React.FC<Props> = ({
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
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      // style={{ flex: 1 }}
    >
      <View
        className={clsx(
          "flex flex-row items-center ",
          roundedStr ? roundedStr : "rounded-lg",
          bgColor
        )}
        style={layoutStyle ? layoutStyle : {}}
      >
        {isIconSvg && iconType ? (
          <View className={clsx(iconStyle ? iconStyle : "w-3 aspect-square")}>
            <SvgIcons iconType={iconType} />
          </View>
        ) : (
          <ImageWithURL
            source={{ uri: iconUrl }}
            className={clsx(iconStyle ? iconStyle : "w-3 aspect-square")}
            resizeMode={"contain"}
          />
        )}
        <Text
          className={clsx(textColor ? textColor : "", textStyle)}
          style={{ fontFamily: fontFamily ? fontFamily : "BaiJamjuree-Bold" }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
