import WorkoutOnboardingMain from "@modules/WorkoutOnboardingMain";
import Header from "@modules/Header";
import { useRoute } from "@react-navigation/native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";

export interface WorkoutOnboardingScreenParams {
  badgeId: string;
  goBack?: boolean;
}

const WorkoutOnboardingScreen = () => {
  const route = useRoute();
  const params = route.params as WorkoutOnboardingScreenParams;

  useScreenTrack();

  return (
    <SingleBadgeProvider badgeId={params.badgeId}>
      <Header back={true} headerColor="#232136" tone="dark" />
      <WorkoutOnboardingMain goBack={params.goBack} />
    </SingleBadgeProvider>
  );
};

export default WorkoutOnboardingScreen;
