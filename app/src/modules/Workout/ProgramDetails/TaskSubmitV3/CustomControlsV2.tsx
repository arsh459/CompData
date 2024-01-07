import CTA from "@modules/ReelViewMain/CTA";
import { back, next, pause, play } from "@modules/ReelViewMain/utils";
import { View, useWindowDimensions } from "react-native";
// import { SubTaskElement } from "@models/Tasks/Task";
// import { useContentContext } from "./utils/ContentProvider";
// import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import SubTask from "./SubTask";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
// import clsx from "clsx";
// import CustomSlider from "./CustomSlider";
import { useContentContext } from "./utils/ContentProvider";

interface Props {}

const CustomControlsV2: React.FC<Props> = ({}) => {
  //   const { left, right } = useSafeAreaInsets();
  // const { task } = usePlainTaskContext();
  const { width } = useWindowDimensions();

  const ctaWidth = Math.min(Math.max(width / 15, 50), 100);

  const { videoRef } = useContentContext();

  const {
    // subTasks,
    // onNextSubTask,
    // onPrevSubTask,
    onRewindForward,
    setContentModalState,
    streamingState,
    onPlayPause,

    // handleToggleControls,
    // finalOrientation,
  } = useWorkoutVideoStore((store) => {
    return {
      setContentModalState: store.setContentModalState,
      streamingState: store.streamingState,
      onPlayPause: store.onPlayPause,
      onRewindForward: store.onRewindForward,

      //   finalOrientation: store.finalOrientation,
      //   handleToggleControls: store.handleToggleControls,

      //   subTasks: store.task?.subTasks,
      //   onNextSubTask: store.onNextSubTask,
      //   onPrevSubTask: store.onPrevSubTask,
    };
  }, shallow);

  const onRewind = () => {
    onRewindForward(videoRef, "rewind");
  };

  const onForward = () => {
    onRewindForward(videoRef, "forward");
  };

  // const onPressSubTask = (subTaskEle: SubTaskElement, index: number) => {
  //   if (videoRef.current && subTaskEle.timeStart) {
  //     videoRef.current.seek(subTaskEle.timeStart);
  //     if (streamingState !== "play") {
  //       onPlayPause();
  //     }
  //   }
  //   clearTimer();
  // };

  // const onPrev = () => {
  //   if (task?.subTasks?.length && selectedSubTaskIndex > 0) {
  //     const ind = selectedSubTaskIndex - 1;
  //     onPressSubTask(task.subTasks[ind], ind);
  //   }
  // };

  // const onNext = () => {
  //   if (
  //     task?.subTasks?.length &&
  //     selectedSubTaskIndex < task.subTasks.length - 1
  //   ) {
  //     const ind = selectedSubTaskIndex === -1 ? 0 : selectedSubTaskIndex + 1;
  //     onPressSubTask(task.subTasks[ind], ind);
  //   }
  // };

  // const handlePlayPause = () => {
  //   onPlayPause(true);
  //   clearTimer();
  // };
  // console.log("customcontrols");

  return (
    <>
      <Pressable
        className="flex-1 z-10 w-full h-full justify-center items-center  absolute "
        onPress={() => setContentModalState("hide")}
      >
        <LinearGradient
          pointerEvents="none"
          className="absolute left-0 right-0 bottom-0 h-1/2 flex justify-end"
          colors={["#8D94E700", "#838CF3BF", "#8089F8"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <View
          className="flex-1 justify-center items-center"

          // style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          // className="w-full h-full relative z-0"
        >
          <View
            //   style={{
            //     position: "absolute",
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //     bottom: 0,
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            className="flex flex-row  justify-center items-center "
            // className="flex-1 flex flex-row justify-center items-center relative z-0"
          >
            {/* <Pressable
             className="absolute left-0 right-0 top-0 bottom-0 flex justify-end"
             onPress={() => setContentModalState("hide")}
               
           /> */}
            <View>
              <CTA onPress={onRewind} icon={back} width={ctaWidth} />
            </View>
            <View style={{ padding: ctaWidth / 6 }}>
              <CTA
                onPress={onPlayPause}
                icon={streamingState === "play" ? pause : play}
                width={ctaWidth}
              />
            </View>
            <View>
              <CTA onPress={onForward} icon={next} width={ctaWidth} />
            </View>
          </View>
          {/* <View
          className={clsx(
            "absolute left-0 right-0 bottom-0 flex justify-end",
            finalOrientation === "landscape" ? "h-2/5" : "h-1/4"
          )}
        >
          <CustomSlider />
        </View> */}
        </View>
      </Pressable>
    </>
  );
};

export default CustomControlsV2;
