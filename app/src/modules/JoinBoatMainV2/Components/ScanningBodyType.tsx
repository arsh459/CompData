import GradientText from "@components/GradientText";
import SpreadColorBall from "@components/SpreadColorBall";
import { updateUserBadgeIdV2 } from "@models/User/updateUtils";
import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";
import { useEffect } from "react";
import { Animated, Easing, View } from "react-native";
import FastImage from "react-native-fast-image";

const animateOption = (duration: number, delay?: number) => {
  return {
    toValue: 1,
    duration,
    easing: Easing.linear,
    useNativeDriver: true,
    delay,
  };
};

const interpolateObj = {
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
};

const timing = 6000;

interface Props {
  onScaningNext: () => void;
  uid?: string;
}

const ScanningBodyType: React.FC<Props> = ({ onScaningNext, uid }) => {
  const spinValue = new Animated.Value(0);
  const rotateValueX = new Animated.Value(0);
  const rotateValueY = new Animated.Value(0);
  const fadeInValue = new Animated.Value(0);

  Animated.loop(Animated.timing(spinValue, animateOption(8250))).start();
  Animated.loop(Animated.timing(rotateValueX, animateOption(3500))).start();
  Animated.loop(Animated.timing(rotateValueY, animateOption(6750))).start();

  const rotate = spinValue.interpolate(interpolateObj);
  const rotateX = rotateValueX.interpolate(interpolateObj);
  const rotateY = rotateValueY.interpolate(interpolateObj);

  const fade1 = fadeInValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
  });
  const fade2 = fadeInValue.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
  });

  const updateMap = useRoadmapUpdateStore((state) => state.updateMap);

  // useEffect(() => {
  //   setTimeout(onScaningNext, timing);
  // }, []);

  useEffect(() => {
    Animated.timing(fadeInValue, animateOption(timing, 0)).start();
  }, [fadeInValue]);

  useEffect(() => {
    if (uid) {
      updateUserBadgeIdV2(uid, updateMap).then(() => {
        setTimeout(onScaningNext, 4000);
      });
    }
  }, [uid]);

  return (
    <View className="flex-1 bg-[#100F1A] flex justify-center items-center">
      <View className="flex-1 max-h-[600px] flex justify-evenly items-center p-4">
        <View className="w-3/5 aspect-square relative z-0">
          <Animated.View
            className="absolute left-0 right-0 top-0 bottom-0 border-4 border-[#59FFC3] rounded-full"
            style={{ transform: [{ rotate }, { rotateX }] }}
          />
          <Animated.View
            className="absolute left-4 right-4 top-4 bottom-4 border-4 border-[#3CD0FF] rounded-full"
            style={{ transform: [{ rotate }, { rotateY }] }}
          />
          <Animated.View
            className="absolute left-8 right-8 top-8 bottom-8 border-4 border-[#C668FF] rounded-full"
            style={{ transform: [{ rotateX }, { rotateY }] }}
          />
          <View className="absolute left-0 right-0 top-0 bottom-0">
            <SpreadColorBall color1="#100F1A" color2="#100F1A" opacity2={0} />
          </View>
          <FastImage
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Union_dLCekVZ94U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672141363992",
            }}
            className="absolute left-1/4 right-1/4 top-1/4 bottom-1/4"
            resizeMode="contain"
          />
        </View>
        <Animated.View style={{ opacity: fade1 }}>
          <GradientText
            text={"Analyzing your current body parameters"}
            colors={["#48FFDE", "#48AFFF", "#9E71FF"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-SemiBold",
              fontSize: 24,
              textAlign: "center",
            }}
          />
        </Animated.View>
        <Animated.View style={{ opacity: fade2 }}>
          <GradientText
            text={"Creating achievable goals"}
            colors={["#48FFDE", "#48AFFF", "#9E71FF"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-SemiBold",
              fontSize: 24,
              textAlign: "center",
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default ScanningBodyType;
