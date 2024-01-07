import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";

import { Animated, Easing } from "react-native";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
}

const UploadSpin: React.FC<Props> = ({ fill, width, height }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      className={clsx(width ? width : "w-6", height ? height : "h-6")}
      style={{ transform: [{ rotate: spin }] }}
    >
      <ImageWithURL
        className=" w-full h-full"
        resizeMode="contain"
        source={{
          uri: "https://ik.imagekit.io/socialboat/UploadSpinImg_PKh7_m__e.png?updatedAt=1701994555048",
        }}
      />
    </Animated.View>
  );
};

export default UploadSpin;
