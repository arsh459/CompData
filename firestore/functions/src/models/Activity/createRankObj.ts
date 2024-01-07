import { countStreaks } from "../Prizes/countStreaks";
import { countStreaksV2 } from "../Prizes/countStreaksV2";
import { getWeeklyBucketForUser } from "../Prizes/getPodiumFinishes";
import { createDayStringCalorieObject } from "../Prizes/getStreakPrize";
import { calculateAvgSpeed } from "../Prizes/speed";
import { UserInterface } from "../User/User";
import { Activity, UserRank } from "./Activity";

export const createRankObjForActivities = (
  activities: Activity[],
  author: UserInterface,
  th: number,
  challengeLength: number,
  streakLength: number,
  after: number,
  eventId: string,
  communityId: string,
  coachEventId: string,
  coachCohortId: string,
): UserRank | undefined => {
  // if (activities.length > 0) {
  const dayCals = createDayStringCalorieObject(activities);
  const weekCalObj = getWeeklyBucketForUser(
    dayCals,
    challengeLength,
    after,
    [],
    // [],
  );

  // console.log(
  //   "Day cals sum",
  //   Object.values(dayCals).reduce((a, b) => a + b),
  //   0,
  // );
  // console.log(
  //   "weekCalObj sum",
  //   Object.values(weekCalObj).reduce((a, b) => a + b),
  //   0,
  // );
  // console.log("sumCalories(activities)", sumCalories(activities));

  const numStreaks = countStreaks(
    dayCals,
    th,
    after,
    challengeLength,
    streakLength,
    author.name ? author.name : "key",
  );

  const { scoreMinCal, weekCalMin } = countStreaksV2(dayCals, th, after);

  const { avgSpeed, totalDistance } = calculateAvgSpeed(activities);

  return {
    rank: -1,
    communityRank: -1,
    uid: author.uid,
    scoreMinCal: scoreMinCal,
    weekCalMin: weekCalMin,

    coachCommunityId: communityId,
    coachEventId: coachEventId,
    coachCohortId: coachCohortId,
    eventId: eventId,

    totalCalories: sumCalories(activities),
    totalFitPoints: sumFitPoints(activities),
    updatedOn: Date.now(),

    numActivities: activities.length,

    ...(author.name ? { authorName: author.name } : {}),
    ...(author.profileImage ? { authorImg: author.profileImage } : {}),

    prizes: [],

    dayCalObj: dayCals,
    weekCalObj: weekCalObj,
    numStreaks,
    avgSpeed,
    totalDistance,
    teamName: "",
    teamKey: "",
    gender: author.gender ? author.gender : "notSpecified",
  };
  // }

  // return undefined;
};

const sumCalories = (activities: Activity[]) => {
  let sum: number = 0;
  for (const act of activities) {
    sum += act.calories ? act.calories : 0;
  }

  return sum;
};

const sumFitPoints = (activities: Activity[]) => {
  let sum: number = 0;
  for (const act of activities) {
    sum += act.fitPoints ? act.fitPoints : 0;
  }

  return sum;
};
