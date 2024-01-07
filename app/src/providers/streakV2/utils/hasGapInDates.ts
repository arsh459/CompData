import { streakMapInterface } from "../interface";
import { getStreakDayCount } from "./streakUpdate";

export const checkStreakValidity = (
  today: string,
  streakMap: streakMapInterface,
  days: number
) => {
  const todayStatus = streakMap[today];

  if (!todayStatus) {
    return false;
  }

  if (days < 0) {
    return false;
  }

  const isMissDayInBetween = Object.values(streakMap).includes("miss");

  if (isMissDayInBetween) {
    return false;
  }

  const streakDates = Object.keys(streakMap);

  const hasGap = hasGapInDates(streakDates);

  const dayCount = getStreakDayCount(streakMap);
  // console.log("dayCount", dayCount);

  if (days !== dayCount) {
    // console.log("DAY count is not valid");
    return false;
  }

  if (hasGap) {
    return false;
  }

  return true;
};

export const hasGapInDates = (dates: string[]) => {
  // here sorting the dates with timestamp if mismatch in order fo dates found

  const sortedTimestamps = dates
    .map((date) => new Date(date).getTime())
    .sort((a, b) => a - b);

  // checing if diff between unix in ms diff more than 1 day

  for (let i = 0; i < sortedTimestamps.length - 1; i++) {
    const diffDays =
      (sortedTimestamps[i + 1] - sortedTimestamps[i]) / (1000 * 60 * 60 * 24); // one day ms
    if (diffDays > 1) {
      return true;
    }
  }

  return false;
};
