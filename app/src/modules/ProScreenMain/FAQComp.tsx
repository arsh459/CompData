import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { FAQDATA } from "./utils";
import { faqMinusIcon, faqPlusIcon } from "@constants/imageKitURL";
import clsx from "clsx";
import ImageWithURL from "@components/ImageWithURL";
import Animated, {
  // AnimatedStyleProp,
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";
interface Props {
  // isOpen: boolean;
  // setIsOpen: () => void;
  faq: FAQDATA;
  borderColorTw?: string;
  borderStr?: string;
}
const FAQComp: React.FC<Props> = ({ faq, borderColorTw, borderStr }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateValue = useSharedValue(0);
  const uri = isOpen ? faqMinusIcon : faqPlusIcon;

  const toggleFaq = () =>
    setIsOpen((prev) => {
      rotateValue.value = withTiming(prev ? 1 : 0, {
        duration: 100,
        easing: Easing.linear,
      });
      return !prev;
    });

  const animatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(rotateValue.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    }; // as AnimatedStyleProp<ViewStyle>;
  });

  return (
    <View className="px-4">
      <Pressable onPress={toggleFaq} className="flex flex-row flex-1">
        <Text
          className="flex-1 text-sm text-white pr-2"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {faq.heading}
        </Text>
        <Animated.View
          style={animatedStyles}
          className="w-5 iphoneX:w-6 aspect-square"
        >
          <ImageWithURL
            source={{ uri }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Animated.View>
      </Pressable>
      {isOpen ? (
        <Text
          className="pt-4 text-xs text-white/70"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {faq.text}
        </Text>
      ) : null}
      <View
        className={clsx(
          "w-full",
          borderStr ? borderStr : "my-7 h-px",
          borderColorTw ? borderColorTw : "bg-[#4D4D4D]"
        )}
      />
    </View>
  );
};

export default FAQComp;
