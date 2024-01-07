import { View, ScrollView, Linking } from "react-native";
import TaskMedia from "@modules/Workout/ProgramDetails/TaskPreview/TaskMedia";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
// import { useTaskContext } from "@providers/task/TaskProvider";
import { socialmediaLinks } from "@constants/links";
import { useNavigation } from "@react-navigation/native";
import Header from "@modules/Header";
// import { useAuthContext } from "@providers/auth/AuthProvider";

import { useActivityContext } from "@providers/activity/ActivityProvider";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { wasTaskDoneToday } from "./utils";
// import { addTaskOnDay } from "@modules/SwapMain/utils";
// import { format } from "date-fns";
interface Props {
  attemptedDate: string;
}

const WorkoutExpanderMain: React.FC<Props> = ({ attemptedDate }) => {
  const navigation = useNavigation();
  const { state } = useAuthContext();

  const { activity } = useActivityContext();
  const { task } = useWorkoutTask(activity?.taskId);

  // const tdStatus = wasTaskDoneToday(todayUnix, activity?.createdOn);

  // const { task, earnedFP, selectedActivity, selectedDayNumber } =
  //   useTaskContext();

  const onWA = () => Linking.openURL(socialmediaLinks.contact);

  const onRetry = async () => {
    // if (
    //   task?.taskType === "nutrition" &&
    //   typeof activity?.taskDay === "number"
    // ) {
    //   navigation.navigate("NutriCameraScreen", {
    //     gameId: state.gameId,
    //     taskId: task ? task.id : "",

    //     badgeId: task?.badgeId ? task.badgeId : "",
    //   });
    // } else
    // if (tdStatus) {
    if (task?.taskType === "path") {
      navigation.navigate("MapTaskDetailScreen", {
        gameId: state.gameId,
        taskId: task ? task.id : "",
        attemptedDate,
      });
    } else {
      navigation.navigate("CourseTaskPreviewScreen", {
        taskId: task ? task.id : "",
        attemptedDate,
      });
    }
    // } else if (state.uid && task?.id) {
    //   // add to today task

    //   const dt = format(new Date(), "yyyy-MM-dd");

    //   await addTaskOnDay(
    //     state.uid,
    //     dt,
    //     task?.taskType === "nutrition" ? task.taskType : "workout",
    //     task?.id
    //   );

    //   navigation.goBack();
    // }
  };

  const review = activity?.activeMessage;
  const earnedFP = activity?.calories
    ? Math.round(activity?.calories / 300)
    : 0;

  return (
    <View style={{ flex: 1 }} className="bg-[#100F1A]">
      <Header
        back={true}
        headerColor="#100F1A"
        headerType="transparent"
        tone="dark"
      />
      {task ? (
        <ScrollView bounces={false}>
          <View className="relative">
            <TaskMedia
              taskName={task?.name}
              media={task?.thumbnails ? task.thumbnails : task.videoThumbnail}
              uid={task?.userId}
              earnedFP={earnedFP}
              fitPoints={task?.fitPoints}
              level={task?.level}
              taskDuration={task?.durationMinutes ? task?.durationMinutes : 0}
              hideAuthor={true}
              hideKPIs={true}
              isFeedBack={true}
              heightStyle="min-h-[8rem] "
              feedback={review?.text}
              progressFP={activity?.fpProgress}
            />
          </View>
          {/* {showMedia ? null : null} */}
        </ScrollView>
      ) : null}
      <View className="">
        <StartButton
          title="Talk to Health Coach"
          textColor="text-white"
          bgColor="bg-[#13121E] border border-white m-4 p-3"
          roundedStr="rounded-full"
          textStyle="text-lg iphoneX:text-xl text-center"
          onPress={onWA}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
      <StartButton
        title={"Redo the task"}
        textColor="text-white"
        textStyle="text-lg iphoneX:text-xl text-center"
        bgColor="bg-[#1CA2FF] mx-4 mb-4 p-3"
        roundedStr="rounded-full"
        onPress={onRetry}
        fontFamily="BaiJamjuree-Bold"
      />
    </View>
  );
};

export default WorkoutExpanderMain;
