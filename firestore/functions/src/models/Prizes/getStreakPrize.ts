import { getFormattedDateFormat2ForUnix } from "../../main/PubSub/activityTracker/utils";
import { Activity, ActivityUserPts, UserRank } from "../Activity/Activity";
import { getUserActivityAfter } from "../Activity/getUtils";
// import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { countStreaks } from "./countStreaks";
import { countStreaksV2 } from "./countStreaksV2";
import { getWeeklyBucketForUser } from "./getPodiumFinishes";
import { calculateAvgSpeed } from "./speed";

export const getStreakPrize = async (
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  userRank?: UserRank,
) => {
  if (!userRank) {
    return {
      numStreaks: 0,
      remoteActivitiesObj: {},
      avgSpeed: 0,
      totalDistance: 0,
    };
  }

  // get activities in period
  const userActivities = await getUserActivityAfter(
    userRank.uid,
    after,
    before,
  );
  const remoteActivitiesObj = createDayStringCalorieObject(userActivities);
  const weekCalObj = getWeeklyBucketForUser(
    remoteActivitiesObj,
    challengeLength,
    after,
    [],
    // 30,
  );

  const numStreaks = countStreaks(
    remoteActivitiesObj,
    th,
    after,
    challengeLength,
    streakLength,
    userRank.authorName ? userRank.authorName : "",
  );

  const { scoreMinCal, weekCalMin } = countStreaksV2(
    remoteActivitiesObj,
    th,
    after,
  );

  const { avgSpeed, totalDistance } = calculateAvgSpeed(userActivities);

  return {
    numStreaks,
    scoreMinCal,
    remoteActivitiesObj,
    avgSpeed,
    totalDistance,
    weekCalObj,
    weekCalMin,
  };
};

export const createDayStringCalorieObject = (userActivities: Activity[]) => {
  const remoteActivitiesObj: { [day: string]: number } = {};

  for (const activity of userActivities) {
    // console.log("activity", activity.calories);

    if (activity.createdOn) {
      const dateString = getFormattedDateFormat2ForUnix(activity.createdOn);

      // const dateString = new Date(activity.createdOn).toDateString();
      console.log(`${dateString}: ${activity.calories}`);

      if (remoteActivitiesObj[dateString]) {
        remoteActivitiesObj[dateString] += activity.calories
          ? activity.calories
          : 0;
      } else {
        remoteActivitiesObj[dateString] = activity.calories
          ? activity.calories
          : 0;
      }
    } else {
      console.log("no date string", activity.calories);
    }
  }

  return remoteActivitiesObj;
};

export const createDayStringCalorieObject_Coach = (
  userRanks: UserRank[],
  after: number,
) => {
  const dayCalObj: { [day: string]: number } = {};
  const weekCalMin: { [day: string]: number } = {};
  const weekCalObj: { [day: string]: number } = {};
  for (const userRank of userRanks) {
    // console.log("activity", activity.calories);
    const userCalObj = userRank.dayCalObj;
    // console.log("userRank", userRank.authorName, userCalObj);

    if (userCalObj) {
      for (const day of Object.keys(userCalObj)) {
        if (dayCalObj[day]) {
          dayCalObj[day] += userCalObj[day];
        } else {
          dayCalObj[day] = userCalObj[day];
        }

        const week = Math.floor(
          (new Date(day).getTime() - after) / (7 * 24 * 60 * 60 * 1000),
        );

        if (weekCalObj[`week-${week}`]) {
          weekCalObj[`week-${week}`] += userCalObj[day];
        } else {
          weekCalObj[`week-${week}`] = userCalObj[day];
        }
      }
    }

    const userWeekCalMin = userRank.weekCalMin;

    console.log(userRank.authorName, userWeekCalMin);
    console.log(
      "TOTAL NOW",
      userWeekCalMin
        ? Object.values(userWeekCalMin).reduce((a, b) => a + b, 0)
        : 0,
    );

    if (userWeekCalMin) {
      for (const weekStr of Object.keys(userWeekCalMin)) {
        // console.log("userWeekCalMin[weekStr]", userWeekCalMin[weekStr]);
        if (weekCalMin[weekStr]) {
          weekCalMin[weekStr] += userWeekCalMin[weekStr]
            ? userWeekCalMin[weekStr]
            : 0;
        } else {
          weekCalMin[weekStr] = userWeekCalMin[weekStr]
            ? userWeekCalMin[weekStr]
            : 0;
        }

        // console.log("weekCalMin", weekCalMin);
      }
    }

    console.log(
      "TOTAL NOW",
      Object.values(weekCalMin).reduce((a, b) => a + b, 0),
    );
  }

  console.log("weekCalObj", weekCalMin);

  return { dayCalObj, weekCalMin, weekCalObj };
};

