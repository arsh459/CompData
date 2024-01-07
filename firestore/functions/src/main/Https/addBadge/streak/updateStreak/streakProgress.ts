import { format } from "date-fns";
import { Activity } from "../../../../../models/Activity/Activity";
import {
  getActivitiesInRangeForType,
  //   getUserActivities,
} from "../../../../../models/Activity/getUtils";
import { achieverProgress } from "../../../../../models/awards/interface";
import { getFormattedDateForUnixWithTZ } from "../../../../PubSub/activityTracker/utils";
import { ONE_DAY_MS } from "../../../period/getPeriodArray";
// import { Achiever } from "../../../../../models/awards/interface";

export const getStreakProgress = async (
  uid: string,
  tz: string,
  startTime: number,
  endTime: number,
  type: "workoutStreak" | "nutritionStreak",
) => {
  // in the time range, fetch relevent activities
  if (type === "nutritionStreak") {
    const nutritionActivitiesInRange = await getActivitiesInRangeForType(
      uid,
      startTime,
      endTime,
      "nutrition",
    );

    return getStreakForActivities(
      tz,
      startTime,
      endTime,
      nutritionActivitiesInRange,
    );
  }

  throw new Error("Unsupported badgeType");

  // basis fp, update streak progress
};

const getStreakForActivities = (
  tz: string,
  st: number,
  en: number,
  activities: Activity[],
) => {
  const dateBuckets = bucketActivities(tz, activities);

  // days section
  const days = Math.round((en - st) / ONE_DAY_MS);

  let miss: boolean = false;
  const streakProgress: achieverProgress = {};
  for (let i: number = 0; i < days; i++) {
    const start = st + i * ONE_DAY_MS;
    const end = start + ONE_DAY_MS;

    // potential is possible
    if (end > Date.now()) {
      break;
    }

    const dateBucket = getFormattedDateForUnixWithTZ(start, tz);
    if (dateBuckets[dateBucket] && dateBuckets[dateBucket].length) {
      streakProgress[i] = {
        tickStatus: "HIT",
        container: i,
        label: format(new Date(start), "dd"),
        isBadge: i === days - 1,
      };
    } else {
      miss = true;
      streakProgress[i] = {
        tickStatus: "MISS",
        container: i,
        label: format(new Date(start), "dd"),
        isBadge: i === days - 1,
      };
    }
  }

  return {
    progress: streakProgress,
    miss,
  };
};

const bucketActivities = (tz: string, activities: Activity[]) => {
  const dateBuckets: { [date: string]: Activity[] } = {};

  for (const activity of activities) {
    const createdUnix = activity.createdOn;
    if (createdUnix) {
      const dateStr = getFormattedDateForUnixWithTZ(createdUnix, tz);
      if (dateBuckets[dateStr]) {
        dateBuckets[dateStr].push(activity);
      } else {
        dateBuckets[dateStr] = [activity];
      }
    }
  }

  return dateBuckets;
};
