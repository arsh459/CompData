import { streakStatus } from "@providers/streakV2/store/useStreakStoreV2";

export const getStreakGoal = (
  targetDays?: number,
  streakDays?: number,
  streakStatus?: streakStatus
) => {
  if (streakStatus === "inactive") {
    return 7;
  }
  if (!streakDays || !targetDays) {
    return 7;
  }

  if (streakDays < targetDays) {
    return targetDays;
  } else if (streakDays === targetDays) {
    return streakDays + 7;
  }

  return 7;
};
