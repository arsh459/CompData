import { usePlanSeen } from "@hooks/popup/usePlanSeen";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import NutritionMain from "@modules/Nutrition";
import { OnboardProvider } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useRoute } from "@react-navigation/native";
import { shallow } from "zustand/shallow";

export interface NutritionParams {
  badgeId?: string;
  selectedUnix?: number;
}
const NutritionScreen = () => {
  const route = useRoute();
  const params = route.params as NutritionParams;

  useScreenTrack();
  usePlanSeen();

  const { nutritionBadgeId } = useUserStore(
    (state) => ({
      nutritionBadgeId: state.user?.nutritionBadgeId,
    }),
    shallow
  );

  const selectedBadgeId = params.badgeId
    ? params.badgeId
    : nutritionBadgeId
    ? nutritionBadgeId
    : "";

  return (
    <SingleBadgeProvider badgeId={selectedBadgeId}>
      <OnboardProvider>
        <NutritionMain />
      </OnboardProvider>
    </SingleBadgeProvider>
  );
};
export default NutritionScreen;
