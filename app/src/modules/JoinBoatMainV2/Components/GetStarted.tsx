import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onGetStarted?: () => void;
  disabled?: boolean;
  text?: string;
  bgColor?: string;
}

const GetStarted: React.FC<Props> = ({
  disabled,
  onGetStarted,
  text,
  bgColor,
}) => {
  const scaleX = useRef(new Animated.Value(0.9)).current;
  const scaleY = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleX, {
        toValue: 1.15,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(scaleY, {
        toValue: 1.3,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [scaleX, scaleY, opacity]);

  return (
    <View className="relative z-0">
      <TouchableOpacity
        className={clsx(
          "rounded-full px-4 py-3 m-4",
          disabled ? "bg-[#757575]" : "bg-white",
          !onGetStarted && "opacity-0"
        )}
        style={bgColor ? { backgroundColor: bgColor } : {}}
        onPress={() => {
          if (onGetStarted) {
            onGetStarted();
          }
        }}
        disabled={disabled}
      >
        <Text
          className="text-[#100F1A] text-base iphoneX:text-xl text-center"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {text ? text : "Get Started"}
        </Text>
      </TouchableOpacity>
      <Animated.View
        className="absolute left-0 right-0 top-0 bottom-0 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 0.5,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      />
      <Animated.View
        className="absolute left-1 right-1 top-1 bottom-1 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 0.75,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      />
      <Animated.View
        className="absolute left-2 right-2 top-2 bottom-2 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 1,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      />
    </View>
  );
};

export default GetStarted;
