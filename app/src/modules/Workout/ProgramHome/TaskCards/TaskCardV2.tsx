import MediaTile from "@components/MediaCard/MediaTile";
import {
  springIconWhite,
  stepsIconWhite,
  timerIconWhite,
} from "@constants/imageKitURL";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
// import OverlayTasks from "./OverlayTasks";
import { useTaskContext } from "@providers/task/TaskProvider";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import TaskPoints from "./TaskPoints";
import ProTag from "./ProTag";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import OverlayTasksV2 from "./OverlayTasksV2";
import { useUserContext } from "@providers/user/UserProvider";
import StepsActiveKPI from "./StatusKPIs/StepsActiveKPI";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { TaskStatusV2 } from "@providers/task/hooks/useIsTaskAllowedV3";

interface Props {}

const TaskCardV2: React.FC<Props> = ({}) => {
  // const { game } = useGameContext();
  // const { team } = useTeamContext();
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { width: cardWidth } = useWindowDimensions();
  const { res } = useSubscriptionContext();

  const {
    task,
    taskStatus,
    progress,
    earnedFP,
    // numAttempts,
    // selectedDayNumber,
    // stepsActive,
  } = useTaskContext();
  const taskPressHandle = () => {
    if (
      taskStatus !== "pending" &&
      taskStatus !== "locked"
      // taskStatus !== "in_review"
      // &&
      //   taskStatus !== "PAST_LOCKED" &&
      //   taskStatus !== "RANK_LOCKED"
    ) {
      if (!task?.freeTask && res.currentStatus === "EXPIRED") {
        weEventTrack("click_pro", {});
        navigation.navigate("ProScreen", { planType: "pro" });
      } else if (task?.freeTask || res.currentStatus === "SUBSCRIBED") {
        if (task?.taskType === "steps") {
          // navigation.navigate("MapTaskDetailScreen", {
          //   gameId: game ? game.id : "",
          //   // teamId: team ? team.id : "",
          //   // taskId: task ? task.id : "",
          //   taskId: "30b79209-3cf8-44b4-89e0-e09d741988ed",
          //   // selectedDayUnix,
          // });
        } else if (task?.taskType === "path") {
          // navigation.navigate("MapTaskDetailScreen", {
          //   gameId: game ? game.id : "",
          //   taskId: task ? task.id : "",
          // });
        } else {
          // navigation.navigate("TaskPreviewScreen", {
          //   gameId: game ? game.id : "",
          //   // teamId: team ? team.id : "",
          //   taskId: task ? task.id : "",
          //   //   selectedDayUnix,
          // });
        }
      }

      // else

      // if (task?.proLabel && res.currentStatus !== "SUBSCRIBED") {
      //   onShowModal();
      // } else {
      //   navigation.navigate("TaskPreviewScreen", {
      //     gameId: game ? game.id : "",
      //     teamId: team ? team.id : "",
      //     taskId: task ? task.id : "",
      //     selectedDayNumber,
      //     selectedDayUnix,
      //   });
      // }
    }
    weEventTrack("workoutSelect_clickStartWorkout", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask && res.currentStatus !== "SUBSCRIBED" ? 1 : 0,
    });
  };

  return (
    <Pressable
      className="flex p-2"
      onPress={taskPressHandle}
      style={{
        width: cardWidth / 2.1,
      }}
    >
      <View className="rounded-lg overflow-hidden">
        {task?.thumbnails ? (
          <View
            className=" relative z-0 bg-slate-400"
            style={{ height: cardWidth * 0.64 }}
          >
            <MediaTile
              media={task.thumbnails}
              fluid={true}
              fluidResizeMode="cover"
            />

            {false ? (
              <>
                <StepsActiveKPI
                  progress={progress ? progress : 0}
                  earnedFP={earnedFP}
                  overlay={true}
                />
              </>
            ) : (
              <OverlayTasksV2
                //   unlocksNext={unlocksNext}
                taskLevel={0}
                //   userCheckedIn={userCheckedIn}
                taskFitPoints={task.fitPoints ? task.fitPoints : 0}
                taskStatus="UNLOCKED"
                numAttempts={0}
                // taskStatus={"UNLOCKED"}
                earnedFP={earnedFP}
                // numAttempts={0}
                // progress={0.5}
                progress={progress}
                //   unlocksAtRank={task.unlocksAtRank}
                //   frequency={task.taskFrequency}
                doneBy={user?.name}
              />
            )}

            {taskStatus === "pro" ||
            (!task.freeTask && res.currentStatus !== "SUBSCRIBED") ? (
              <ProTag />
            ) : null}
          </View>
        ) : (
          <View
            className="w-full bg-gray-100"
            style={{ height: cardWidth * 0.64 }}
          />
        )}
        <View className="bg-[#FFFFFF29] flex-1">
          <View className="border-y-[1px] border-[#0F0E19]">
            <Text
              className=" flex-1 text-sm font-medium text-left text-white px-2 py-1"
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {task?.name}
            </Text>
          </View>
          <View className="flex flex-row justify-evenly flex-1 py-0.5">
            <TaskPoints
              text={
                task?.stepsToDo
                  ? `${task.stepsToDo} steps`
                  : `${task?.durationMinutes ? task?.durationMinutes : "0"} min`
              }
              imageUrl={task?.stepsToDo ? stepsIconWhite : timerIconWhite}
            />
            <View className="w-px bg-[#0F0E19]" />
            <TaskPoints
              text={`${task?.fitPoints ? task.fitPoints : 0} FP`}
              imageUrl={springIconWhite}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCardV2;
