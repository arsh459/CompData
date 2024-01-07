import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { NutritionConsumption } from "@models/User/User";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { selectedViewRangeType } from "..";
import { getAllTargetNutritionValues, getWeekDateArray } from "../utils/data";

const initialValues = {
  fats: 0,
  protein: 0,
  carbs: 0,
  kcal: 0,
  fiber: 0,
};

const useConsumptionNutrition = (selectedViewRange: selectedViewRangeType) => {
  const [consumedNutrition, setConsumedNutrition] =
    useState<NutritionConsumption>();
  const [targetNutrition, setTargetNutrition] =
    useState<NutritionConsumption>();
  const { badgeId, badge } = useSignleBadgeContext();
  const { activeDate, todayDate } = useDietCalendar(
    (state) => ({
      activeDate: state.active?.currentDate,
      todayDate: state.today?.currentDate,
    }),
    shallow
  );
  const { dayNumber, dayRecommendations } = useUserStore((state) => {
    return {
      dayRecommendations: state.recCache,
      dayNumber:
        state.recCache && state.recCache[`${badgeId}-${activeDate}`]
          ? state.recCache[`${badgeId}-${activeDate}`].day
          : undefined,
    };
  }, shallow);

  useEffect(() => {
    if (selectedViewRange && dayRecommendations && badge) {
      if (selectedViewRange === "Day") {
        if (dayNumber !== undefined && activeDate) {
          console.log(
            dayRecommendations[`${badgeId}-${activeDate}`].consumedNutrition
          );
          setConsumedNutrition(
            dayRecommendations[`${badgeId}-${activeDate}`].consumedNutrition
              ? dayRecommendations[`${badgeId}-${activeDate}`].consumedNutrition
              : initialValues
          );
          const targetNutrition = getAllTargetNutritionValues(
            selectedViewRange,
            badge,
            dayNumber
          );
          setTargetNutrition(targetNutrition);
        } else {
          setConsumedNutrition(initialValues);
          setTargetNutrition(initialValues);
        }
      }
      if (selectedViewRange === "Week") {
        if (todayDate) {
          const { weekDateArray } = getWeekDateArray();
          let nutritionData: NutritionConsumption = {
            fats: 0,
            protein: 0,
            carbs: 0,
            kcal: 0,
            fiber: 0,
          };
          weekDateArray.forEach((date) => {
            nutritionData.carbs =
              (nutritionData.carbs || 0) +
              ((dayRecommendations[`${badgeId}-${date}`] &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition
                  ?.carbs) ||
                0);

            nutritionData.protein =
              (nutritionData.protein || 0) +
              ((dayRecommendations[`${badgeId}-${date}`] &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition
                  ?.protein) ||
                0);

            nutritionData.fats =
              (nutritionData.fats || 0) +
              ((dayRecommendations[`${badgeId}-${date}`] &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition
                  ?.fats) ||
                0);

            nutritionData.fiber =
              (nutritionData.fiber || 0) +
              ((dayRecommendations[`${badgeId}-${date}`] &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition
                  ?.fiber) ||
                0);

            nutritionData.kcal =
              (nutritionData.kcal || 0) +
              ((dayRecommendations[`${badgeId}-${date}`] &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition &&
                dayRecommendations[`${badgeId}-${date}`].consumedNutrition
                  ?.kcal) ||
                0);
          });

          setConsumedNutrition(nutritionData);
          const targetNutrition = getAllTargetNutritionValues(
            selectedViewRange,
            badge
          );
          setTargetNutrition(targetNutrition);
        }
      }
    } else {
      setConsumedNutrition(initialValues);
      setTargetNutrition(initialValues);
    }
  }, [
    selectedViewRange,
    dayNumber,
    dayRecommendations,
    activeDate,
    todayDate,
    badge,
  ]);

  return { consumedNutrition, targetNutrition };
};

export default useConsumptionNutrition;
