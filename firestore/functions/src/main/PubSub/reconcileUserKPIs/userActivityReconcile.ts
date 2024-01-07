import { Activity } from "../../../models/Activity/Activity";
import { updateRemoteUserActivityData } from "../../../models/Activity/createUtils";
import { getUserActivities } from "../../../models/Activity/getUtils";
import {
  getAllSocialboatUsers,
  //   getUserById,
} from "../../../models/User/Methods";
import { userLevel } from "../../../models/User/User";
import {
  getDayStartIST,
  getFormattedDateForUnix,
} from "../activityTracker/utils";

export const reconcileUserActivities = async (th: number) => {
  const socialBoatUsers = await getAllSocialboatUsers();

  //   const socialBoatUserTmp = await getUserById("lHhuSVKMAZbj86xg8m6ubZqKdUj2");
  //   const socialBoatUsers = [];
  //   if (socialBoatUserTmp) socialBoatUsers.push(socialBoatUserTmp);

  for (const socialBoatUser of socialBoatUsers) {
    const userActivities = await getUserActivities(socialBoatUser.uid);
    // console.log("userActivities", userActivities.length);
    const totalCalories = sumCalories(userActivities);
    // console.log("totalCalories", totalCalories);
    const { score, total } = regularityScore(userActivities, th);
    // console.log("score", score);
    // console.log("total", total);
    const userLev = getUserLevel(score, total);
    const progress = getProgress(score, total);

    console.log(
      `recon:${socialBoatUser.name}: cals${totalCalories} score:${score} total:${total} userLev:${userLev} progress:${progress}`,
    );

    await updateRemoteUserActivityData(
      socialBoatUser.uid,
      totalCalories,
      total,
      score / total,
      userLev,
      progress,
    );
  }
};

const sumCalories = (userActivities: Activity[]) => {
  let cal: number = 0;
  for (const act of userActivities) {
    cal += act.calories ? act.calories : 0;
  }

  return cal;
};

const regularityScore = (userActivities: Activity[], th: number) => {
  if (userActivities.length > 0) {
    const dayBuckets = getActivityDictForDays(userActivities);
    // console.log("day buckets", dayBuckets);
    // console.log('zeroth', userActivities[0]);
    // console.log('last', userActivities[-1]);

    const initDate = userActivities[0].createdOn;
    const lastDate = userActivities[userActivities.length - 1].createdOn;
    if (initDate && lastDate) {
      const startUnix = getDayStartIST(initDate);
      const lastUnix = getDayStartIST(lastDate);

      const days = Math.round((lastUnix - startUnix) / (24 * 60 * 60 * 1000));

      const dailyCalories: { [day: string]: number } = {};
      for (let i = 0; i < days; i++) {
        const dateToday = initDate + 24 * 60 * 60 * 1000 * i;

        const formattedDateKey = getFormattedDateForUnix(dateToday);

        const dayActivities = dayBuckets[formattedDateKey];

        if (dayActivities) {
          const sumCals = sumCalories(dayActivities);
          dailyCalories[formattedDateKey] = sumCals;
        } else {
          dailyCalories[formattedDateKey] = 0;
        }
      }

      const { score, total } = calculateRegularityScore(dailyCalories, th);

      return { score, total, dailyCalories };
    }
  }
  return { score: 0, total: 0, dailyCalories: {} };
};

const getActivityDictForDays = (userActivities: Activity[]) => {
  const dateObj: { [dateString: string]: Activity[] } = {};
  for (const userAct of userActivities) {
    if (userAct.createdOn) {
      const formattedDate = getFormattedDateForUnix(userAct.createdOn);

      if (dateObj[formattedDate]) {
        dateObj[formattedDate].push(userAct);
      } else {
        dateObj[formattedDate] = [userAct];
      }
    }
  }

  return dateObj;
};

const calculateRegularityScore = (
  dailyCalories: {
    [day: string]: number;
  },
  th: number,
) => {
  let score: number = 0;
  let total: number = 0;
  for (const day of Object.keys(dailyCalories)) {
    if (dailyCalories[day] > th) {
      score += 1;
    }

    total += 1;
  }

  if (total) {
    return {
      score,
      total,
    };
  } else return { score: 0, total: 0 };
};

const getUserLevel = (score: number, total: number): userLevel => {
  if (score > 1000 && score / total > 0.9) {
    return "champion";
  } else if (score > 200 && score / total > 0.75) {
    return "athlete";
  } else if (score > 50 && score / total > 0.7) {
    return "enthusiast";
  } else {
    return "rookie";
  }
};

const getProgress = (score: number, total: number) => {
  if (score < 50) {
    return score / 50;
  } else if (score === 50 && score / total <= 0.7) {
    return 0.99;
  } else if (score > 50 && score < 200) {
    return (score - 50) / 150;
  } else if (score === 200 && score / total <= 0.75) {
    return 0.99;
  } else if (score > 200 && score < 1000) {
    return (score - 200) / 800;
  } else if (score === 1000 && score / total < 0.9) {
    return 0.99;
  }

  return -1;
};
