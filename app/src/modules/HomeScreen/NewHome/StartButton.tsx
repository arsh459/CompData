import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
interface Props {
  bgColor?: string;
  textColor?: string;
  title?: string;
  textStyle?: string;
  onPress?: () => void;
  roundedStr?: string;
  fontFamily?: string;
  startColor?: string;
  endColor?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const StartButton: React.FC<Props> = ({
  bgColor,
  textColor,
  title,
  onPress,
  textStyle,
  roundedStr,
  fontFamily,
  startColor,
  endColor,
  children,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient
        colors={
          startColor && endColor
            ? [startColor, endColor]
            : ["transparent", "transparent"]
        }
        end={{ x: 0, y: 0.5 }}
        start={{ x: 1, y: 0.5 }}
        className={clsx(roundedStr ? roundedStr : "rounded-lg")}
      >
        <View className={clsx(roundedStr ? roundedStr : "rounded-lg", bgColor)}>
          {children ? (
            children
          ) : (
            <Text
              style={{
                fontFamily: fontFamily ? fontFamily : "Nunito-Medium",
              }}
              className={clsx(
                textColor ? textColor : "",
                textStyle,
                "whitespace-nowrap"
              )}
            >
              {title}
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StartButton;
