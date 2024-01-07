import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
// import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CourseTaskPreview from "@modules/Workout/ProgramDetails/CourseTaskPreview";
import { useRoute } from "@react-navigation/native";

export interface CourseTaskPreviewScreenTypes {
  taskId: string;
  attemptedDate: string;
  // activityId: string;
}

const CourseTaskPreviewScreen = () => {
  const route = useRoute();
  const { taskId, attemptedDate } =
    route.params as CourseTaskPreviewScreenTypes;

  useForcePortrait();
  // useUnlockAsync();
  useScreenTrack();

  // useWorkoutTask(taskId);

  return (
    <CourseTaskPreview
      taskId={taskId}
      attemptedDate={attemptedDate}
      // activityId={activityId}
    />
  );
};
export default CourseTaskPreviewScreen;
