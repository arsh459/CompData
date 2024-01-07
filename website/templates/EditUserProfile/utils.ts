// import { liveEditorKeys } from "./LiveEditorHolder";
// import { nutritionEditorKeys } from "./NutritionEditorHolder";
// import { workoutEditorKeys } from "./WorkoutEditorHolder";

import { onboardUserSections } from "@templates/joinBoatTemplate/JoinBoatTemplate";
import { editUserProfileSections } from "./EditUserProfile";

export const getNextRouteForUserProfile = (
  key: editUserProfileSections | onboardUserSections,
  override?: editUserProfileSections | onboardUserSections
): { nextRoute: editUserProfileSections } => {
  return key === "name"
    ? {
        nextRoute: "instagramHandle",
      }
    : key === "instagramHandle"
    ? {
        nextRoute: "picture",
      }
    : key === "picture"
    ? {
        nextRoute: "gender",
      }
    : key === "gender"
    ? {
        nextRoute: "age",
      }
    : key === "age"
    ? {
        nextRoute: "height",
      }
    : key === "height"
    ? {
        nextRoute: "weight",
      }
    : key === "weight"
    ? {
        nextRoute: "bmi",
      }
    : key === "bmi"
    ? {
        nextRoute: "fitnessGoals",
      }
    : key === "fitnessGoals"
    ? {
        nextRoute: "fitnessGoalText",
      }
    : key === "fitnessGoalText"
    ? {
        nextRoute: "name",
      }
    : {
        nextRoute: "instagramHandle",
      };
};
