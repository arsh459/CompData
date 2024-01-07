import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
interface Props {
  onPress: () => void;
  iconUri?: string;
  containerStyleTw?: string;
  textStyleTw?: string;
  text?: string;
}

const MarqueeButton: React.FC<Props> = ({
  onPress,
  containerStyleTw,
  iconUri,
  text,
  textStyleTw,
}) => {
  const { width } = useWindowDimensions();
  const offset = useSharedValue(width * 0.3);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 1500 }),
      -1,
      true
    );
  }, []);
  const uri = iconUri ? iconUri : null;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        containerStyleTw ? containerStyleTw : "bg-[#ffbb35] w-3/4 py-3.5",
        "   mx-auto  rounded-xl mt-5 flex flex-row items-center justify-center relative z-0 "
      )}
    >
      {uri ? (
        <ImageWithURL source={{ uri }} className="w-5 aspect-square" />
      ) : null}
      <Text
        className={clsx(
          textStyleTw ? textStyleTw : "text-lg text-[#232136]",
          " pl-2"
        )}
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {text}
      </Text>
      <View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        ]}
      >
        <Animated.Image
          className={"w-full h-full"}
          style={[animatedStyles]}
          source={{
            uri: "https://ik.imagekit.io/socialboat/Vector%20(4)_CJ-82JTzpx.png?updatedAt=1695208180507",
          }}
          resizeMode={"contain"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MarqueeButton;
