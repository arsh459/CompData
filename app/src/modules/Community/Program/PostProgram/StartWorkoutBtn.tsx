import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const StartWorkoutBtn = () => {
  return (
    <LinearGradient
      colors={["#F19B38", "#FD6F6F"]}
      className="w-full h-full flex flex-row justify-center items-center rounded-xl px-2.5 iphoneX:px-4"
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <Svg
        className="w-5 iphoneX:w-8 h-5 iphoneX:h-8"
        viewBox="0 0 30 30"
        fill="none"
      >
        <Path d="M15.0001 9.54501V20.4541" stroke="white" strokeWidth="1.6" />
        <Path
          d="M9.5455 14.9996L20.4546 14.9996"
          stroke="white"
          strokeWidth="1.6"
        />
        <Rect
          x="4.59091"
          y="4.59091"
          width="20.8182"
          height="20.8182"
          rx="5.5"
          stroke="white"
        />
        <Rect
          x="2.97726"
          y="2.97726"
          width="24.0455"
          height="24.0455"
          rx="6.75"
          stroke="white"
          strokeWidth="0.75"
        />
        <Rect
          x="1.46365"
          y="1.46365"
          width="27.0727"
          height="27.0727"
          rx="7.9"
          stroke="white"
          strokeWidth="0.5"
        />
        <Rect
          x="0.05"
          y="0.05"
          width="29.9"
          height="29.9"
          rx="7.95"
          stroke="white"
          strokeWidth="0.25"
        />
      </Svg>
      <Text className="pl-2 whitespace-nowrap text-white text-sm iphoneX:text-base">
        Start workout
      </Text>
    </LinearGradient>
  );
};

export default StartWorkoutBtn;
