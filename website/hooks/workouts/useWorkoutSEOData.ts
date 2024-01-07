import { getSEOImg, getWidthHeight } from "@layouts/SEO/getSEOImg";
// import { EventInterface } from "@models/Event/Event";
import { WorkoutSeries } from "@models/Workouts/Series";

export const useWorkoutSEOData = (series: WorkoutSeries | undefined) => {
  return {
    title: series?.name ? series.name : "Workout series",
    desc: series?.description
      ? series.description.slice(0, 140)
      : "Workout series by creator for you to achieve your goals",
    img: series?.thumbnail ? getSEOImg([series?.thumbnail]) : "",
    ...getWidthHeight(series?.thumbnail ? series?.thumbnail : undefined),
  };
};
