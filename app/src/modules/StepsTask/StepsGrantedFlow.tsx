// import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useStepActivities } from "@hooks/steps/useStepActivities";
import { useUserSteps } from "@hooks/steps/useUserSteps";
import { useTaskContext } from "@providers/task/TaskProvider";
import { ScrollView, Text, View } from "react-native";
import Header from "@modules/Header";
import TaskMedia from "@modules/Workout/ProgramDetails/TaskPreview/TaskMedia";
import { useSteps } from "@hooks/steps/useSteps";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import StepsProgressHolder from "./StepsProgressHolder";
import { getEndTime } from "./getEndTime";
import { useState } from "react";
import WarnBoxModal from "@modules/HomeScreen/MyProgress/WarnBoxModal";
import crashlytics from "@react-native-firebase/crashlytics";

interface Props {
  taskId: string;
  selectedDay: number;
}

const StepsGrantedFlow: React.FC<Props> = ({ taskId, selectedDay }) => {
  const [showWarning, toggleWarning] = useState<boolean>(false);
  const { uiState, onStartWorkout, selectedAct } = useStepActivities(
    selectedDay,
    taskId
  );
  useSteps();

  const { task, progress, earnedFP } = useTaskContext();

  // const { task } = useWorkoutTask(taskId);

  const { daySteps } = useUserSteps(undefined, selectedAct?.createdOn);

  const onStartClick = async () => {
    if (uiState === "SWITCH_TASK") {
      toggleWarning(true);
    } else if (uiState === "CAN_DO") {
      try {
        await onStartWorkout();
      } catch (error: any) {
        crashlytics().recordError(error);
        console.log("error", error);
      }
    }
  };

  const rightModalClick = async () => {
    await onStartWorkout();
    toggleWarning(false);
  };
  const onClose = () => {
    toggleWarning(false);
  };

  return (
    <View className="flex-1 pb-8">
      <WarnBoxModal
        cta1="Not now"
        cta2="Join Task"
        text="You can do only one steps task a day. If you want to join this, your progress for other will be lost"
        onLeftClick={onClose}
        onRightClick={rightModalClick}
        isOpen={showWarning}
        onClose={onClose}
      />
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType="overlay"

        // optionNode={canPost ? <OptionNode /> : null}
      />
      <ScrollView>
        <TaskMedia
          taskName={task?.name}
          media={task?.thumbnails ? task?.thumbnails : task?.videoThumbnail}
          uid={task?.userId}
          fitPoints={task?.fitPoints}
          level={task?.level}
          hideKPIs={true}
          hideAuthor={true}
          taskDuration={task?.durationMinutes ? task?.durationMinutes : 0}
        />
        <View className="p-4">
          <StepsProgressHolder
            progress={progress}
            daySteps={daySteps?.steps}
            fpTarget={task?.fitPoints}
            fp={earnedFP}
            isActive={uiState === "ACTIVE"}
          />
        </View>
      </ScrollView>

      {uiState === "CAN_DO" || uiState === "SWITCH_TASK" ? (
        <View className="w-4/5 mx-auto">
          <StartButton
            title={uiState === "CAN_DO" ? "Start Walking" : "Switch Task"}
            bgColor="bg-[#fff]"
            textColor="text-[#100F1A] "
            roundedStr="rounded-full m-4 "
            textStyle="py-2  text-center  text-xl  rounded-md"
            onPress={onStartClick}
            fontFamily="BaiJamjuree-Bold"
          />
        </View>
      ) : uiState === "ACTIVE" ? (
        <View>
          <Text
            className="text-white opacity-80 text-3xl text-center font-bold"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {getEndTime()}
          </Text>
          <Text
            className="text-white opacity-80 text-lg text-center font-medium"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Time remaining
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default StepsGrantedFlow;
