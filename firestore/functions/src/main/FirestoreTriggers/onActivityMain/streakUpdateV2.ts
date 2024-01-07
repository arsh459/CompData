import { getUserStreak } from "../../../models/Streak/getUserStreak";
import { UserInterface } from "../../../models/User/User";
import { ONE_DAY_MS } from "../../Https/period/getPeriodArray";
import {
  getDayStartForTz,
  getTimezone,
} from "../onActivityUpdateV2/dateBucket";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";

export const streakUpdateV2 = async (
  user: UserInterface,
  actTime: number,
  fpInc: number,
) => {
  const tz = getTimezone(user);

  const dayStart = getDayStartForTz(tz, actTime);
  const dayEnd = dayStart + ONE_DAY_MS;

  const now = Date.now();

  if (now >= dayStart && now < dayEnd) {
    const userStreak = await getUserStreak(user.uid);

    const dt = getFormattedDateForUnixWithTZ(actTime, tz);

    if (userStreak) {
      console.log("dt", dt);
      //   const dtStatus: streakLabel | undefined = userStreak.streakMap[dt];
    }
  }
};
