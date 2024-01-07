import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import WorkoutSetting from "@modules/WorkoutSetting";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useRoute } from "@react-navigation/native";

export interface WorkoutSettingScreenParams {
  badgeId: string;
}

const WorkoutSettingScreen = () => {
  const route = useRoute();
  const params = route.params as WorkoutSettingScreenParams;

  useScreenTrack();

  return (
    <SingleBadgeProvider badgeId={params.badgeId}>
      <Header back={true} headerColor="#232136" tone="dark" />
      <WorkoutSetting />
    </SingleBadgeProvider>
  );
};

export default WorkoutSettingScreen;
