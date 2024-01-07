// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import RunningMain from "@modules/Running";
import { TaskPreviewParamsTypes } from "@screens/Workout/TaskPreviewScreen";
import { useRoute } from "@react-navigation/native";
// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import { TaskProvider } from "@providers/task/TaskProvider";
import { LocationProvider } from "@providers/location/LocationProvider";
import LocationPermissionWrapper from "@modules/Running/LocationPermissionWrapper/LocationPermissionWrapper";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";

const MapTaskRunningScreen = () => {
  // const { state, todayUnix } = useAuthContext();
  useScreenTrack();
  const route = useRoute();

  const { taskId, attemptedDate } = route.params as TaskPreviewParamsTypes;

  const { task } = useWorkoutTask(taskId);
  // console.log("Hi I am here");

  return (
    <>
      {/* <Header
          back={true}
          headerColor={"#13121E"}
          tone="dark"
          headerType="solid"
          //   setHeaderHeight={setHeaderHeight}
        /> */}

      {/* <TaskProvider selectedUnix={todayUnix} selectedTaskId={taskId}> */}
      <LocationProvider>
        <LocationPermissionWrapper>
          <RunningMain task={task} attemptedDate={attemptedDate} />
        </LocationPermissionWrapper>
      </LocationProvider>
      {/* </TaskProvider> */}
    </>
  );
};

export default MapTaskRunningScreen;
