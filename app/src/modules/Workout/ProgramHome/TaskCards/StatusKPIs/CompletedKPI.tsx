import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  earnedFp: number;
  total: number;
  overlay?: boolean;
  doneBy?: string;
}

const CompletedKPI: React.FC<Props> = ({
  earnedFp,
  total,
  overlay,
  doneBy,
}) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["#2A4B2DF2", "#6EC576"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full flex flex-col items-center justify-end  absolute    left-0 right-0 top-0 bottom-0 pb-2 px-4 z-50"
      )}
    >
      <View className="absolute left-0 right-0 top-0 bottom-0 flex  px-2 justify-center items-center z-50">
        <Text
          className="text-base iphoneX:text-lg font-bold  text-center text-white"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {/* Earned {earnedFp}/{total} FP */}
          Earned {earnedFp} FP
        </Text>
        <View className="bg-white  h-px w-full  mx-2" />
        <View className="flex flex-row items-center    justify-center">
          <Svg
            className="h-3 w-3 iphoneX:h-5 iphoneX:w-5 pr-1"
            viewBox="0 0 20 20"
            fill="#fff"
          >
            <Path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </Svg>

          <Text className="text-xs iphoneX:text-sm my-1   font-medium whitespace-nowrap text-white ">
            {doneBy ? `${doneBy}` : "Task completed"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CompletedKPI;
