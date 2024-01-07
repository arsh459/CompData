import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
// import { useUnlockAsync } from "@hooks/orientation/useUnlockAsync";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import WorkoutDoneMain from "@modules/Workout/ProgramDetails/CourseTaskPreview/WorkoutDoneMain";
// import { ActivityProvider } from "@providers/activity/ActivityProvider";
import { PlainTaskProvider } from "@providers/task/PlainTaskProvider";
import { useRoute } from "@react-navigation/native";

export interface WorkoutDoneScreenTypes {
  // actId: string;
  taskId: string;
  attemptedDate: string;
}

const WorkoutDoneScreen = () => {
  const route = useRoute();
  const { taskId, attemptedDate } = route.params as WorkoutDoneScreenTypes;

  useScreenTrack();
  useForcePortrait();

  return (
    <PlainTaskProvider selectedTaskId={taskId}>
      {/* <ActivityProvider id={actId}> */}
      <WorkoutDoneMain taskId={taskId} attemptedDate={attemptedDate} />
      {/* </ActivityProvider> */}
    </PlainTaskProvider>
  );
};
export default WorkoutDoneScreen;
