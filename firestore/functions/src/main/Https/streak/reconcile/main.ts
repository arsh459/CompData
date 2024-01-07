import moment = require("moment");
import { getActivitiesInRange } from "../../../../models/Activity/getUtils";
import {
  reconcileUserStreak,
  userUsedPowerUp,
} from "../../../../models/Streak/Methods";
import { getUserStreak } from "../../../../models/Streak/getUserStreak";
import {
  getReconcileStreakMap,
  getStreakMapFromActivities,
  handleFreeze,
} from "../../../../models/Streak/getUtils";
import { getUserById } from "../../../../models/User/Methods";
import { getTimezone } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getFormattedDateForUnixWithTZ } from "../../../PubSub/activityTracker/utils";
import { ONE_DAY_MS } from "../../period/getPeriodArray";

export const reconcileMain = async (
  uid: string,
  streakId?: string,
): Promise<boolean> => {
  const userStreak = await getUserStreak(uid, streakId);
  console.log("FETCHED", userStreak);

  const user = await getUserById(uid);

  if (userStreak && user) {
    const tz = getTimezone(user);

    const endDayUnix = getUnixForDayAfterDays(
      userStreak.startedOn,
      userStreak.targetDays - 1,
      tz,
    );
    console.log("END UNIX", endDayUnix);
    const streakDates = getDatesFromUnixRange(
      userStreak.startedOn,
      userStreak.targetDays,
      tz,
    );

    console.log("streakDates", streakDates);

    const userActivities = await getActivitiesInRange(
      uid,
      userStreak.startedOn,
      endDayUnix,
    );

    console.log("Fetched Activities", userActivities.length);

    const userStreakMapFromActivies = getStreakMapFromActivities(
      userActivities,
      userStreak.targetFp,
      tz,
    );

    const activeTillUnix = userStreak.startedOn + userStreak.days * ONE_DAY_MS;

    const freezeMap = await userUsedPowerUp(
      userStreak.startedOn,
      activeTillUnix,
      uid,
      tz,
    );
    console.log("freezeMap", freezeMap);
    console.log("userStreakMapFromActivies", userStreakMapFromActivies);

    const userStreakMapFreezeHandled = handleFreeze(
      userStreakMapFromActivies,
      freezeMap,
    );

    console.log("userStreakMapFreezeHandled", userStreakMapFreezeHandled);

    const { streakStatus, reconcileStreakMap, newActiveTillDate, streakDays } =
      getReconcileStreakMap(streakDates, userStreakMapFreezeHandled, tz);

    console.log("streakStatus", streakStatus);
    console.log("reconcileStreakMap", reconcileStreakMap);
    console.log("newActiveTillDate", newActiveTillDate);
    // throw new Error("HI");

    await reconcileUserStreak(
      uid,
      tz,
      reconcileStreakMap,
      streakStatus,
      newActiveTillDate,
      userStreak.id,
      streakDays,
      userStreak.startedOn,
    );

    return true;
  }

  return false;
};

export const getUnixForDayAfterDays = (
  startDayUnix: number,
  days: number,
  tz: string,
) => {
  const startDay = moment(startDayUnix).tz(tz);
  const futureDate = startDay.add(days, "days");
  return futureDate.valueOf();
};

export const getDatesFromUnixRange = (
  startTimestamp: number,
  days: number,
  tz: string,
): string[] => {
  const dates: string[] = [];

  for (let i: number = 0; i < days; i++) {
    const dayStartUnix = startTimestamp + i * ONE_DAY_MS;
    const dateString = getFormattedDateForUnixWithTZ(dayStartUnix, tz);

    dates.push(dateString);
  }

  return dates;
};
