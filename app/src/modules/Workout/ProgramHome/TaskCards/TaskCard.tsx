import MediaTile from "@components/MediaCard/MediaTile";
import { springIconWhite, timerIconWhite } from "@constants/imageKitURL";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
// import OverlayTasks from "./OverlayTasks";
import { useTaskContext } from "@providers/task/TaskProvider";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import TaskPoints from "./TaskPoints";
import ProTag from "./ProTag";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

export const columnWrapperSpacing = 8;

const TaskCard = () => {
  // const { game } = useGameContext();
  // const navigation = useNavigation();
  const { width: cardWidth } = useWindowDimensions();
  const { res, onShowModal } = useSubscriptionContext();

  const {
    task,
    taskStatus,
    // progress,
    // earnedFP,
    // unlocksNext,
    // userCheckedIn,
    // actAuthorUID,

    // selectedDayUnix,
  } = useTaskContext();
  // const { leader } = useLeaderboard(
  // actAuthorUID
  // );

  const taskPressHandle = () => {
    if (
      taskStatus !== "pending" // &&
      // taskStatus !== "FINALE_LOCKED" &&
      // taskStatus !== "FUTURE_LOCKED" &&
      // taskStatus !== "PAST_LOCKED" &&
      // taskStatus !== "RANK_LOCKED"
    ) {
      if (!task?.freeTask && res.currentStatus === "EXPIRED") {
        onShowModal();
      } else if (task?.freeTask || res.currentStatus === "SUBSCRIBED") {
        // navigation.navigate("TaskPreviewScreen", {
        //   gameId: game ? game.id : "",
        //   // teamId: team ? team.id : "",
        //   taskId: task ? task.id : "",
        //   // selectedDayUnix,
        // });
      }
    }
  };

  return (
    <Pressable
      className="flex p-2"
      onPress={taskPressHandle}
      style={{
        width: cardWidth / 2 - columnWrapperSpacing,
      }}
    >
      <View className="rounded-lg overflow-hidden flex-1">
        {task?.thumbnails ? (
          <View
            className="w-full relative z-0 bg-slate-400"
            style={{ height: cardWidth * 0.64 }}
          >
            <MediaTile
              media={task.thumbnails}
              fluid={true}
              fluidResizeMode="cover"
            />

            {/* <OverlayTasks
              unlocksNext={unlocksNext}
              taskLevel={task.level ? task.level : 0}
              userCheckedIn={userCheckedIn}
              taskFitPoints={task.fitPoints ? task.fitPoints : 0}
              // taskStatus={"IN_REVIEW"}
              taskStatus={taskStatus}
              earnedFP={earnedFP}
              // progress={0.5}
              progress={progress}
              unlocksAtRank={task.unlocksAtRank}
              frequency={task.taskFrequency}
              doneBy={leader?.name}
            /> */}

            {!task.freeTask && res.currentStatus !== "SUBSCRIBED" ? (
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
          <View className="flex-1 border-y-[1px] border-[#0F0E19]">
            <Text
              className=" flex-1 text-sm font-medium text-left text-white px-2 py-1"
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {task?.name}
            </Text>
          </View>
          <View className="flex flex-row justify-evenly py-0.5">
            <TaskPoints
              text={`${
                task?.durationMinutes ? task?.durationMinutes : "0"
              } min`}
              imageUrl={timerIconWhite}
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

export default TaskCard;
