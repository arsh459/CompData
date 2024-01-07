import {
  streakLabel,
  streakMapInterface,
} from "../../../../models/Streak/streakInterface";

export const getStreakDayCount = (streakMap: streakMapInterface) => {
  const hitItems = Object.values(streakMap).filter(
    (item) => item === "activeHit" || item === "freeze" || item === "hit",
  );

  return hitItems.length;
};

export const getUpdatedStreakLabel = (
  achieved: number,
  target: number,
): streakLabel => {
  if (achieved >= target) {
    return "activeHit";
  } else {
    return "active";
  }
};
