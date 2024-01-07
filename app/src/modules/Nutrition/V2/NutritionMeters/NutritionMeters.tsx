import { nutriLogoNew } from "@constants/imageKitURL";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { View } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import CalorieProgress from "../DaySelector/V3/CalorieProgress";
import IndividualMeters from "./IndividualMeters";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";

import {
  getKCalMeterColor,
  getKCalTextColor,
  getTargetNutritionValues,
} from "./utils";
// import { useNavigation } from "@react-navigation/native";

interface Props {
  // type: dayRecommendationType;
  // recomendation?: dayRecommendation;
}

const NutritionMeters: React.FC<Props> = ({}) => {
  const { activeDate } = useDietCalendar(
    (state) => ({
      activeDate: state.active?.currentDate,
    }),
    shallow
  );

  // adds to cache date
  const { badgeId, badge } = useSignleBadgeContext();

  const {
    kcal,
    dayNumber,
    dailyKCalTarget,
    dailyProteinTarget,
    dailyFatsTarget,
    dailyCarbTarget,
    dailyFiberTarget,
  } = useUserStore((state) => {
    const val =
      state?.recCache[`${badgeId}-${activeDate}`] &&
      state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition &&
      state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition?.kcal
        ? state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition?.kcal
        : 0;

    return {
      kcal: val ? val : 0,
      dailyFatsTarget: state.user?.dailyFatsTarget,
      dailyCarbTarget: state.user?.dailyCarbTarget,
      dailyProteinTarget: state.user?.dailyProteinTarget,
      dailyFiberTarget: state.user?.dailyFiberTarget,
      dailyKCalTarget: state.user?.dailyKCalTarget,
      dayNumber:
        state.recCache && state.recCache[`${badgeId}-${activeDate}`]
          ? state.recCache[`${badgeId}-${activeDate}`].day
          : undefined,
    };
  }, shallow);

  const targets = getTargetNutritionValues(badge, dayNumber) || {
    kcal: dailyKCalTarget || 0,
    protein: dailyProteinTarget || 0,
    fats: dailyFatsTarget || 0,
    carbs: dailyCarbTarget || 0,
    fiber: dailyFiberTarget || 0,
  };

  const kcalRound = Math.round(kcal);
  const targetRound = targets?.kcal ? Math.round(targets?.kcal) : 0;

  return (
    <View className="mt-4">
      <View className="px-6">
        <CalorieProgress
          colors={["transparent", "transparent"]}
          text={`${kcalRound}/${targetRound} Kcal`}
          subText={"Total Calories"}
          progress={
            kcal && targets?.kcal ? Number((kcal / targets.kcal).toFixed(2)) : 0
          }
          imgUrl={nutriLogoNew}
          onPress={() => {}}
          isLocked={false}
          activeColor={getKCalMeterColor(kcal, targets?.kcal)}
          inActiveColor="#FFF62240"
          textColors={getKCalTextColor(kcal, targets?.kcal)}
        />
      </View>
      <View className="pt-4 px-6">
        <IndividualMeters targets={targets} />
      </View>
    </View>
  );
};

export default NutritionMeters;
