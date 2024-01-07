import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import WorkoutStart from "@modules/WorkoutStart";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useRoute } from "@react-navigation/native";

export interface WorkoutStartScreenParams {
  badgeId: string;
  goBack?: boolean;
  noModal: boolean;
}

const WorkoutStartScreen = () => {
  const route = useRoute();
  const params = route.params as WorkoutStartScreenParams;

  useScreenTrack();

  return (
    <SingleBadgeProvider badgeId={params.badgeId}>
      <Header back={true} headerColor="#232136" tone="dark" />
      <WorkoutStart goBack={params.goBack} noModal={params.noModal} />
    </SingleBadgeProvider>
  );
};

export default WorkoutStartScreen;
