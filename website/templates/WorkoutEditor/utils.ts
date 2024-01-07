import { liveEditorKeys } from "./LiveEditorHolder";
import { nutritionEditorKeys } from "./NutritionEditorHolder";
import { workoutEditorKeys } from "./WorkoutEditorHolder";

export const getNextWorkoutRoute = (
  key: workoutEditorKeys
): { nextRoute: workoutEditorKeys } => {
  return key === "name"
    ? {
        nextRoute: "description",
      }
    : key === "description"
    ? {
        nextRoute: "media",
      }
    : key === "media"
    ? {
        nextRoute: "isFree",
      }
    : key === "isFree"
    ? {
        nextRoute: "calories",
      }
    : key === "calories"
    ? {
        nextRoute: "videoKey",
      }
    : key === "videoKey"
    ? {
        nextRoute: "equipmentNeeded",
      }
    : key === "equipmentNeeded"
    ? {
        nextRoute: "day",
      }
    : key === "day"
    ? {
        nextRoute: "name",
      }
    : { nextRoute: "name" };
};

export const getNextNutritionRoute = (
  key: nutritionEditorKeys
): { nextRoute: nutritionEditorKeys } => {
  return key === "name"
    ? {
        nextRoute: "description",
      }
    : key === "description"
    ? {
        nextRoute: "media",
      }
    : key === "media"
    ? {
        nextRoute: "isFree",
      }
    : key === "isFree"
    ? {
        nextRoute: "calories",
      }
    : key === "calories"
    ? {
        nextRoute: "planKey",
      }
    : key === "planKey"
    ? {
        nextRoute: "ingredients",
      }
    : key === "ingredients"
    ? {
        nextRoute: "day",
      }
    : key === "day"
    ? {
        nextRoute: "name",
      }
    : { nextRoute: "name" };
};

export const getNextLiveRoute = (
  key: liveEditorKeys
): { nextRoute: liveEditorKeys } => {
  return key === "name"
    ? {
        nextRoute: "description",
      }
    : key === "description"
    ? {
        nextRoute: "media",
      }
    : key === "media"
    ? {
        nextRoute: "isFree",
      }
    : key === "isFree"
    ? {
        nextRoute: "calories",
      }
    : key === "calories"
    ? {
        nextRoute: "liveKey",
      }
    : key === "liveKey"
    ? {
        nextRoute: "link",
      }
    : key === "link"
    ? // ? {
      //     nextRoute: "days",
      //   }
      // : key === "days"
      {
        nextRoute: "duration",
      }
    : key === "duration"
    ? {
        nextRoute: "slots",
      }
    : key === "slots"
    ? {
        nextRoute: "days",
      }
    : key === "days"
    ? {
        nextRoute: "name",
      }
    : { nextRoute: "name" };
};
