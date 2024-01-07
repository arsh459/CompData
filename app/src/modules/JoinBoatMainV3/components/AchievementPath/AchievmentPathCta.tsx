import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  color: string;
  ctaText?: string;
  onCtaPress?: () => void;
}

const AchievmentPathCta: React.FC<Props> = ({ color, ctaText, onCtaPress }) => {
  const { bottom } = useSafeAreaInsets();

  return ctaText && onCtaPress ? (
    <LinearGradient
      colors={["transparent", color, color]}
      className="absolute left-0 right-0 bottom-0 p-4"
      style={{ paddingBottom: bottom || 16 }}
    >
      <TouchableOpacity
        className="w-full rounded-2xl px-4 py-3 bg-white"
        onPress={onCtaPress}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        }}
      >
        <Text
          className="text-[#6D55D1] text-base iphoneX:text-lg text-center"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {ctaText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : null;
};

export default AchievmentPathCta;
