import { Text, TouchableOpacity } from "react-native";

interface Props {
  cta: string;
  onPress: () => void;
  ctaColor?: string;
  ctaTextColor?: string;
  ctaClassStr?: string;
  ctaTextClassStr?: string;
}

const CTAButton: React.FC<Props> = ({
  cta,
  onPress,
  ctaColor,
  ctaTextColor,
  ctaClassStr,
  ctaTextClassStr,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: ctaColor,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      }}
      onPress={onPress}
      className={ctaClassStr ? ctaClassStr : "rounded-full text-center px-4"}
    >
      <Text
        className={
          ctaTextClassStr ? ctaTextClassStr : "text-xs text-center py-2"
        }
        numberOfLines={2}
        style={{
          fontFamily: "Nunito-SemiBold",
          color: ctaTextColor,
        }}
      >
        {cta}
      </Text>
    </TouchableOpacity>
  );
};

export default CTAButton;
