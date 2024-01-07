import { format } from "date-fns";
import firestore from "@react-native-firebase/firestore";
import { streakData } from "../store/useStreakStoreV2";
import {
  StreakMonthDayInterface,
  dayStatusType,
  streakMapInterface,
} from "../interface";

/**
 *
 * startedOn >= monthStart - complete streak within month, part streak at end of month
 * activeTill >= monthStart - part streak at start of month
 * data merge
 */

////// KRISHANU - A way to get streaks in a month
export const getMonthStreaks = async (unix: number, uid: string) => {
  // const firstDayUnix = startOfMonth(unix).getTime();
  // const lastDayUnix = endOfMonth(unix).getTime();
  // const endOfLastDay = endOfDay(lastDayUnix).getTime();
  const monthsDays: StreakMonthDayInterface = {};
  const monthName = format(unix, "MMMM");

  try {
    const monthsStreaksDocs = await firestore()
      .collection(`users/${uid}/streaks`)
      .where("streakMonths", "array-contains", monthName)
      // .where("activeTill", ">=" , firstDayUnix)
      // .where("startedOn", "<", endOfLastDay)
      // .where()
      .get();

    if (monthsStreaksDocs && monthsStreaksDocs.docs.length) {
      for (const streak of monthsStreaksDocs.docs) {
        const streakData = streak.data() as streakData;
        const streakMap = streakData.streakMap;
        for (const [key, _] of Object.entries(streakMap)) {
          const day = new Date(key);
          const dayUnix = day.getTime();
          const status = getDayStatus(streakData, dayUnix);
          if (status) {
            monthsDays[key] = status;
          }
        }
      }
    }
  } catch (err) {
    console.log("error in getMonthStreak", err);
  }

  return monthsDays;
};

export const processMapToDates = (
  streak: streakData,
  streakMap: streakMapInterface
) => {
  const monthsDays: StreakMonthDayInterface = {};
  for (const [key, _] of Object.entries(streakMap)) {
    const day = new Date(key);
    const dayUnix = day.getTime();
    const status = getDayStatus(streak, dayUnix);
    if (status) {
      monthsDays[key] = status;
    }
  }

  return monthsDays;
};

const getDayStatus = (
  streak: streakData,
  dayUnix: number
): dayStatusType | undefined => {
  const dayDateString = format(dayUnix, "yyyy-MM-dd");
  if (streak.streakMap[dayDateString] === "freeze") {
    return "isFreeze";
  } else if (
    format(streak.startedOn, "yyyy-MM-dd") === dayDateString &&
    (streak.streakMap[dayDateString] === "activeHit" ||
      streak.streakMap[dayDateString] === "hit")
  ) {
    return "isStreakStartDay";
  } else if (streak.streakMap[dayDateString] === "active") {
    return "active";
  } else if (streak.streakMap[dayDateString] === "activeHit") {
    return "activeHit";
  } else if (streak.streakMap[dayDateString] === "miss") {
    return "miss";
  } else if (streak.startedOn < dayUnix && streak?.activeTill > dayUnix) {
    return "isDayBtwStreak";
  }
  return;
};
