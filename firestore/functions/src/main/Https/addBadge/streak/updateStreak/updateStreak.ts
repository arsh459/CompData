import { Achiever } from "../../../../../models/awards/interface";
import { getStreakProgress } from "./streakProgress";

export const updateStreak = async (
  uid: string,
  tz: string,
  achiever: Achiever,
  type: "workoutStreak" | "nutritionStreak",
) => {
  if (achiever.startTime && achiever.endTime) {
    const progress = await getStreakProgress(
      uid,
      tz,
      achiever.startTime,
      achiever.endTime,
      type,
    );

    console.log("progress", progress);
  }
};
