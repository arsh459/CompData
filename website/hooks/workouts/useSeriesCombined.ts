import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { Workout } from "@models/Workouts/Workout";
import { useEffect, useState } from "react";
import { useSeriesLives } from "./useSeriesLives";
import { useSeriesNutritionPlans } from "./useSeriesNutritionPlans";
import { useSeriesWorkouts } from "./useSeriesWorkouts";

export const useSeriesCombined = (seriesId: string) => {
  const { workouts } = useSeriesWorkouts(seriesId);
  const { nutritionPlans } = useSeriesNutritionPlans(seriesId);
  const { lives } = useSeriesLives(seriesId);

  const [listItems, setListItems] = useState<
    (Workout | NutritionPlan | LiveClass)[]
  >([]);

  useEffect(() => {
    const a = [...workouts, ...nutritionPlans, ...lives];
    a.sort((x, y) =>
      typeof x.day === "number" && typeof y.day === "number" ? x.day - y.day : 0
    );
    setListItems(a);
  }, [workouts, nutritionPlans, lives]);

  return {
    listItems,
  };
};
