import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
import { useEffect, useRef, useState } from "react";
import { View, Animated, useWindowDimensions } from "react-native";

const animateTime = 1500;

interface Props {
  onGotoJoin: () => void;
}

const SettintUp: React.FC<Props> = ({ onGotoJoin }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(onGotoJoin, animateTime * 3.5);
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: animateTime * 3,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View className="flex-1 relative">
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Union_vvy_Wkt0P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100738600"
        text="Creating a workout plan"
        colors={["#48AFFF", "#829DFF"]}
      />
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Vector_-4FdNPIi_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100721176"
        text="Sending information for diet plan"
        colors={["#EBA94E", "#FF6153"]}
        delay={animateTime}
      />
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Vector_F_MugypDu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100705507"
        text="Accounting for your Mindful levels"
        colors={["#8F98FF", "#FF72E0"]}
        delay={animateTime * 2}
      />
    </View>
  );
};

export default SettintUp;

interface StackingCompProps {
  imgUrl: string;
  text: string;
  colors: string[];
  delay?: number;
}

const StackingComp: React.FC<StackingCompProps> = ({
  imgUrl,
  text,
  colors,
  delay,
}) => {
  const { width, height } = useWindowDimensions();
  const [first, setFirst] = useState<number>(0);
  const scale = useRef(new Animated.Value(1.25)).current;
  const translateY = useRef(new Animated.Value(height / 3)).current;
  const opacity = useRef(new Animated.Value(first)).current;
  const scaleImg = useRef(new Animated.Value(5)).current;
  const translateXImg = useRef(new Animated.Value(width / 10)).current;
  const translateYImg = useRef(
    new Animated.Value(-(width > iPhoneX ? 18 : 16))
  ).current;

  useEffect(() => {
    setTimeout(() => {
      setFirst(0.4);
    }, delay);
    Animated.timing(scale, {
      toValue: 1,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleImg, {
      toValue: 1,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateXImg, {
      toValue: 0,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYImg, {
      toValue: 0,
      duration: animateTime,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [scale, translateY, opacity, scaleImg, translateXImg, translateYImg]);

  return (
    <Animated.View
      className="flex flex-row items-center px-4 iphoneX:px-8 py-4 iphoneX:py-6"
      style={{ transform: [{ translateY }, { scale }], opacity }}
    >
      <Animated.Image
        source={{
          uri: imgUrl,
        }}
        className="w-5 iphoneX:w-6 aspect-square"
        resizeMode="contain"
        style={{
          transform: [
            { scale: scaleImg },
            { translateX: translateXImg },
            { translateY: translateYImg },
          ],
        }}
      />
      <View className="w-4 aspect-square" />
      <GradientText
        text={text}
        textStyle={{
          fontSize: width > iPhoneX ? 18 : 16,
          fontFamily: "BaiJamjuree-Bold",
          fontWeight: "900",
          color: "white",
        }}
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        fallbackColor="white"
      />
    </Animated.View>
  );
};
