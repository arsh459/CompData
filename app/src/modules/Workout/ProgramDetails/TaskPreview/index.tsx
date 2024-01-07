import { View, Text, ScrollView } from "react-native";
import Autolink from "react-native-autolink";
import FitPointTable from "./FitPointTable";
import TaskMedia from "./TaskMedia";
import TaskProgress from "./TaskProgress";
import { useTaskContext } from "@providers/task/TaskProvider";
// import UploadTaskModal from "./UploadTaskModal";
// import { useState } from "react";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import OptionNode from "./OptionNode";
interface Props {
  currentStatus?: subscriptionStatus;
}
const TaskPreview: React.FC<Props> = ({ currentStatus }) => {
  const {
    task,
    taskStatus,
    progress,
    // unlocksNext,
    earnedFP,

    // selectedDayUnix,
  } = useTaskContext();

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const onClose = () => setIsOpen(false);
  // const onOpen = () => setIsOpen(true);

  const navigation = useNavigation();
  // const { state } = useAuthContext();
  // const { team } = useTeamContext();
  const onNav = () => {
    if (task?.avatar && task.avatar.resource_type === "video") {
      // navigation.navigate("UploadTask", {
      //   gameId: state ? state.gameId : "",
      //   // teamId: team ? team.id : "",
      //   taskId: task ? task.id : "",
      //   // selectedDayUnix,
      // });
    } else {
      navigation.navigate("Community");
    }
    weEventTrack("workoutPreview_clickStartWorkout", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask && currentStatus !== "SUBSCRIBED" ? 1 : 0,
    });
  };

  const canPost = taskStatus !== "expired" && taskStatus !== "locked"; // && taskStatus !== "IN_REVIEW";
  // taskStatus === "COMPLETED_TEAM_MEMBER" ||
  // taskStatus === "IMPROVEMENT_TEAM_MEMBER";
  const possiblePts = (task?.fitPoints ? task.fitPoints : 0) - earnedFP;

  const onBack = () => {
    navigation.goBack();
    weEventTrack("workoutPreview_goback", {});
  };

  return (
    <>
      <Header
        back={true}
        onBack={onBack}
        headerColor="#100F1A"
        tone="dark"
        headerType="overlay"
        // optionNode={canPost ? <OptionNode /> : null}
      />
      <View style={{ flex: 1 }} className="bg-[#100F1A]">
        <ScrollView bounces={false}>
          <TaskMedia
            taskName={task?.name}
            media={
              task?.videoThumbnail ? task?.videoThumbnail : task?.thumbnails
            }
            uid={task?.userId}
            fitPoints={task?.fitPoints}
            level={task?.level}
            taskDuration={task?.durationMinutes ? task?.durationMinutes : 0}
          />

          <View className="p-4">
            {task?.rules ? (
              <View className="bg-[#2B2A34]  rounded-lg mb-3 iphoneX:mb-5">
                <View className=" ">
                  <Text
                    className="text-xl iphoneX:text-[22px] font-bold text-white border-b-2 px-4 py-2 border-[#0F0E19]"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    Rules to remember
                  </Text>
                </View>
                <View className="h-0.5 bg-[#0F0E19]" />
                <View className="p-4">
                  <Autolink
                    text={task.rules}
                    renderText={(text) => (
                      <Text className="p-4 text-[10px]  iphoneX:text-xs prose break-words whitespace-pre-wrap text-white">
                        {text}
                      </Text>
                    )}
                    linkStyle={{ color: "blue" }}
                  />
                </View>
              </View>
            ) : null}

            {task ? (
              <View className=" bg-[#2B2A34] rounded-lg mb-3 iphoneX:mb-5">
                {taskStatus === "done" || taskStatus === "play" ? (
                  <>
                    <Text
                      className="text-xl iphoneX:text-[22px] font-bold text-white border-b-2 px-4 py-2 border-[#0F0E19]"
                      style={{ fontFamily: "BaiJamjuree-Bold" }}
                    >
                      Your Progress
                    </Text>
                    <View className="h-0.5 bg-[#0F0E19]" />
                  </>
                ) : null}
                <TaskProgress
                  canPost={canPost}
                  possiblePts={possiblePts}
                  // unlocksNext={unlocksNext}
                  taskStatus={taskStatus}
                  progress={progress}
                />
              </View>
            ) : null}

            {canPost ? (
              <>
                <FitPointTable task={task} />
                {/* <UploadTaskModal isOpen={isOpen} onClose={onClose} /> */}
              </>
            ) : null}
          </View>
        </ScrollView>

        {canPost ? (
          <StartButton
            title={
              task?.avatar?.resource_type === "video"
                ? "Start Workout"
                : "Post in Community"
            }
            bgColor="bg-[#fff]"
            textColor="text-[#100F1A] "
            roundedStr="rounded-md m-4"
            textStyle="py-2  text-center font-bold text-xl font-bold  rounded-md"
            onPress={onNav}
          />
        ) : null}
      </View>
    </>
  );
};

export default TaskPreview;
