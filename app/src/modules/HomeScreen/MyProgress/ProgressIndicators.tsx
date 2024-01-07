import { Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  numberString?: number | string;
  text?: string;
  startColor?: string;
  endColor?: string;
  imageUrl?: string;
}

const ProgressIndicators: React.FC<Props> = ({
  numberString,
  text,
  startColor,
  endColor,
  imageUrl,
}) => {
  return (
    <LinearGradient
      colors={[
        startColor ? startColor : "#0085E0",
        endColor ? endColor : "#3852AC",
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="flex justify-start items-center rounded-2xl flex-1 p-2 iphoneX:p-3"
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-1/2 aspect-square"
        resizeMode="contain"
      />
      <Text
        className="text-sm text-center text-[#FFFFFF]"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {numberString}
      </Text>
      <Text
        className="text-xs text-center text-[#E0E0EE]"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
};

export default ProgressIndicators;
