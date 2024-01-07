import {
  Badge,
  badgeNutritionParams,
  WorkoutLevel,
} from "@models/Prizes/Prizes";
// import { selectedViewMoodTracker } from "@modules/JourneyLogHome/MoodTracker";
import {
  startOfWeek,
  add,
  getTime,
  startOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { format } from "date-fns";
import {
  // selectedNutriType,
  selectedViewRangeType,
} from "..";

export function getWeekData() {
  const today = Date.now();
  const currentDate = new Date(today);

  const startingDateOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });
  const startOfCurrentMonth = getTime(startOfDay(startOfMonth(currentDate)));
  const endOfCurrentMonth = getTime(startOfDay(endOfMonth(currentDate)));
  const todayUnix = getTime(startOfDay(currentDate));
  const weekStartUnix = getTime(
    startOfDay(add(startingDateOfCurrentWeek, { days: 0 }))
  );
  const weekEndUnix = getTime(
    startOfDay(add(startingDateOfCurrentWeek, { days: 6 }))
  );

  return {
    weekStartUnix: weekStartUnix,
    weekEndUnix: weekEndUnix,
    todayUnix: todayUnix,
    startOfCurrentMonth: startOfCurrentMonth,
    endOfCurrentMonth: endOfCurrentMonth,
  };
}

export function getWeekDateArray() {
  const today = Date.now();
  const currentDate = new Date(today);

  const startingDateOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });

  let weekDateArray: string[] = [];

  for (let i = 0; i < 7; i++) {
    weekDateArray.push(
      format(add(startingDateOfCurrentWeek, { days: i }), "yyyy-MM-dd")
    );
  }

  return {
    weekDateArray,
  };
}

export function getAllTargetNutritionValues(
  selectedViewRange: selectedViewRangeType,
  badge?: Badge,
  dayNumber?: number
) {
  let selectedWKLevel: WorkoutLevel[] | undefined;
  if (selectedViewRange === "Day" && dayNumber !== undefined) {
    selectedWKLevel = badge?.workoutLevels?.filter((item) => {
      return item.day === dayNumber;
    });
    if (selectedWKLevel?.length) {
      return selectedWKLevel[0].nutrition;
    }
  }
  if (selectedViewRange === "Week") {
    selectedWKLevel = badge?.workoutLevels;
    let nutritionObj: badgeNutritionParams = {
      protein: 0,
      carbs: 0,
      fiber: 0,
      kcal: 0,
      fats: 0,
    };
    if (selectedWKLevel?.length) {
      selectedWKLevel.forEach((item) => {
        nutritionObj.carbs =
          nutritionObj.carbs +
          (item.nutrition?.carbs ? item.nutrition.carbs : 0);
        nutritionObj.protein =
          nutritionObj.protein +
          (item.nutrition?.protein ? item.nutrition.protein : 0);
        nutritionObj.fats =
          nutritionObj.fats + (item.nutrition?.fats ? item.nutrition.fats : 0);
        nutritionObj.fiber =
          nutritionObj.fiber +
          (item.nutrition?.fiber ? item.nutrition.fiber : 0);
        nutritionObj.kcal =
          nutritionObj.kcal + (item.nutrition?.kcal ? item.nutrition.kcal : 0);
      });
    }
    return nutritionObj;
  }

  return undefined;
}
