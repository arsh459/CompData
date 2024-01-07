import { Dispatch, SetStateAction, useState } from "react";
import { currency } from "../PlanMobile";
import { Pressable, Text, View } from "react-native";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MenuV2 from "@components/Menu/V2";

interface Props {
  currency: currency;
  setCurrency: Dispatch<SetStateAction<currency>>;
}

const CurrencyToggler: React.FC<Props> = ({ currency, setCurrency }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const rotateValue = useSharedValue(0);

  const toggleMenu = () =>
    setIsMenuVisible((prev) => {
      rotateValue.value = withTiming(prev ? 0 : 1, {
        duration: 100,
        easing: Easing.linear,
      });
      return !prev;
    });

  const animatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(rotateValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    }; // as AnimatedStyleProp<ViewStyle>;
  });

  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text
          className="text-white text-center capitalize text-xl"
          style={{
            fontFamily: "Nunito-Bold",
          }}
        >
          Select your Plan
        </Text>

        <MenuV2
          visible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          menuItems={[
            {
              text: "🇮🇳 INR",
              callback: () => setCurrency("INR"),
            },
            { text: "🇺🇸 USD", callback: () => setCurrency("USD") },
          ]}
          menuColor="bg-white rounded-xl"
          menuItemsColor="bg-white"
          textStyle="text-[#494949] uppercase text-center"
          itemSeperatorColor="#00000026"
        >
          <Pressable
            className="py-1 bg-white rounded-lg flex flex-row justify-between items-center cursor-pointer px-4 relative z-0"
            onPress={toggleMenu}
          >
            <Text className="truncate text-[#494949] text-base font-nunitoM">
              {`${currency === "USD" ? "🇺🇸" : "🇮🇳"} ${currency}`}
            </Text>
            <Animated.View
              style={animatedStyles}
              className="w-3 aspect-square ml-2"
            >
              <ArrowIcon direction="bottom" color="#494949" />
            </Animated.View>
          </Pressable>
        </MenuV2>
      </View>
    </>
  );
};

export default CurrencyToggler;
