import CTA from "@modules/ReelViewMain/CTA";
import { back, next, pause, play } from "@modules/ReelViewMain/utils";
import { View, ScrollView, useWindowDimensions } from "react-native";
// import { SubTaskElement } from "@models/Tasks/Task";
// import { useContentContext } from "./utils/ContentProvider";
// import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomSlider from "./CustomSlider";
import clsx from "clsx";
import SubTask from "./SubTask";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";

interface Props {}

const CustomControls: React.FC<Props> = ({}) => {
  const { left, right } = useSafeAreaInsets();
  // const { task } = usePlainTaskContext();
  const { width } = useWindowDimensions();

  const ctaWidth = Math.min(Math.max(width / 15, 50), 100);

  // const { videoRef } = useContentContext();

  const {
    subTasks,
    onNextSubTask,
    onPrevSubTask,
    setContentModalState,
    streamingState,
    finalOrientation,
  } = useWorkoutVideoStore((store) => {
    return {
      setContentModalState: store.setContentModalState,
      streamingState: store.streamingState,
      finalOrientation: store.finalOrientation,
      subTasks: store.task?.subTasks,
      onNextSubTask: store.onNextSubTask,
      onPrevSubTask: store.onPrevSubTask,
    };
  }, shallow);

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

  return (
    <View className="w-full h-full relative z-0">
      <View className="flex-1 flex flex-row justify-center items-center relative z-0">
        <LinearGradient
          pointerEvents="none"
          className="absolute left-0 right-0 bottom-0 h-1/2 flex justify-end"
          colors={["#8D94E700", "#838CF3BF", "#8089F8"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Pressable
          className="absolute left-0 right-0 top-0 bottom-0 flex justify-end"
          onPress={() => setContentModalState("hide")}
        />
        <View
        // className={selectedSubTaskIndex > 0 ? "" : "opacity-0"}
        >
          <CTA onPress={onPrevSubTask} icon={back} width={ctaWidth} />
        </View>
        <View style={{ padding: ctaWidth / 6 }}>
          <CTA
            onPress={() => {}}
            icon={streamingState === "play" ? pause : play}
            width={ctaWidth}
          />
        </View>
        <View
        // className={
        //   task?.subTasks?.length &&
        //   selectedSubTaskIndex < task.subTasks.length - 1
        //     ? ""
        //     : "opacity-0"
        // }
        >
          <CTA onPress={onNextSubTask} icon={next} width={ctaWidth} />
        </View>
      </View>
      <View
        className={clsx(
          "absolute left-0 right-0 bottom-0 flex justify-end",
          finalOrientation === "landscape" ? "h-2/5" : "h-1/4"
        )}
      >
        {subTasks?.length ? (
          <ScrollView
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            // onTouchStart={() => startTimer(Number.MAX_VALUE)}
            // onMomentumScrollEnd={clearTimer}
            contentContainerStyle={{
              alignItems: "flex-end",
              padding: 0,
              margin: 0,
            }}
          >
            <View
              style={{ width: finalOrientation === "landscape" ? left : 2 }}
            />
            {subTasks.map((item, index) => (
              <SubTask
                key={`${item.subTaskId}-${index}`}
                item={item}
                index={index}
                // onPress={() => onPressSubTask(item, index)}
                onPress={() => {}}
              />
            ))}
            <View>
              <View
                style={{ width: finalOrientation === "landscape" ? right : 2 }}
              />
            </View>
          </ScrollView>
        ) : null}
        <CustomSlider />
      </View>
    </View>
  );
};

export default CustomControls;
