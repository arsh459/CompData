import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CodeScanner from "@modules/Workout/ProgramDetails/CodeScanner";

// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
import { PlainTaskProvider } from "@providers/task/PlainTaskProvider";

import { useRoute } from "@react-navigation/native";

export interface CastScreenParams {
  // badgeId: string;
  taskId: string;
  attemptedDate: string;
  // activityId: string;
  // selectedDayNumber: number;
}

const CastScreen = () => {
  const route = useRoute();
  const params = route.params as CastScreenParams;
  useScreenTrack();

  return (
    // <SubscriptionProvider>
    <PlainTaskProvider
      selectedTaskId={params.taskId}

      // selectedDayNumber={params.selectedDayNumber}
    >
      <CodeScanner attemptedDate={params.attemptedDate} />
    </PlainTaskProvider>
    // </SubscriptionProvider>
  );
};

export default CastScreen;
