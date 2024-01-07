import clsx from "clsx";
import { View, Text, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";

interface Props {
  // currVal: number;
}

const Timer: React.FC<Props> = ({}) => {
  const { left } = useSafeAreaInsets();
  const { finalOrientation, totalSec, currVal } = useWorkoutVideoStore(
    (state) => {
      return {
        finalOrientation: state.finalOrientation,
        totalSec: state.positionData.totalSec,
        currVal: state.positionData.currentVal,
      };
    },
    shallow
  );
  // const { finalOrientation, positionData } = useContentContext();

  const getTimerPosition = (
    leftInset: number,
    orientation?: "landscape" | "portrait"
  ) => {
    if (Platform.OS === "ios") {
      if (orientation === "landscape" && leftInset) {
        return "top-8 left-20";
      }
    }

    if (orientation === "landscape" && leftInset) {
      return "top-8 left-8";
    } else if (orientation === "landscape") {
      return "top-8 left-8";
    } else if (orientation === "portrait") {
      return "top-16 right-4";
    }
  };

  const zeroPad = (num: number) => String(num).padStart(2, "0");

  const getDurStr = (diff: number) => {
    return `${zeroPad(Math.floor(diff / 60))} : ${zeroPad(
      Math.ceil(diff % 60)
    )}`;
  };

  // console.log("timer");

  return (
    <View
      className={clsx(
        "absolute z-10 bg-white/20 rounded-2xl p-3",
        getTimerPosition(left, finalOrientation)
      )}
    >
      <Text
        className="text-2xl text-white"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {getDurStr(totalSec - currVal)}
      </Text>
      <View className="w-full h-1 bg-black/50 rounded-full my-1">
        <View
          style={{
            width: `${(currVal / totalSec) * 100}%`,
          }}
          className="h-full bg-white rounded-full"
        />
      </View>
    </View>
  );
};

export default Timer;
