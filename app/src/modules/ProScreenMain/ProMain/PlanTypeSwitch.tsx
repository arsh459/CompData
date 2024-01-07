import { View, Pressable, TextStyle } from "react-native";
import { PlanTypes } from "@models/AppSubscription/AppSubscription";
import { Dispatch, SetStateAction } from "react";
import Animated, {
  // AnimatedStyleProp,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import GradientText from "@components/GradientText";

interface Props {
  planType: PlanTypes;
  setPlanType: Dispatch<SetStateAction<PlanTypes>>;
}

const PlanTypeSwitch: React.FC<Props> = ({ planType, setPlanType }) => {
  const translateX = useSharedValue(0);

  const setPro = () => {
    setPlanType(() => {
      translateX.value = withTiming(0, {
        duration: 100,
        easing: Easing.linear,
      });
      return "pro";
    });
    weEventTrack("plans_setPro", {});
  };

  const setProPlus = () => {
    setPlanType(() => {
      translateX.value = withTiming(1, {
        duration: 100,
        easing: Easing.linear,
      });
      return "proPlus";
    });
    weEventTrack("plans_setProPlus", {});
  };

  // useEffect(() => {
  //   if (planType === "pro") {
  //     setTimeout(() => setPro(), 200);
  //   } else {
  //     setTimeout(() => setProPlus(), 200);
  //   }
  // }, [planType]);

  const animatedStyles = useAnimatedStyle(() => {
    const left = interpolate(translateX.value, [0, 1], [0, 50]);
    return {
      left: `${left}%`,
    }; //as AnimatedStyleProp<ViewStyle>;
  });

  const textStyle: TextStyle = {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    textAlign: "center",
  };

  return (
    <View>
      <View className="w-full bg-[#0000003B] backdrop-blur-2xl border sm:border-0 border-white/20 rounded-lg sm:rounded-none overflow-hidden px-2">
        <View className="w-full max-w-xl mx-auto flex flex-row items-center relative z-0">
          <Pressable
            onPress={setPro}
            className="flex-1 flex flex-row justify-center items-center py-3 cursor-pointer"
          >
            <GradientText
              text="Pro"
              colors={["#CCA467", "#CCA467", "#CCA467"]}
              textStyle={textStyle}
            />
          </Pressable>

          <Pressable
            onPress={setProPlus}
            className="flex-1 flex flex-row justify-center items-center py-3 cursor-pointer"
          >
            <GradientText
              text="Pro Plus"
              colors={["#FF317B", "#FF8C8C", "#FF477D"]}
              textStyle={textStyle}
            />
          </Pressable>

          <Animated.View
            style={animatedStyles}
            className="absolute top-1.5 bottom-1.5 w-1/2 -z-s10 rounded-md bg-white -z-10"
          />
        </View>
      </View>
    </View>
  );
};

export default PlanTypeSwitch;
