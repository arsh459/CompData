import CirclePercent from "@components/CirclePercent";
import FastImage from "react-native-fast-image";
import { Platform, Text, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clsx from "clsx";
import { useWorkoutVideoStore } from "../TaskSubmitV3/utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
import { useNetStore } from "@hooks/netinfo/useNetStore";
import NoNetwork from "./NoNetwork";

interface Props {}

const { width } = Dimensions.get("window");

const getMeterPosition = (
  rightInset: number,
  orientation?: "landscape" | "portrait"
) => {
  if (Platform.OS === "ios") {
    if (orientation === "landscape" && rightInset) {
      return "top-8 right-20";
    }
  }

  if (orientation === "landscape" && rightInset) {
    return "top-8 right-8";
  } else if (orientation === "landscape") {
    return "top-8 right-8";
  } else if (orientation === "portrait") {
    return "top-16 left-4";
  }
};

const FPProgress: React.FC<Props> = ({}) => {
  const { right } = useSafeAreaInsets();
  // const color = tone === "light" ? "#7756FF" : "#9980FF";
  const {
    fpAward,
    visibleProgress,
    tone,
    orientation,
    color,
    taskFp,
    loadingState,
    // error,
    // onRetry,
  } = useWorkoutVideoStore((state) => {
    const tone = state.tone;
    // const { fpAward, visibleProgress } = calculateFPFromProgress(
    //   state.fpProgress,
    //   state.task?.fitPoints
    // );
    return {
      taskFp: state.task?.fitPoints,
      // fpProgress: state.fpProgress,
      fpAward: state.fpAward,

      visibleProgress: state.visibleProgress,

      tone: tone,
      orientation: state.finalOrientation,
      loadingState: state.loadingState,
      // error: state.error,
      // onRetry: state.onRetry,
      color: tone === "light" ? "#7756FF" : "#9980FF",
    };
  }, shallow);

  const disconnected = useNetStore(
    (state) => state.isConnected === "disconnected"
  );

  // console.log("disconnected", disconnected);

  // const { fpAward, visibleProgress } = calculateFPFromProgress(
  //   fpProgress,
  //   taskFp
  // );

  // const fpEarned = Math.floor(taskFp * fpProgress);
  // const prog = fpEarned / taskFp;

  const font =
    orientation === "landscape" && width < 700
      ? 14
      : orientation === "portrait" && width < 400
      ? 14
      : 20;

  return (
    <View
      className={clsx(
        tone === "light" && !disconnected
          ? "bg-white border-[#261D4F]/5"
          : !disconnected
          ? "bg-[#261D4F] border-white/5"
          : "",
        !disconnected ? "p-3 border" : "",
        "absolute z-10  rounded-2xl ",
        getMeterPosition(right, orientation)
      )}
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
    >
      {disconnected ? (
        <>
          <NoNetwork cta="Retry" text="No Network" />
        </>
      ) : (
        <>
          <CirclePercent
            circleSize={80}
            strokeWidth={10}
            percent={visibleProgress}
            showInactive={true}
            inActiveColor={`${color}4D`}
            activeColor={color}
          >
            <View className="flex-1 flex justify-center items-center">
              <Text
                style={{
                  color: color,
                  fontSize: font,
                  fontFamily: "Nunito-Bold",
                }}
              >{`${fpAward}/${taskFp}`}</Text>
            </View>
          </CirclePercent>

          <View className="flex flex-row justify-center items-center pt-1">
            {loadingState === "buffer" ? null : (
              <FastImage
                source={{
                  uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Component_114_vWfhpwTJP.png?updatedAt=1680251638361",
                }}
                className="w-5 aspect-square"
              />
            )}

            <View className="flex-1 flex justify-center items-center pl-1">
              {/* <Text
                style={{
                  color: color,
                  fontSize: 14,
                  fontFamily: "Nunito-Bold",
                }}
              >
                L: {loadingState} d: {disconnected ? "Disc" : "Conn"} E: {error}
              </Text> */}
              <Text
                style={{
                  color: color,
                  fontSize: 14,
                  fontFamily: "Nunito-Bold",
                }}
              >
                {loadingState === "buffer" ? "Buffering ..." : "Fitpoints"}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default FPProgress;
