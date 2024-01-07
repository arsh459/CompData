import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
// import RunFor from "@modules/Running/RunningStats/RunFor";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TaskPreviewParamsTypes } from "@screens/Workout/TaskPreviewScreen";
// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import { TaskProvider } from "@providers/task/TaskProvider";
import RunFor from "@modules/Running/RunningStats/RunFor";
import { SafeAreaView } from "react-native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
// import { bottomRunnigStaticImage, staticMap } from "@constants/imageKitURL";

const MapTaskDetailScreen = () => {
  const { state } = useAuthContext();

  const route = useRoute();
  const { taskId, attemptedDate } = route.params as TaskPreviewParamsTypes;

  const navigation = useNavigation();
  useScreenTrack();

  const { task } = useWorkoutTask(taskId);

  const onGetStarted = () => {
    navigation.navigate("MapTaskRunningScreen", {
      taskId,
      gameId: state.gameId,
      attemptedDate,
    });
  };

  return (
    <GameProvider selectedGameId={state.gameId}>
      <>
        <Header
          back={true}
          headerColor={"#13121E"}
          tone="dark"
          headerType="transparent"
          //   setHeaderHeight={setHeaderHeight}
        />
        {/* <BadgeProgressProvider badgeId={badgeId}> */}
        {/* <TaskProvider selectedUnix={todayUnix} selectedTaskId={taskId}> */}
        <SafeAreaView className="flex-1 bg-[#100F1A]">
          {/* <View
                className="absolute left-0 right-0 top-0 "
                style={{ aspectRatio: 0.7 }}
              >
                <Image
                  source={{ uri: staticMap }}
                  className="w-full aspect-[375/408] "
                />
              </View> */}
          {/* <View className="flex-1 " /> */}
          <RunFor task={task} onGetStarted={onGetStarted} />
          {/* <View className="px-4  py-12 iphoneX:pb-2 ">
                <Image
                  source={{ uri: bottomRunnigStaticImage }}
                  resizeMode="contain"
                  className="w-full h-32 "
                />
              </View> */}
        </SafeAreaView>
        {/* </TaskProvider> */}
        {/* </BadgeProgressProvider> */}
      </>
    </GameProvider>
  );
};

export default MapTaskDetailScreen;
