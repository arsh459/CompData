import { getSEOImg, getWidthHeight } from "@layouts/SEO/getSEOImg";
import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
// import { EventInterface } from "@models/Event/Event";
// import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";

export const useExerciseSEOData = (
  series: Workout | NutritionPlan | LiveClass | null
) => {
  return {
    title: series?.name ? series.name : "Workout series",
    desc: series?.description
      ? series.description.slice(0, 140)
      : "Workout series by creator for you to achieve your goals",
    img: series?.media ? getSEOImg([series?.media]) : "",
    ...getWidthHeight(series?.media ? series?.media : undefined),
  };
};
