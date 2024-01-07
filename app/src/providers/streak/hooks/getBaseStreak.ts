import { localGoalObj } from "@models/User/User";
import { format } from "date-fns";

export const getBaseStreak = (
  now_7: number,
  targetFP: number
): localGoalObj[] => {
  const now = Date.now();
  const baseObj: localGoalObj[] = [];
  for (let i: number = 0; i < 7; i++) {
    const morningUnixInTz = now_7 + i * 24 * 60 * 60 * 1000;

    baseObj.push({
      targetFP: targetFP,
      achievedFP: 0,
      date: format(new Date(morningUnixInTz), "yyyy-MM-dd"),
      nbWorkouts: 0,
      id: `goal-${i}`,
      unix: morningUnixInTz,
      isFuture: now < morningUnixInTz ? true : false,
    });
  }

  return baseObj;
};

export const getBaseStreak_days = (
  start: number,
  targetFP: number,
  days: number
): localGoalObj[] => {
  const baseObj: localGoalObj[] = [];
  const now = Date.now();
  for (let i: number = 0; i < days; i++) {
    const morningUnixInTz = start + i * 24 * 60 * 60 * 1000;

    baseObj.push({
      targetFP: targetFP,
      achievedFP: 0,
      date: format(new Date(morningUnixInTz), "yyyy-MM-dd"),
      nbWorkouts: 0,
      id: `goal-${i}`,
      unix: morningUnixInTz,
      isFuture: now < morningUnixInTz ? true : false,
    });
  }

  return baseObj;
};
