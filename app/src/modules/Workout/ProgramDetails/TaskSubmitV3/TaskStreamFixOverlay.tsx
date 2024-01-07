import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  // Pressable
} from "react-native";
import Loading from "@components/loading/Loading";
// import { useContentContext } from "./utils/ContentProvider";
// import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import FPProgress from "../TaskSubmitV2/FPProgress";
// import CustomSlider from "./CustomSlider";
import Timer from "./Timer";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
import CustomSlider from "./CustomSlider";
import ControlsOverlay from "./ControlsOverlay";
// import { useNetStore } from "@hooks/netinfo/useNetStore";

interface Props {
  // error: string;
  // fpProgress: number;
  // skipIntroVisible: boolean;
  // hasSubTasks?: boolean;
  // currVal: number;
}

const TaskStreamFixOverlay: React.FC<Props> = (
  {
    // error,
    // fpProgress,
    // skipIntroVisible,
    // hasSubTasks,
    // currVal,
  }
) => {
  const {
    streamingState,
    error,
    skipIntroVisible,
    handleSkipIntro,
    handleToggleControls,
    hasSubTasks,
    onRetry,
    videoReady,
  } = useWorkoutVideoStore((state) => {
    return {
      hasSubTasks: state.task?.subTasks?.length ? true : false,
      streamingState: state.streamingState,
      error: state.error,
      skipIntroVisible: state.skipIntroVisible,
      handleSkipIntro: state.handleSkipIntro,
      handleToggleControls: state.handleToggleControls,
      onRetry: state.onRetry,
      videoReady: state.videoReady,
    };
  }, shallow);

  // const { isConnected, setRetryNetwork } = useNetStore((state) => {
  //   return {
  //     isConnected: state.isConnected,
  //     setRetryNetwork: state.setRetryNetwork,
  //   };
  // }, shallow);

  // const onRetryWrapper = () => {
  //   if (isConnected !== "connected") {
  //     setRetryNetwork();
  //   } else {
  //     onRetry();
  //   }
  // };

  // const { task } = usePlainTaskContext();
  // const {
  //   videoRef,
  //   streamingState,
  //   setContentModalState,
  //   tone,
  //   finalOrientation,
  //   clearTimer,
  // } = useContentContext();

  // const handleSkipIntro = () => {
  //   if (videoRef && videoRef.current && task?.videoIntroDur) {
  //     videoRef.current.seek(task.videoIntroDur);
  //   }
  // };

  // const handleToggleControls = () => {
  //   clearTimer();
  //   setContentModalState("controls");
  // };
  // console.log("task stream overlay");

  return (
    <>
      {streamingState === "init" || videoReady === "none" ? (
        <View className="absolute inset-0 w-full h-full bg-black/50 flex justify-center items-center">
          <Loading width="w-16" height="h-16" />
        </View>
      ) : error ? (
        <View className="absolute inset-0 w-full h-full bg-black/50 flex justify-center items-center">
          <Text className="text-white">There was an error</Text>
          <Text className="text-white text-sm">{error}</Text>
          <View className="w-1/4">
            <TouchableOpacity
              onPress={onRetry}
              className="bg-[#6D55D1] rounded-2xl my-4 py-3"
            >
              <Text className="text-white text-base text-center">Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : skipIntroVisible ? (
        <View className="absolute left-4 bottom-10 bg-slate-100 rounded-lg">
          <TouchableOpacity onPress={handleSkipIntro}>
            <Text className="font-bold text-base iphoneX:text-xl px-4 py-2">
              Skip Intro
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {hasSubTasks ? null : <Timer />}

          <FPProgress />
          <ControlsOverlay />
          {/* {hasSubTasks ? null : <Timer currVal={currVal} />}
          {fpProgress > 0 && task?.fitPoints ? (
            <FPProgress
              tone={tone}
              fpProgress={fpProgress}
              orientation={finalOrientation}
              taskFp={task?.fitPoints}
            />
          ) : null} */}
          {/* 
          <View className="absolute left-0 right-0 bottom-0">
            <CustomSlider />
          </View> */}
          <Pressable
            className="absolute left-0 right-0 top-0 bottom-0"
            onPress={handleToggleControls}
          />
          <View className="absolute left-0 right-0 bottom-0 z-50 ">
            <CustomSlider />
          </View>
        </>
      )}
    </>
  );
};

export default TaskStreamFixOverlay;