export const createDayStringPointObject_Coach = (
  userRanks: UserRank[],
  numActivitiesToCount: number,
  // after: number,
  // sprints: SprintObject[],
  // rounds: RoundObject[],
) => {
  const dayPointObj: { [day: string]: number } = {};
  const weekPointObj: { [day: string]: number } = {};
  const monthPointObj: { [month: string]: number } = {};
  const dayCalObj: { [day: string]: number } = {};
  const weekCalObj: { [week: string]: number } = {};
  const monthCalObj: { [month: string]: number } = {};

  const { sortedCoachActivityPts } = createMonthMergeForUserPts(
    userRanks,
    numActivitiesToCount,
  );

  // const weekCalObj: { [day: string]: number } = {};
  for (const userRank of userRanks) {
    // dayPoints
    const userPointObj = userRank.dayPointObj;
    if (userPointObj) {
      for (const day of Object.keys(userPointObj)) {
        if (dayPointObj[day]) {
          dayPointObj[day] += userPointObj[day];
        } else {
          dayPointObj[day] = userPointObj[day];
        }
      }
    }

    const userPointWeekObj = userRank.weekPointObj;
    if (userPointWeekObj) {
      for (const week of Object.keys(userPointWeekObj)) {
        if (weekPointObj[week]) {
          weekPointObj[week] += userPointWeekObj[week];
        } else {
          weekPointObj[week] = userPointWeekObj[week];
        }
      }
    }

    // if (userPointMonthObj) {
    //   for (const month of Object.keys(userPointMonthObj)) {
    //     if (monthPointObj[month]) {
    //       monthPointObj[month] += userPointMonthObj[month];
    //     } else {
    //       monthPointObj[month] = userPointMonthObj[month];
    //     }
    //   }
    // }

    const userCalObj = userRank.dayCalObj;
    if (userCalObj) {
      for (const day of Object.keys(userCalObj)) {
        if (dayCalObj[day]) {
          dayCalObj[day] += userCalObj[day];
        } else {
          dayCalObj[day] = userCalObj[day];
        }
      }
    }

    const userCalWeekObj = userRank.weekPointObj;
    if (userCalWeekObj) {
      for (const week of Object.keys(userCalWeekObj)) {
        if (weekCalObj[week]) {
          weekCalObj[week] += userCalWeekObj[week];
        } else {
          weekCalObj[week] = userCalWeekObj[week];
        }
      }
    }

    const userCalMonthObj = userRank.monthCalObj;
    if (userCalMonthObj) {
      for (const month of Object.keys(userCalMonthObj)) {
        if (monthCalObj[month]) {
          monthCalObj[month] += userCalMonthObj[month];
        } else {
          monthCalObj[month] = userCalMonthObj[month];
        }
      }
    }
  }

  // const userPointMonthObj = userRank.monthPointObj;
  // const userMonthTaskObj = userRank.monthTaskPts;
  // if (userPointMonthObj) {
  for (const month of Object.keys(sortedCoachActivityPts)) {
    const actPts = sortedCoachActivityPts[month];
    // console.log("month", month, actPts.length);
    if (actPts) {
      const monthPts = actPts.reduce((acc, b) => acc + b.fp, 0);
      // console.log("monthPts", monthPts);
      if (monthPointObj[month]) {
        monthPointObj[month] += monthPts;
      } else {
        monthPointObj[month] = monthPts;
      }
    }
  }
  // }

  return {
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    sortedCoachActivityPts,
    // taskMap,
  };
};

export const createMonthMergeForUserPts = (
  userRanks: UserRank[],
  numActivitiesToCount: number,
) => {
  // task map
  const coachActivityPts: { [month: string]: ActivityUserPts[] } = {};
  const sortedCoachActivityPts: { [month: string]: ActivityUserPts[] } = {};
  // const monthTaskMap: { [month: string]: { [taskId: string]: number } } = {};
  // const taskMap: { [month: string]: { [taskId: string]: string } } = {};

  // const weekCalObj: { [day: string]: number } = {};
  // const updatedUserRanks: UserRank[] = [];
  for (const userRank of userRanks) {
    // tasks for user in months
    const userMonthTaskPts = userRank.monthActPts;
    if (userMonthTaskPts) {
      for (const month of Object.keys(userMonthTaskPts)) {
        const currentUserActMap = userMonthTaskPts[month];
        if (currentUserActMap) {
          if (!coachActivityPts[month]) {
            coachActivityPts[month] = [];
          }

          coachActivityPts[month].push(...currentUserActMap);
        }
      }
    }
  }

  for (const month of Object.keys(coachActivityPts)) {
    const currentPtArray = coachActivityPts[month];

    const sortedResult = currentPtArray.sort((a, b) => -(a.fp - b.fp));

    sortedCoachActivityPts[month] = sortedResult.slice(0, numActivitiesToCount);
  }

  return {
    // monthTaskMap,
    sortedCoachActivityPts,
  };
};
