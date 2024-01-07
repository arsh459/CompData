import {
  POINTS_LEVEL_FIVE,
  POINTS_LEVEL_FOUR,
  POINTS_LEVEL_ONE,
  POINTS_LEVEL_THREE,
  POINTS_LEVEL_TWO,
} from "../../../constants/challenge";
import { Activity, ActivityUserPts } from "../../../models/Activity/Activity";
import {
  getUserActivities,
  // getUserActivityAfter,
} from "../../../models/Activity/getUtils";
import {
  getDayEndIST,
  getDayStartIST,
  //   getDayStartIST,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";

export const handleUserReconcile = async (uid: string, th: number) => {
  const allUserActivities = await getUserActivities(uid);
  return handleUserActivityReconcile(allUserActivities, th);
};

export const handleUserActivityDump = async (uid: string) => {
  return await getUserActivities(uid);
};

const filterNonZeroValues = (newCalObj: { [day: string]: number }) => {
  const nonZeroCalObjInit: { [day: string]: number } = {};
  return Object.keys(newCalObj).reduce((acc, item) => {
    if (newCalObj[item]) {
      return {
        ...acc,
        [item]: newCalObj[item],
      };
    }
    return acc;
  }, nonZeroCalObjInit);
};

export const mergeUserActivityReconcileV2 = (
  prevCalObj: { [day: string]: number },
  prevPointObj: { [day: string]: number },
  activities: Activity[],
  th: number,
  startUnix: number,
  endUnix: number,
  sprintId: string,
  prevMonthActPts?: { [month: string]: ActivityUserPts[] },
) => {
  const bucketActivities = bucketActivitiesOnDay(activities);

  // console.log("bucketActivities", bucketActivities);

  // for (const actKey of Object.keys(bucketActivities)) {
  //   const acts = bucketActivities[actKey];
  //   for (const act of acts) {
  //     console.log(actKey, act.calories, act.createdOn);
  //   }
  // }

  const { dayFitPoints, dayCals } = getAllFitPointsV2(
    bucketActivities,
    th,
    startUnix,
    endUnix,
  );

  // console.log("sprintId", sprintId);
  // throw new Error("HI");

  const monthUserWithActs_interim = getUserMonthActs(activities);
  // const dayTaskPts = getDayTaskPoints(bucketActivities, th, startUnix, endUnix);

  // console.log("dayFitPoints", dayFitPoints);

  // for (const day of Object.keys(dayCals)) {
  //   if (prevCalObj[day] !== dayCals[day]) {
  //   }
  // }

  const monthUserWithActs: { [month: string]: ActivityUserPts[] } = {
    ...(prevMonthActPts ? prevMonthActPts : {}),
    [sprintId]: monthUserWithActs_interim,
  };

  const newCalObjWithZeros = {
    ...prevCalObj,
    ...dayCals,
  };

  const newPointObjWithZeros = {
    ...prevPointObj,
    ...dayFitPoints,
  };

  // console.log("newPointObjWithZeros", newPointObjWithZeros);

  const newCalObj = filterNonZeroValues(newCalObjWithZeros);
  const newPointObj = filterNonZeroValues(newPointObjWithZeros);

  // console.log("newPointObj", newPointObj);

  const totalCalories = getObjectSum(newCalObj);
  const totalFPoints = getObjectSum(newPointObj);

  const { userLevel, activePoints, progressV2 } =
    getUserLevelFromPointPbj(newPointObj);

  return {
    totalFPoints,
    userLevel,
    activePoints,
    bucketActivitiesForPeriod: bucketActivities,
    dayFitPoints: newPointObj,
    dayCals: newCalObj,
    totalCalories,
    progressV2,
    monthUserWithActs,
    // dayTaskPts,
  };
};

export const getUserMonthActs = (userActivities: Activity[]) => {
  const sortedActivities = userActivities.sort(
    (a, b) => -((a.calories ? a.calories : 0) - (b.calories ? b.calories : 0)),
  );

  const returnedResult: ActivityUserPts[] = [];
  sortedActivities.forEach((item) => {
    if (item.calories)
      returnedResult.push({
        actId: item.id ? item.id : "",
        fp: Math.round((item.calories ? item.calories : 0) / 300),
        uid: item.authorUID,
      });
  });

  return returnedResult;
};

export const mergeUserActivityReconcile = (
  prevCalObj: { [day: string]: number },
  prevPointObj: { [day: string]: number },
  activities: Activity[],
  th: number,
) => {
  const bucketActivities = bucketActivitiesOnDay(activities);

  // console.log("bucketActivities", bucketActivities);

  const { dayFitPoints, dayCals } = getAllFitPoints(bucketActivities, th);
  // console.log("prevCalObj", prevCalObj);
  // console.log("prevPointObj", prevPointObj);
  // console.log("dayFitPoints", dayFitPoints);

  const newCalObj = {
    ...prevCalObj,
    ...dayCals,
  };

  const newPointObj = {
    ...prevPointObj,
    ...dayFitPoints,
  };

  // console.log("cal", getObjectSum(newCalObj), getObjectSum(prevCalObj));
  // console.log("newCalObj", newCalObj);

  // console.log("dayCals", dayCals);
  // console.log("");

  // console.log("newPointObj", newPointObj);
  // console.log("");

  const totalCalories = getObjectSum(newCalObj);
  const totalFPoints = getObjectSum(newPointObj);

  // console.log("totalFPoints", totalFPoints);
  // console.log("");

  const { userLevel, activePoints, progressV2 } =
    getUserLevelFromPointPbj(newPointObj);

  // console.log("userLevel", userLevel);

  return {
    totalFPoints,
    userLevel,
    activePoints,
    bucketActivitiesForPeriod: bucketActivities,
    dayFitPoints: newPointObj,
    dayCals: newCalObj,
    totalCalories,
    progressV2,
  };
};

export const handleUserActivityReconcile = (
  activities: Activity[],
  th: number,
) => {
  const bucketActivities = bucketActivitiesOnDay(activities);
  // console.log("bucketActivities", bucketActivities);

  const { totalFPoints, dayFitPoints, totalCalories, dayCals } =
    getAllFitPoints(bucketActivities, th);
  const { userLevel, activePoints, progressV2 } = getUserLevel(
    bucketActivities,
    th,
  );

  return {
    totalFPoints,
    userLevel,
    activePoints,
    bucketActivities,
    dayFitPoints,
    dayCals,
    totalCalories,
    progressV2,
  };
};

export const getDayBucket = (createdOn: number) => {
  const dayBucket = getFormattedDateForUnix(createdOn);

  return dayBucket;
};

const msInDay = 24 * 60 * 60 * 1000;

// const getDayTaskPoints = (
//   bucketActivities: { [day: string]: Activity[] },
//   th: number,
//   start: number,
//   end: number,
// ) => {
//   const dayTaskPts: { [day: string]: { [taskId: string]: number } } = {};
//   const dayEnd = getDayEndIST(end);

//   // console.log("b", bucketActivities);

//   for (
//     let startUnix: number = start;
//     startUnix < dayEnd;
//     startUnix += msInDay
//   ) {
//     const day = getDayBucket(startUnix);
//     dayTaskPts[day] = {};

//     const dayActivities = bucketActivities[day] ? bucketActivities[day] : [];

//     // console.log("d", day, dayActivities.length);

//     for (const act of dayActivities) {
//       const tId = act.taskId;
//       const taskCalories = act.calories ? act.calories : 0;
//       const taskPts = getFitPointsForDay(taskCalories, th);

//       // console.log("tId", day, tId, taskPts);

//       if (tId && taskPts && !dayTaskPts[day][tId]) {
//         dayTaskPts[day][tId] = taskPts;
//       } else if (tId && taskPts && dayTaskPts[day][tId] < taskPts) {
//         dayTaskPts[day][tId] = taskPts;
//       }
//     }
//   }

//   return dayTaskPts;
// };

const getAllFitPointsV2 = (
  bucketActivities: { [day: string]: Activity[] },
  th: number,
  start: number,
  end: number,
) => {
  let totalFPoints: number = 0;
  let totalCalories: number = 0;
  const dayFitPoints: { [day: string]: number } = {};
  const dayCals: { [day: string]: number } = {};

  // let currentEndTime: number = start;
  // console.log("start", start, new Date(start), new Date(end));

  // const newDateEnd = new Date(end);

  const dayEnd = getDayEndIST(end);

  // console.log(dayEnd);

  // console.log("dayEnd", new Date(dayEnd));

  for (
    let startUnix: number = start;
    startUnix < dayEnd;
    startUnix += msInDay
  ) {
    const day = getDayBucket(startUnix);

    // console.log("d", day);/

    const calsForDay = getSumCals(bucketActivities[day]);
    const fitPointsForDay = getFitPointsForDay(calsForDay, th);
    const rawFPoints = getRawFpoints(bucketActivities[day]);

    totalCalories += calsForDay;

    const totalPointsForDay = fitPointsForDay + rawFPoints;

    totalFPoints += totalPointsForDay;

    // console.log(day, totalFPoints);

    dayFitPoints[day] = totalPointsForDay;
    dayCals[day] = calsForDay;
  }

  return { totalFPoints, dayFitPoints, totalCalories, dayCals };
};

const getAllFitPoints = (
  bucketActivities: { [day: string]: Activity[] },
  th: number,
) => {
  let totalFPoints: number = 0;
  let totalCalories: number = 0;
  const dayFitPoints: { [day: string]: number } = {};
  const dayCals: { [day: string]: number } = {};
  for (const day of Object.keys(bucketActivities)) {
    // console.log("day", day);
    const calsForDay = getSumCals(bucketActivities[day]);
    const fitPointsForDay = getFitPointsForDay(calsForDay, th);
    const rawFPoints = getRawFpoints(bucketActivities[day]);

    // total calories
    totalCalories += calsForDay;

    // console.log("calsForDay", calsForDay);
    // console.log("fitPointsForDay", fitPointsForDay);
    // console.log("rawFPoints", rawFPoints);

    const totalPointsForDay = fitPointsForDay + rawFPoints;

    totalFPoints += totalPointsForDay;

    // console.log(day, totalFPoints);

    dayFitPoints[day] = totalPointsForDay;
    dayCals[day] = calsForDay;
  }

  // console.log("");

  return { totalFPoints, dayFitPoints, totalCalories, dayCals };
};

const getRawFpoints = (activities?: Activity[]) => {
  if (!activities) {
    return 0;
  }
  let points: number = 0;
  for (const act of activities) {
    points += act.fitPointsV2 ? act.fitPointsV2 : 0;
  }

  return points;
};

const getSumCals = (activities?: Activity[]) => {
  if (!activities) {
    return 0;
  }

  let cals: number = 0;
  for (const act of activities) {
    cals += act.calories ? act.calories : 0;
  }

  return cals;
};

const getObjectSum = (numObj: { [key: string]: number }) => {
  let cals: number = 0;
  for (const val of Object.values(numObj)) {
    cals += val;
  }

  return cals;
};

const getFitPointsForDay = (cals: number, th: number) => {
  return Math.floor(cals / th);
};

const bucketActivitiesOnDay = (activities: Activity[]) => {
  const activitiesOnDays: { [day: string]: Activity[] } = {};
  for (const act of activities) {
    // console.log("act", act.date, act.calories, act.fitPointsV2, act.fitPoints);
    if (act.createdOn) {
      const dayBucket = getDayBucket(act.createdOn);
      // console.log("d", dayBucket);

      if (activitiesOnDays[dayBucket]) {
        activitiesOnDays[dayBucket].push(act);
      } else {
        activitiesOnDays[dayBucket] = [act];
      }
    }
  }

  return activitiesOnDays;
};

const getUserLevelPointsFromPointObj = (bucket: { [day: string]: number }) => {
  const now = Date.now();
  const start = now - 29 * 24 * 60 * 60 * 1000;
  const dayStartUnix = getDayStartIST(start);

  // console.log("bucket", bucket);

  let fPoints: number = 0;
  for (let d: number = 0; d < 30; d++) {
    const day = dayStartUnix + d * 24 * 60 * 60 * 1000;
    const formattedDay = getFormattedDateForUnix(day);

    // console.log("formattedDay", formattedDay, bucket[formattedDay]);

    const pointsToday = bucket[formattedDay] ? bucket[formattedDay] : 0;

    // console.log("pointsToday", pointsToday, fPoints);

    // const pts = getFitPointsForDay(calsOnDay, th);

    fPoints += pointsToday;
  }

  // console.log("fPoints", fPoints);

  return fPoints;
};

const getUserLevelPoints = (
  bucket: { [day: string]: Activity[] },
  th: number,
) => {
  const now = Date.now();
  const start = now - 30 * 24 * 60 * 60 * 1000;
  const dayStartUnix = getDayStartIST(start);

  let fPoints: number = 0;
  let tCalories: number = 0;
  for (let d: number = 0; d < 30; d++) {
    const day = dayStartUnix + d * 24 * 60 * 60 * 1000;
    const formattedDay = getFormattedDateForUnix(day);

    const activitiesToday = bucket[formattedDay];

    const calsOnDay = getSumCals(activitiesToday);

    const pts = getFitPointsForDay(calsOnDay, th);

    fPoints += pts;
    tCalories + calsOnDay;
  }

  return fPoints;
};

const getUserLevelFromPointPbj = (dayPointObj: { [day: string]: number }) => {
  const allPoints = getUserLevelPointsFromPointObj(dayPointObj);

  // console.log("allPoints", allPoints);
  return getLevelDetailsFromPoints(allPoints);
};

const getUserLevel = (bucket: { [day: string]: Activity[] }, th: number) => {
  const allPoints = getUserLevelPoints(bucket, th);

  // console.log("allPoints", allPoints);
  return getLevelDetailsFromPoints(allPoints);
};

const getLevelDetailsFromPoints = (allPoints: number) => {
  if (allPoints < POINTS_LEVEL_ONE) {
    return {
      userLevel: 0,
      activePoints: allPoints,
      progressV2: allPoints / POINTS_LEVEL_ONE,
    };
  } else if (allPoints >= POINTS_LEVEL_ONE && allPoints < POINTS_LEVEL_TWO) {
    return {
      userLevel: 1,
      activePoints: allPoints,
      progressV2: allPoints / POINTS_LEVEL_TWO,
    };
  } else if (allPoints >= POINTS_LEVEL_TWO && allPoints < POINTS_LEVEL_THREE) {
    return {
      userLevel: 2,
      activePoints: allPoints,
      progressV2: allPoints / POINTS_LEVEL_THREE,
    };
  } else if (allPoints >= POINTS_LEVEL_THREE && allPoints < POINTS_LEVEL_FOUR) {
    return {
      userLevel: 3,
      activePoints: allPoints,
      progressV2: allPoints / POINTS_LEVEL_FOUR,
    };
  } else if (allPoints >= POINTS_LEVEL_FOUR && allPoints < POINTS_LEVEL_FIVE) {
    return {
      userLevel: 4,
      activePoints: allPoints,
      progressV2: allPoints / POINTS_LEVEL_FIVE,
    };
  } else {
    return { userLevel: 5, activePoints: allPoints, progressV2: 1 };
  }
};

export const getPointsToNextLevel = (currentLevel: number) => {
  if (currentLevel === 0) {
    return POINTS_LEVEL_ONE;
  } else if (currentLevel === 1) {
    return POINTS_LEVEL_TWO;
  } else if (currentLevel === 2) {
    return POINTS_LEVEL_THREE;
  } else if (currentLevel === 3) {
    return POINTS_LEVEL_FOUR;
  } else if (currentLevel === 4) {
    return POINTS_LEVEL_FIVE;
  } else {
    return POINTS_LEVEL_ONE;
  }
};
