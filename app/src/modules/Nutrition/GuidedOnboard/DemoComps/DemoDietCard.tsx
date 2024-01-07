import NutriCardWithSwap from "@modules/Nutrition/Components/V2/NutriCardWithSwap";
import SwapCta from "@modules/Nutrition/Components/V2/SwapCta";
import { DayProvider } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { dietCardProps } from "@modules/Workout/GuidedOnboard/OnboardProvider/interface";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const DemoMyPlanCard: React.FC<dietCardProps & { state?: "swap" }> = ({
  task,
  dayRecommendationId,
  showWave,
  state,
}) => {
  const { badge } = useSignleBadgeContext();
  const { st } = useUserStore((state) => {
    return {
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      // badgeConfig:
      st: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        badge?.id,
        "nutrition",
        state.user?.recommendationConfig?.start,
        state.user?.recommendationConfig?.nutritionStart
      ),
    };
  }, shallow);

  return (
    <View className="relative z-0">
      <DayProvider startUnix={st}>
        <NutriCardWithSwap
          task={task}
          dayRecommendationId={dayRecommendationId}
          showWave={showWave}
        />
        <View
          className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136E5] rounded-2xl"
          style={{ opacity: state ? 1 : 0 }}
        />
        <View
          collapsable={false}
          className="absolute top-3 right-3"
          style={{ opacity: state ? 1 : 0 }}
        >
          <SwapCta />
        </View>
      </DayProvider>
    </View>
  );
};

export default DemoMyPlanCard;
