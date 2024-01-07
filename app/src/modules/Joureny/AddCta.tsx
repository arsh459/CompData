import SvgIcons from "@components/SvgIcons";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  width?: string;
  noAnimation?: boolean;
}

const AddCta: React.FC<Props> = ({ onPress, disabled, width, noAnimation }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!noAnimation) {
      Animated.loop(
        Animated.timing(scale, {
          toValue: 1.25,
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
    }
  }, [scale, opacity, noAnimation]);

  return (
    <View className="relative z-0" style={{ elevation: 0 }}>
      {noAnimation ? null : (
        <>
          <Animated.View
            className="absolute left-0 right-0 top-0 bottom-0 -z-10 border-white rounded-full"
            style={{
              elevation: -10,
              transform: [{ scale }],
              opacity,
              borderWidth: 0.5,
              borderColor: "#FFFFFF",
            }}
          />
          <Animated.View
            className="absolute left-1 right-1 top-1 bottom-1 -z-10 border-white rounded-full"
            style={{
              elevation: -10,
              transform: [{ scale }],
              opacity,
              borderWidth: 0.75,
              borderColor: "#FFFFFF",
            }}
          />
          <Animated.View
            className="absolute left-2 right-2 top-2 bottom-2 -z-10 border-white rounded-full"
            style={{
              elevation: -10,
              transform: [{ scale }],
              opacity,
              borderWidth: 1,
              borderColor: "#FFFFFF",
            }}
          />
        </>
      )}
      <TouchableOpacity
        className={clsx(
          "rounded-full aspect-square bg-[#FFFFFF66]",
          width ? width : "w-20 p-6"
        )}
        style={{ aspectRatio: 1, maxWidth: 80 }}
        disabled={disabled}
        onPress={onPress}
      >
        <SvgIcons iconType="add" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default AddCta;
