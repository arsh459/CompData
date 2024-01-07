import { StyleProp, Text, TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";

interface Props {
  text: string | number;
  textStyle?: StyleProp<TextStyle>;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  colors?: string[];
  fallbackColor?: string;
  txtTlStyle?: string;
  noWrap?: boolean;
}

const GradientText: React.FC<Props> = ({
  text,
  textStyle,
  start,
  end,
  colors,
  fallbackColor,
  txtTlStyle,
  noWrap,
}) => {
  return (
    <MaskedView
      maskElement={
        <Text
          style={textStyle}
          className={clsx(txtTlStyle, noWrap && "whitespace-nowrap")}
        >
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={
          colors
            ? colors
            : [
                fallbackColor ? fallbackColor : "black",
                fallbackColor ? fallbackColor : "black",
              ]
        }
        start={start}
        end={end}
      >
        <Text
          style={[textStyle, { opacity: 0 }]}
          className={clsx(
            txtTlStyle,
            noWrap && "whitespace-nowrap",
            "opacity-0"
          )}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
