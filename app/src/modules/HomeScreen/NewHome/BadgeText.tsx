import { View, Text } from "react-native";
import clsx from "clsx";
interface Props {
  skewY: string;
  textTop?: string;
  textBottom?: string;
  width: number;
  top?: number;
  left?: number;
  right?: number;
  textColor?: string;
}
const BadgeText: React.FC<Props> = ({
  skewY,
  textBottom,
  textTop,
  width,
  left,
  right,
  top,
  textColor,
}) => (
  <View className={clsx(" absolute   ")} style={{ top, left, right }}>
    <View style={{ transform: [{ skewY }] }}>
      <Text
        className="text-center"
        style={{
          fontFamily: "BaiJamjuree-Bold",
          // fontSize: width * 0.07,

          color: textColor ? textColor : "#ffffff",
        }}
      >
        {textTop}
      </Text>
    </View>
    <View style={{ transform: [{ skewY }] }}>
      <Text
        className="text-white text-center"
        style={{
          fontFamily: "BaiJamjuree-Medium",
          fontSize: width * 0.05,
          // transform: [{ skewY }],
          color: textColor ? textColor : "#ffffff",
        }}
      >
        {textBottom}
      </Text>
    </View>
  </View>
);

export default BadgeText;
