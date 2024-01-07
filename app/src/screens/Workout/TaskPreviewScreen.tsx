import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import TaskPreview from "@modules/Workout/ProgramDetails/TaskPreview";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { TaskProvider } from "@providers/task/TaskProvider";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";
// import { View } from "react-native";

export interface TaskPreviewParamsTypes {
  gameId: string;
  taskId: string;
  attemptedDate: string;
  // selectedDayNumber: number;

  // selectedDayUnix: number;
  currentStatus?: subscriptionStatus;
}

const TaskPreviewScreen = () => {
  const route = useRoute();
  const { gameId, taskId } = route.params as TaskPreviewParamsTypes;

  useForcePortrait();
  // useUnlockAsync();
  useScreenTrack();
  const { todayUnix } = useAuthContext();

  // return <View />;

  return (
    <GameProvider selectedGameId={gameId}>
      {/* <UserProvider> */}
      {/* <TeamProvider selectedTeamId={teamId}> */}

      <TaskProvider
        selectedUnix={todayUnix}
        // selectedDayUnix={selectedDayUnix}
        // selectedDayNumber={selectedDayNumber}
        selectedTaskId={taskId}
      >
        <TaskPreview />
      </TaskProvider>

      {/* </TeamProvider> */}
      {/* </UserProvider> */}
    </GameProvider>
  );
};
export default TaskPreviewScreen;
