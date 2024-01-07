import { useNavigation } from "@react-navigation/native";
import { Linking, Pressable, View } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
import PendingModal from "./PendingModal";
import { useState } from "react";
import { format } from "date-fns";
import Loading from "@components/loading/Loading";
import MyPlanCardV2 from "@modules/HomeScreen/MyPlan/V2/MyPlanCardV2";
import { Task } from "@models/Tasks/Task";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useIsTaskAllowedV4 } from "@providers/task/hooks/useIsTaskAllowedV4";
import { useUserRelevantActsCount } from "@hooks/activity/useUserRelevantActs";
import { useNavStore } from "@providers/nav/navStore";
import { shallow } from "zustand/shallow";

interface Props {
  width: number;
  height: number;
  imgHeight: number;
  task: Task;
  accessDueToBootcamp: boolean;
}

const TaskCardV3: React.FC<Props> = ({
  width,
  height,
  imgHeight,
  task,
  accessDueToBootcamp,
}) => {
  const navigation = useNavigation();
  const { selectedUnix } = useDayContext();

  const [modalText, setModalText] = useState<string>();

  const { taskStatus, selectedActivity, earnedFP, unlocksIn, expiresIn } =
    useIsTaskAllowedV4(selectedUnix, 0.95, task, accessDueToBootcamp);
  const { userRelevantActsCount } = useUserRelevantActsCount(task.id);
  const { state } = useAuthContext();
  const { selectedtDate } = useDayContext();

  const onFPPress = () => {
    navigation.navigate("WorkoutDoneScreen", {
      taskId: task.id,
      attemptedDate: selectedtDate,
    });
  };

  const setWorkoutFinish = useNavStore(
    (state) => state.setWorkoutFinishNav,
    shallow
  );

  const taskPressHandle = () => {
    if (taskStatus === "done" && selectedActivity) {
      onFPPress();
    } else if (taskStatus === "proPlus") {
      weEventTrack("click_proPlus", {});
      navigation.navigate("ProScreen", {
        planType: task.taskType === "live" ? "proPlus" : "pro",
      });
    } else if (taskStatus === "pro") {
      weEventTrack("click_pro", {});
      navigation.navigate("ProScreen", {
        planType: task.taskType === "live" ? "proPlus" : "pro",
      });
    } else if (
      taskStatus === "live" &&
      task.avatar &&
      task.avatar.resource_type === "video"
    ) {
      navigation.navigate("CourseTaskPreviewScreen", {
        taskId: task.id,
        attemptedDate: selectedtDate,
      });
      setWorkoutFinish("WorkoutDoneScreen");
    } else if (taskStatus === "live" && task?.liveLink && task.liveOn) {
      if (task.liveOn + 90 * 60 * 1000 < Date.now()) {
        setModalText(
          "We will soon add the recording for the session. Please check soon"
        );
      } else if (task.liveOn - 15 * 60 * 1000 > Date.now()) {
        // Linking.openURL(`${task.liveLink}`);
        setModalText(
          `This session will begin at ${format(task.liveOn, "MMM dd, hh:mma")}`
        );
      } else {
        Linking.openURL(`${task.liveLink}`);
      }
    } else if (taskStatus === "play" || taskStatus === "pending") {
      if (task?.taskType === "steps" || task?.taskType === "path") {
        navigation.navigate("MapTaskDetailScreen", {
          gameId: state.gameId ? state.gameId : "",
          taskId: task.id,
          attemptedDate: selectedtDate,
        });
      } else if (task?.id) {
        navigation.navigate("CourseTaskPreviewScreen", {
          taskId: task.id,
          attemptedDate: selectedtDate,
        });

        setWorkoutFinish("WorkoutDoneScreen");
      }
    } else if (taskStatus === "expired") {
      setModalText(
        `This live task is expired. Go to the today's date to see your latest plan.`
      );
    }

    weEventTrack("workoutPreview_clickStartWorkout", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

  const taskStatusText = (taskStatus: statusTypes, task: Task): string => {
    if (taskStatus === "pending") {
      return "AI Working";
    } else if (taskStatus === "done") {
      return "Done";
    }
    // else if (task?.taskType === "live" && task?.liveOn) {
    //   return `Live on ${format(task.liveOn, "h:MMa")}`;
    // }
    else {
      return "";
    }
  };

  return (
    <>
      {taskStatus ? (
        <>
          <Pressable
            onPress={taskPressHandle}
            style={{ width, height }}
            className="mx-auto"
          >
            <MyPlanCardV2
              taskId={task.id}
              status={taskStatus}
              onFPPress={onFPPress}
              cardImg={task?.thumbnails}
              imgHeight={imgHeight}
              title={task?.name}
              description={task?.description}
              achivedFitPoints={earnedFP}
              fitPoints={task?.fitPoints ? task.fitPoints : 0}
              steps={task?.stepsToDo}
              time={task?.durationMinutes ? task?.durationMinutes : 0}
              level={task?.difficultyLevels}
              previewMedia={task?.previewMedia}
              unlockIn={unlocksIn}
              liveText={task && taskStatusText(taskStatus, task)}
              liveTime={
                task.liveOn ? `Live on ${format(task.liveOn, "h:mma")}` : ""
              }
              onInfoPress={taskPressHandle}
              expiredIn={expiresIn} //"14H 24M" // to show expired in
              progress={selectedActivity?.progress}
              noOfAttempts={userRelevantActsCount}
            />
          </Pressable>
          {modalText ? (
            <PendingModal
              isOpen={modalText ? true : false}
              onCloseModal={() => setModalText(undefined)}
              text={modalText}
            />
          ) : null}
        </>
      ) : (
        <View
          style={{ width, height }}
          className="mx-auto rounded-3xl overflow-hidden flex justify-center items-center bg-[#100F1A]"
        >
          <Loading width="w-12" height="h-12" />
        </View>
      )}
    </>
  );
};

export default TaskCardV3;
