import { View, Platform, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "@react-native-community/blur";

interface Props {
  blurAmount: number;
  fallbackColor: string;
  blurType: "dark" | "light";
  style?: StyleProp<ViewStyle>;
}

const BlurBG: React.FC<Props> = ({
  style,
  fallbackColor,
  blurAmount,
  blurType,
}) => {
  const remoteFallbackColor = fallbackColor
    ? fallbackColor
    : blurType === "dark"
    ? "#000000"
    : "#FFFFFF";

  const num0To25 = (num: number) => {
    return num > 25 ? 25 : num < 0 ? 0 : num;
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <BlurView
          style={style}
          blurType={blurType}
          blurAmount={num0To25(blurAmount)}
          blurRadius={num0To25(blurAmount)}
          reducedTransparencyFallbackColor={remoteFallbackColor}
          overlayColor="transparent"
        />
      ) : (
        <View style={[style, { backgroundColor: remoteFallbackColor }]} />
      )}
    </>
  );
};

export default BlurBG;
