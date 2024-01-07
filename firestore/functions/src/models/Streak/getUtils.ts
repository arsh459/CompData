import moment = require("moment");
import { getFormattedDateForUnixWithTZ } from "../../main/PubSub/activityTracker/utils";
import { Activity } from "../Activity/Activity";
import {
  // StreakDataInterface,
  streakMapInterface,
  streakStatusType,
} from "./streakInterface";
import { firestore } from "firebase-admin";
import { getDayStartForTz } from "../../main/FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { ONE_DAY_MS } from "../../main/Https/period/getPeriodArray";
import { PowerUpInterface } from "./powerUpInterface";
// import { getDateBucket } from "../../main/FirestoreTriggers/onActivityUpdateV2/dateBucket";

export interface groupActivitesMap {
  fp: number;
}
export interface groupActivies {
  [date: string]: groupActivitesMap;
}

// a function which take activites and target fp and returns streak map

export const getStreakMapFromActivities = (
  activites: Activity[],
  targetFp: number,
  tz: string,
) => {
  const userGroupedActivites: groupActivies = {};
  const groupStreakMap: streakMapInterface = {};

  for (const activity of activites) {
    // const activityDate = activity.date;
    const activityUnix = activity.createdOn;
    const todayDateStr = moment().tz(tz).format("YYYY-MM-DD");
    if (activityUnix) {
      const activityDate = getFormattedDateForUnixWithTZ(activityUnix, tz);
      // const todayDateStr =  moment().tz(tz).format("YYYY-MM-DD");
      const fp = (activity.calories && activity.calories / 300) || 0;

      if (!userGroupedActivites[activityDate]) {
        userGroupedActivites[activityDate] = { fp: fp };
      } else {
        userGroupedActivites[activityDate].fp += fp;
      }
      if (activityDate === todayDateStr) {
        groupStreakMap[activityDate] =
          userGroupedActivites[activityDate].fp >= targetFp
            ? "activeHit"
            : "active";
      } else {
        groupStreakMap[activityDate] =
          userGroupedActivites[activityDate].fp >= targetFp ? "hit" : "miss";
      }
    }
  }

  return groupStreakMap;
};
//

export const handleFreeze = (
  userStreakMap: streakMapInterface,
  freezeMap: { [key: string]: PowerUpInterface },
) => {
  const streakMapDates = Object.keys(userStreakMap);
  const updatedStreakMapWithFreeze = userStreakMap;

  for (const streakMapDate of streakMapDates) {
    if (freezeMap[streakMapDate]) {
      updatedStreakMapWithFreeze[streakMapDate] = "freeze";
    }
  }

  return updatedStreakMapWithFreeze;
};
// a function takes date list array and recalculated streak map and return reconcile streak map

export const getReconcileStreakMap = (
  streakDates: string[],
  reCalculatedStreakMap: streakMapInterface,
  tz: string,
  // uid: string,
) => {
  console.log("reconcile get func is called");
  const reconcileStreakMap: streakMapInterface = {};
  let streakStatus: streakStatusType = "active";
  let newActiveTillDate = "";
  let streakDays = 0;
  const todayDateStr = moment().tz(tz).format("YYYY-MM-DD");
  for (const date of streakDates) {
    console.log(todayDateStr, date);
    newActiveTillDate = date;

    if (date === todayDateStr) {
      console.log("today activity", reCalculatedStreakMap[date]);
      if (reCalculatedStreakMap[date] === "activeHit") {
        streakDays += 1;
        console.log("today is", reconcileStreakMap[date]);
        reconcileStreakMap[date] = reCalculatedStreakMap[date];
        break;
      } else {
        reconcileStreakMap[date] = "active";
        break;
      }
    } else if (
      reCalculatedStreakMap[date] &&
      reCalculatedStreakMap[date] !== "miss"
    ) {
      // if (reCalculatedStreakMap[date] === "active")
      reconcileStreakMap[date] = reCalculatedStreakMap[date];

      // we can check here freeze but for that we need activeTill Unix

      streakDays += 1;
    } else {
      reconcileStreakMap[date] = "miss";
      streakStatus = "inactive";
      break;
    }
  }
  // console.log("hello", reconcileStreakMap);
  return { reconcileStreakMap, streakStatus, newActiveTillDate, streakDays };
};

export const getTzStreaks = async (tz: string) => {
  const streaksDocumentsRef = await firestore()
    .collectionGroup("streaks")
    .where("streakStatus", "==", "active")
    .where("userTimeZone", "==", tz)
    .get();

  // const streaks: StreakDataInterface[] = [];

  // if (streaksCollection && streaksCollection.docs.length) {
  //   for (const streak of streaksCollection.docs) {
  //     const streakData = streak.data() as StreakDataInterface;
  //     streaks.push(streakData);
  //   }
  // }

  return streaksDocumentsRef;
};

export const getMonthsInBetween = (
  startUnix: number,
  endUnix: number,
  tz: string,
) => {
  const start = moment(startUnix).tz(tz);
  const end = moment(endUnix).tz(tz);
  let months: { [key: string]: Boolean } = {};

  // Calculate the difference in months
  const monthDifference = end.diff(start, "months");

  // Iterate over the range
  for (let i = 0; i <= Math.abs(monthDifference); i++) {
    const monthName = start.clone().add(i, "months").format("MMMM");
    months[monthName] = true;
  }
  return Object.keys(months);
};

/**
 * started - 24/11/2023 0:00 AM
 * activeTill - 24/11/2023 23:59:59 PM
 *
 * Cron runs 25/11/2023 0:00 AM
 *
 *
 *
 */

export const isDayIsYesterday = (activeTill: number, tz: string) => {
  const now = Date.now();
  const dayStartInZone = getDayStartForTz(tz, now);

  const diff = dayStartInZone - activeTill;

  if (diff < 0) {
    return "ACTIVE_AHEAD";
  } else if (diff < ONE_DAY_MS) {
    return "ACTIVE_YESTERDAY";
  } else {
    return "ACTIVE_OLD";
  }

  // const firstDate = moment.unix(currentUnix).tz(tz);
  // const secondDate = moment.unix(yesterDayUnix).tz(tz);

  // console.log("firstDate", firstDate);
  // console.log("secondDate", secondDate);

  // console.log("currentUnix", currentUnix);
  // console.log("yesterDayUnix", yesterDayUnix);

  // Check if firstDate is the day before secondDate
  // return firstDate.isSame(secondDate.clone().subtract(1, "day"), "day");
};
