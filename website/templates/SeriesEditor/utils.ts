import { seriesEditorKeys } from "./SeriesSelector";

export const getNextSeriesRoute = (
  key: seriesEditorKeys
): { nextRoute: seriesEditorKeys } => {
  return key === "name"
    ? {
        nextRoute: "description",
      }
    : key === "description"
    ? {
        nextRoute: "seriesThumbnail",
      }
    : key === "seriesThumbnail"
    ? {
        nextRoute: "workoutGoal",
      }
    : key === "workoutGoal"
    ? {
        nextRoute: "equipmentNeeded",
      }
    : key === "equipmentNeeded"
    ? {
        nextRoute: "goodFor",
      }
    : key === "goodFor"
    ? {
        nextRoute: "seriesKey",
      }
    : key === "seriesKey"
    ? {
        nextRoute: "cost",
      }
    : key === "cost"
    ? {
        nextRoute: "home",
      }
    : { nextRoute: "home" };
};
