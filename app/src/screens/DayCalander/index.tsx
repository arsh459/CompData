import { useRoute } from "@react-navigation/native";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { usePlanSeen } from "@hooks/popup/usePlanSeen";
import { DayProvider } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import DayCalanderMain from "@modules/DayCalanderMain";
import { dayRecommendationType } from "@models/User/User";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export interface DayCalanderParams {
  badgeId: string;
  type: dayRecommendationType;
  st?: number;
}

const DayCalander = () => {
  const route = useRoute();
  const params = route.params as DayCalanderParams;

  useScreenTrack();
  usePlanSeen();

  const { st } = useUserStore((state) => {
    return {
      // start: state.user?.recommendationConfig?.start,
      // nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      // badgeConfig: state.user?.recommendationConfig?.badgeConfig,
      st: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        params.badgeId,
        params.type,
        state.user?.recommendationConfig?.start,
        state.user?.recommendationConfig?.nutritionStart
      ),
    };
  }, shallow);

  // const st = getStartTime(
  //   start,
  //   nutritionStart,
  //   badgeConfig,
  //   params.badgeId,
  //   params.type
  // );

  return (
    <SingleBadgeProvider badgeId={params.badgeId}>
      <DayProvider startUnix={st}>
        <DayCalanderMain type={params.type} />
      </DayProvider>
    </SingleBadgeProvider>
  );
};

export default DayCalander;
