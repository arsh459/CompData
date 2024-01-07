import {
  getUsersAssignedDietBadge,
  getUsersAssignedWorkoutBadge,
} from "../../../models/User/Methods";
import * as functions from "firebase-functions";
import {
  getRecommendationConfig,
  getStartTime,
} from "../../Https/taskGenerator/constants";
import { mainTaskGeneratorV3 } from "../../Https/taskGenerator/taskGeneratorV2";
import { getWorkoutDays } from "../../PubSub/recGenerator/main";
import { getDaysToUse } from "../../Https/taskGenerator/getDaysToUse";

export const badgeUpdateMainFunc = async (
  badgeId: string,
  recreate: boolean,
) => {
  const workoutUsers = await getUsersAssignedWorkoutBadge(badgeId);
  const dietUsers = await getUsersAssignedDietBadge(badgeId);

  console.log("workoutUsers", workoutUsers.length);
  console.log("dietUsers", dietUsers.length);

  for (const workoutUser of workoutUsers) {
    console.log("workoutUser", workoutUser.name);
    const config = getRecommendationConfig(workoutUser);
    const stTime = getStartTime(workoutUser, badgeId, "workout");

    if (workoutUser.badgeId && config?.workoutDays && stTime) {
      const daysToUse = getDaysToUse(stTime, 15, recreate);

      await mainTaskGeneratorV3(
        workoutUser,
        getWorkoutDays("workout", config.workoutDays),
        config.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
        // true,
        stTime,
        workoutUser.badgeId,
        daysToUse,
        "workout",
        recreate,
        // false,
      );

      functions.logger.log("Done For", workoutUser.name);
    }
  }

  functions.logger.log("UPDATING WORKOUT PLANS", workoutUsers.length);

  for (const dietUser of dietUsers) {
    console.log("DietUser", dietUser.name);
    const config = getRecommendationConfig(dietUser);

    const stTime = getStartTime(
      dietUser,
      dietUser.nutritionBadgeId,
      "nutrition",
    );

    console.log("stTime", stTime);

    if (dietUser.nutritionBadgeId && config?.nutritionStart && stTime) {
      const daysToUse = getDaysToUse(stTime, 15, recreate);

      await mainTaskGeneratorV3(
        dietUser,
        getWorkoutDays("nutrition", config.workoutDays),
        config.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
        // true,
        stTime,
        dietUser.nutritionBadgeId,
        daysToUse,
        "nutrition",
        recreate,
        // false,
      );

      functions.logger.log("Done For", dietUser.name);
    }
  }
};
