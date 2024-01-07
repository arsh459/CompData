import { Dimensions, StyleSheet, View } from "react-native";
import { useSymptomIntakeStore } from "./store/SymptomIntakeStore";
import { useEffect } from "react";
import BlurBG from "@components/BlurBG";
import QuestionContainer from "./QuestionContainer";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { useSymptomIntakeV2 } from "./hook/useSymptomIntakeV2";

const duration = 300;
const inputArr = [0, 1];
const animationConfig = { duration, easing: Easing.linear };
const { height } = Dimensions.get("window");

const SymptomIntake = () => {
  const { currQuestion, measurAIPre, measurAIPost, runHideAnimation } =
    useSymptomIntakeStore();

  const bgVal = useSharedValue(inputArr[0]);
  const aiVal = useSharedValue(inputArr[0]);
  const quVal = useSharedValue(inputArr[0]);
  const fiVal = useSharedValue(inputArr[0]);

  const { onClickResponse } = useSymptomIntakeV2();

  useEffect(() => {
    if (currQuestion) {
      bgVal.value = withTiming(inputArr[1], animationConfig);
      aiVal.value = withTiming(inputArr[1], animationConfig);
      quVal.value = withDelay(
        duration,
        withTiming(inputArr[1], animationConfig)
      );
      fiVal.value = withTiming(inputArr[1], animationConfig);
    }
    if (runHideAnimation) {
      bgVal.value = withTiming(inputArr[0], animationConfig);
      aiVal.value = withTiming(inputArr[0], animationConfig);
      quVal.value = withDelay(
        duration,
        withTiming(inputArr[0], animationConfig)
      );
      fiVal.value = withTiming(inputArr[0], animationConfig);
    }
  }, [currQuestion, runHideAnimation]);

  const bgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(bgVal.value, inputArr, [0, 1]);

    return { opacity };
  });

  const aiStyle = useAnimatedStyle(() => {
    const scale = interpolate(aiVal.value, [0, 1], [0.625, 1]);
    const left = interpolate(aiVal.value, inputArr, [
      measurAIPre.px,
      measurAIPost.px,
    ]);
    const top = interpolate(aiVal.value, inputArr, [
      measurAIPre.py,
      measurAIPost.py,
    ]);

    return { top, left, transform: [{ scale }] };
  });

  const quStyle = useAnimatedStyle(() => {
    const opacity = interpolate(quVal.value, inputArr, [0, 1]);

    return { opacity };
  });

  const fiStyle = useAnimatedStyle(() => {
    const translateY = interpolate(fiVal.value, inputArr, [height, 0]);

    return { transform: [{ translateY }] };
  });

  return currQuestion ? (
    <Animated.View style={[StyleSheet.absoluteFill, bgStyle, { zIndex: 100 }]}>
      <View className="flex-1 flex justify-end relative z-0">
        <BlurBG
          style={StyleSheet.absoluteFill}
          blurAmount={25}
          fallbackColor="#232136E5"
          blurType="dark"
        />

        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              opacity:
                currQuestion.hidePresent &&
                currQuestion.viewStyle !== "bottomsheet"
                  ? 1
                  : 0,
            },
            aiStyle,
          ]}
        >
          <ImageWithURL
            source={{ uri: chatAiIcon }}
            className="w-8 aspect-[1.5]"
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={currQuestion.viewStyle === "bottomsheet" ? fiStyle : quStyle}
        >
          <QuestionContainer
            {...currQuestion}
            onClickResponse={onClickResponse}
          />
        </Animated.View>
      </View>
    </Animated.View>
  ) : null;
};

export default SymptomIntake;
