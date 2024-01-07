import { Task } from "@models/Tasks/Task";
// import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
// import MyPlanCardV2 from "@modules/HomeScreen/MyPlan/V2/MyPlanCardV2";
import PendingModal from "@modules/Workout/ProgramHome/TaskCards/PendingModal";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import {
  // TaskStatusV2,
  useIsTaskAllowedV3,
} from "@providers/task/hooks/useIsTaskAllowedV3";
import { TaskProvider } from "@providers/task/TaskProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import { useState } from "react";
import { View, useWindowDimensions, Linking, Pressable } from "react-native";

const imgAspectRatio = 316 / 162;
const cardHeightToImage = 219 / 162;

interface Props {
  task: Task;
  selectedDayNumber: number;
}

const NutriCard: React.FC<Props> = ({ task, selectedDayNumber }) => {
  const { width } = useWindowDimensions();
  const { selectedGameId } = useGameContext();
  const { res } = useSubscriptionContext();
  const { badgeId } = useBadgeProgressContext();
  const { todayUnix } = useAuthContext();
  const [modalText, setModalText] = useState<string>();

  const navigation = useNavigation();
  const {
    taskStatus,
    // earnedFP,
    selectedActivity,
  } = useIsTaskAllowedV3(selectedDayNumber, task);
  const renderItemWidth = width - 32;
  const imgHeight = renderItemWidth / imgAspectRatio;
  const renderItemHeight = imgHeight * cardHeightToImage;

  const taskPressHandle = () => {
    if (taskStatus === "PENDING" || taskStatus === "IN_REVIEW") {
      setModalText(
        "AI still Scanning your Nutrition post please wait some time."
      );
    } else if (
      (taskStatus === "IMPROVEMENT" ||
        taskStatus === "COMPLETED" ||
        taskStatus === "COMPLETED_BEFORE") &&
      selectedActivity
    ) {
      // navigation.navigate("WorkoutHistoryExpanderScreen", {
      //   actId: selectedActivity?.id
      //     ? selectedActivity.id
      //     : selectedActivity?.postId,
      // });
    } else if (taskStatus !== "LOCKED") {
      if (!task?.freeTask && res.currentStatus === "EXPIRED") {
        weEventTrack("click_pro", {});
        navigation.navigate("ProScreen", { planType: "pro" });
      } else if (task?.freeTask || res.currentStatus === "SUBSCRIBED") {
        if (task?.taskType === "nutrition" && selectedGameId) {
          navigation.navigate("NutriCameraScreen", {
            taskId: task.id,
            gameId: selectedGameId,
            badgeId: badgeId,
          });
        } else if (
          task?.taskType === "live" &&
          task?.liveLink &&
          task?.liveOn
        ) {
          if (task.liveOn >= Date.now()) {
            Linking.openURL(`${task.liveLink}`);
          } else {
            setModalText(
              `This live task is expired on ${format(
                task.liveOn,
                "MMM dd, hh:MM"
              )} Hours`
            );
          }
        }
      }
    } else {
      setModalText("Complete a task in a previous level to unlock this");
    }

    weEventTrack("nutrition_clickStartNutrition", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask && res.currentStatus !== "SUBSCRIBED" ? 1 : 0,
    });
  };

  // const taskStatusTostatusTypes = (
  //   taskStatus: TaskStatusV2
  // ): statusTypes | undefined => {
  //   if (taskStatus === "LOCKED") {
  //     return "locked";
  //   } else if (taskStatus === "PENDING" || taskStatus === "IN_REVIEW") {
  //     return "pending";
  //   } else if (taskStatus === "COMPLETED" || taskStatus === "IMPROVEMENT") {
  //     return "done";
  //   } else if (task?.taskType === "live" || taskStatus === "LIVE") {
  //     return "live";
  //   } else if (
  //     (!task?.freeTask && res.currentStatus === "EXPIRED") ||
  //     taskStatus === "PRO"
  //   ) {
  //     return "pro";
  //   } else {
  //     return "play";
  //   }
  // };

  return (
    <TaskProvider selectedUnix={todayUnix} selectedTaskId={task.id}>
      <View className="relative z-0 mx-4 mt-4" key={task.id}>
        <Pressable
          style={{
            width: renderItemWidth,
            height: renderItemHeight,
          }}
          className="mx-auto"
          onPress={taskPressHandle}
          // disabled={taskStatus === "IMPROVEMENT" || taskStatus === "COMPLETED"}
        >
          {/* <MyPlanCardV2
            status={taskStatusTostatusTypes(taskStatus)}
            imgHeight={imgHeight}
            cardImg={task.thumbnails}
            title={task?.name}
            description={task?.description}
            achivedFitPoints={earnedFP}
            fitPoints={task?.fitPoints ? task.fitPoints : 0}
            level={task?.difficultyLevels}
            unlockIn="Currently locked"
            kCal={task.kcal}
            onInfoPress={() =>
              navigation.navigate("CourseNutritionPreviewScreen", {
                taskId: task ? task.id : "",
                badgeId: task?.badgeId ? task.badgeId : "",
              })
            }
          /> */}
        </Pressable>
        {modalText ? (
          <PendingModal
            isOpen={modalText ? true : false}
            onCloseModal={() => setModalText(undefined)}
            text={modalText}
          />
        ) : null}
      </View>
    </TaskProvider>
  );
};

export default NutriCard;
