import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
// import Svg, { Path } from "react-native-svg";

interface Props {
  //   earnedFp: number;
  overlay?: boolean;
  //   total: number;
  doneBy?: string;
}

const InReviewKPI: React.FC<Props> = ({ doneBy, overlay }) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["#4B3C2AF2", "#F0B459"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full flex flex-col items-center justify-end  absolute  left-0 right-0 top-0 bottom-0 pb-2 px-4 z-50"
      )}
    >
      <View className="absolute left-0 right-0 top-0 bottom-0 justify-center items-center flex z-50">
        <Text className="text-lg font-semibold tracking-wide text-center text-white">
          Progress In Review
        </Text>
      </View>
      {/* <View className="flex flex-row items-center w-full justify-center">
        <Svg className="h-5 w-5 pr-1" viewBox="0 0 20 20" fill="#fff">
          <Path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </Svg>

        <Text className="text-xs iphoneX:text-sm my-1  font-medium whitespace-nowrap text-white flex-1">
          {doneBy ? `${doneBy}` : "By me"}
        </Text>
      </View> */}
    </LinearGradient>
  );
};

export default InReviewKPI;
