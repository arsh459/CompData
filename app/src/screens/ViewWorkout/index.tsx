import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ViewWorkoutMain from "@modules/ViewWorkoutMain";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useRoute } from "@react-navigation/native";

export interface ViewWorkoutProps {
  badgeId: string;
}

const ViewWorkout = () => {
  const route = useRoute();
  const { badgeId } = route.params as ViewWorkoutProps;

  useScreenTrack();

  return (
    <SingleBadgeProvider badgeId={badgeId}>
      <ViewWorkoutMain />
    </SingleBadgeProvider>
  );
};

export default ViewWorkout;
