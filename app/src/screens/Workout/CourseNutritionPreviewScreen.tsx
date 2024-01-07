import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CourseNutritionPreview from "@modules/Workout/ProgramDetails/CourseNutritionPreview";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
import { TaskProvider } from "@providers/task/TaskProvider";
import { useRoute } from "@react-navigation/native";

export interface CourseNutritionPreviewScreenTypes {
  taskId: string;

  badgeId: string;
}

const CourseNutritionPreviewScreen = () => {
  const { state, todayUnix } = useAuthContext();
  const route = useRoute();
  const { taskId, badgeId } = route.params as CourseNutritionPreviewScreenTypes;

  useForcePortrait();
  // useUnlockAsync();
  useScreenTrack();

  return (
    <GameProvider selectedGameId={state.gameId}>
      <BadgeProgressProvider badgeId={badgeId}>
        <TaskProvider selectedUnix={todayUnix} selectedTaskId={taskId}>
          {/* <SubscriptionProvider> */}
          <CourseNutritionPreview />
          {/* </SubscriptionProvider> */}
        </TaskProvider>
      </BadgeProgressProvider>
    </GameProvider>
  );
};

export default CourseNutritionPreviewScreen;
