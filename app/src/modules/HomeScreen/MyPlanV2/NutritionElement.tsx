import ElementCard from "./ElementCard";
import { nutriLogoNew } from "@constants/imageKitURL";
import { getLabelsForNutritionV2 } from "@hooks/program/utils";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { handleNutritionClick } from "./utils";
import { useBadge } from "@providers/badges/hooks/useBadge";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { getTargetNutritionValues } from "@modules/Nutrition/V2/NutritionMeters/utils";

export const defaultKCalTarget = 1900;

const NutritionElement = () => {
  const navigation = useNavigation();
  const { today } = useAuthContext();

  const {
    nutritionBadgeIdEnrolled,
    nutritionBadgeId,
    startTime,
    kcal,
    dayNumber,
  } = useUserStore((state) => {
    const val =
      state?.recCache[`${state.user?.nutritionBadgeId}-${today}`] &&
      state?.recCache[`${state.user?.nutritionBadgeId}-${today}`]
        ?.consumedNutrition &&
      state?.recCache[`${state.user?.nutritionBadgeId}-${today}`]
        ?.consumedNutrition?.kcal
        ? state?.recCache[`${state.user?.nutritionBadgeId}-${today}`]
            ?.consumedNutrition?.kcal
        : 0;

    return {
      kcal: val ? val : 0,
      nutritionBadgeIdEnrolled: state.user?.nutritionBadgeIdEnrolled,
      nutritionBadgeId: state.user?.nutritionBadgeId,
      startTime: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        state.user?.nutritionBadgeId,
        "nutrition",
        undefined,
        state.user?.recommendationConfig?.nutritionStart
      ),
      dayNumber:
        state.recCache &&
        state.recCache[`${state.user?.nutritionBadgeId}-${today}`]
          ? state.recCache[`${state.user?.nutritionBadgeId}-${today}`].day
          : undefined,
      // start: state.user?.recommendationConfig?.start,
      // nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      // badgeConfig: state.user?.recommendationConfig?.badgeConfig,
    };
  }, shallow);

  const { badge } = useBadge(TEAM_ALPHABET_GAME, nutritionBadgeId);

  useDayRec(today, "nutrition", nutritionBadgeId, true);

  // console.log("re", recomendation);

  const targets = getTargetNutritionValues(badge, dayNumber);

  const { title, subtitle, progress } = getLabelsForNutritionV2(
    kcal,
    targets?.kcal,
    startTime
  );

  // const { title, subtitle, progress } = getLabelsForNutrition(recomendation);

  const onNutritionPlanClick = () => {
    handleNutritionClick(
      navigation,
      nutritionBadgeIdEnrolled,
      nutritionBadgeId,
      startTime
    );
  };

  // console.log("progress", progress);

  return (
    <ElementCard
      colors={["#343150", "#343150"]}
      text={title}
      subText={subtitle}
      progress={progress}
      imgUrl={nutriLogoNew}
      onPress={onNutritionPlanClick}
      isLocked={false}
      activeColor="#FFC931"
      inActiveColor="#FFF62240"
      textColors={["#FFE458", "#FFB411"]}
    />
  );
};

export default NutritionElement;
