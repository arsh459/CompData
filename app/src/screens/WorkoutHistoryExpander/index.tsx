// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import WorkoutExpanderMain from "@modules/WorkoutExpanderMain";
import { useRoute } from "@react-navigation/native";
// import { TaskProvider } from "@providers/task/TaskProvider";
// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import { RouteKeys } from "@routes/MainStack";
import { ActivityProvider } from "@providers/activity/ActivityProvider";
export interface WorkoutHistoryExpanderScreenParamsTypes {
  actId: string;
  attemptedDate: string;
}
const WorkoutHistoryExpanderScreen = () => {
  // const { state } = useAuthContext();
  const route = useRoute();

  useScreenTrack();

  const { actId, attemptedDate } =
    route.params as WorkoutHistoryExpanderScreenParamsTypes;

  return (
    <ActivityProvider id={actId}>
      <WorkoutExpanderMain attemptedDate={attemptedDate} />
    </ActivityProvider>
  );

  // return (
  //   <GameProvider selectedGameId={state.gameId}>
  //     {/* <UserProvider> */}
  //     <BadgeProgressProvider badgeId={badgeId}>
  //       <TaskProvider
  //         // selectedDayUnix={selectedDayUnix}
  //         selectedDayNumber={selectedDay}
  //         selectedTaskId={taskId}
  //       >
  //         <WorkoutExpanderMain navTo={navTo} showMedia={showMedia} />
  //       </TaskProvider>
  //     </BadgeProgressProvider>
  //     {/* </UserProvider> */}
  //   </GameProvider>
  // );
};

export default WorkoutHistoryExpanderScreen;
