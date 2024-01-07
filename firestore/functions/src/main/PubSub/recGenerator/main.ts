import { getAllUsersToRecommend } from "../../../models/User/Methods";
import { allDays, Day, defaultDays } from "../../../models/User/User";
import {
  getRecommendationConfig,
  getStartTime,
} from "../../Https/taskGenerator/constants";
import { mainTaskGeneratorV3 } from "../../Https/taskGenerator/taskGeneratorV2";
import { getFormattedDateForUnix } from "../activityTracker/utils";

export const getWorkoutDays = (type: "workout" | "nutrition", days?: Day[]) => {
  if (type === "nutrition") {
    return allDays;
  }

  if (days) {
    return days;
  }

  return defaultDays;
};

export const generatorTrigger = async () => {
  // const now = Date.now();
  const usersToGenerate = await getAllUsersToRecommend(0);

  // console.log("u", usersToGenerate.length);
  // 7 day generator
  for (const user of usersToGenerate) {
    const config = getRecommendationConfig(user);
    const stTime = getStartTime(user, user.badgeId, "workout");

    console.log(
      user.name,
      user.badgeId ? "Workout" : "",
      stTime ? getFormattedDateForUnix(stTime) : null,
      user.nutritionBadgeId ? "Diet" : "",
      user.recommendationConfig?.nutritionStart
        ? getFormattedDateForUnix(user.recommendationConfig?.nutritionStart)
        : null,
    );

    if (user.badgeId && stTime) {
      await mainTaskGeneratorV3(
        user,
        getWorkoutDays("workout", config?.workoutDays),
        config?.primaryWorkoutCoach ? config.primaryWorkoutCoach : "",
        stTime,
        user.badgeId,
        3,
        "workout",
        false,
        false,
      );
    }

    console.log("");
    console.log("");

    if (user.nutritionBadgeId && config?.nutritionStart) {
      await mainTaskGeneratorV3(
        user,
        getWorkoutDays("nutrition", config.workoutDays),
        "",
        // false,
        config?.nutritionStart,
        user.nutritionBadgeId,
        3,
        "nutrition",
        false,
        false,
      );
    }
  }
};
