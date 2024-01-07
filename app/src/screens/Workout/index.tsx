import WorkoutMain from "@modules/Workout";
import { useRoute } from "@react-navigation/native";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import { usePlanSeen } from "@hooks/popup/usePlanSeen";
import { OnboardProvider } from "../../modules/Workout/GuidedOnboard/OnboardProvider";
import { useUserStore } from "@providers/user/store/useUserStore";

export interface WorkoutParams {
  badgeId: string;
}

const Workout = () => {
  const route = useRoute();
  const params = route.params as WorkoutParams;

  useScreenTrack();
  useForcePortrait();
  usePlanSeen();

  const userBadgeId = useUserStore((state) => state.user?.badgeId);

  const badgeId = params.badgeId || userBadgeId || "";

  return (
    <SingleBadgeProvider badgeId={badgeId}>
      <OnboardProvider>
        <WorkoutMain />
      </OnboardProvider>
    </SingleBadgeProvider>
  );
};

export default Workout;
