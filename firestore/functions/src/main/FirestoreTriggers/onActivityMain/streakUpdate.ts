import { getActivitiesInRange } from "../../../models/Activity/getUtils";
import { getUserStreak } from "../../../models/Streak/getUserStreak";
import { UserInterface } from "../../../models/User/User";
import { getTimezone, getTodayDate } from "../onActivityUpdateV2/dateBucket";
import { firestore } from "firebase-admin";
import { ONE_DAY_MS } from "../../Https/period/getPeriodArray";

export const handleStreakUpdate = async (user: UserInterface) => {
  const userStreak = await getUserStreak(user.uid);
  const usertz = getTimezone(user);
  const today = getTodayDate(usertz);

  if (userStreak) {
    const streakDocRef = firestore().doc(
      `users/${user.uid}/streaks/${userStreak.id}`,
    );

    const endOfTodayUnix = today.todayUnix + ONE_DAY_MS;

    // const endOfTodayUnix = moment(today.todayUnix).endOf("day").valueOf();

    const userTodayActivites = await getActivitiesInRange(
      user.uid,
      today.todayUnix,
      endOfTodayUnix,
    );

    let totalFPAchieved = 0;

    for (const activity of userTodayActivites) {
      const activityFp = (activity.calories && activity.calories / 300) || 0;
      totalFPAchieved += activityFp;
    }

    if (totalFPAchieved > userStreak.targetFp) {
      await streakDocRef.update({
        [`streakMap.${today.todayDate}`]: "activeHit",
        days: userStreak.days + 1,
        updatedOn: today.todayUnix,
      });
    } else {
      await streakDocRef.update({
        [`streakMap.${today.todayDate}`]: "active",
        days: userStreak.days - 1,
        updatedOn: today.todayUnix,
      });
    }
  }

  return;
  // need point to compare if target achived or not

  // check if streak exists on that date or not. Fetch streak which has unix
  // if exists, fix streak status
};
