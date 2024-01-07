import { UserRank } from "../../../models/Activity/Activity";
import { getUserRankForUID } from "../../../models/Activity/getUtils";
import {
  // getCurrentWeekV2,
  getCurrentWeekV3,
} from "../../../models/Prizes/getChallengeStats";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import { getDayBucket } from "../refreshUserLevels/handleUserLevelReconcile";
import * as functions from "firebase-functions";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";

export const incrementForGames = async (
  gameId: string,
  userDeltas: { [uid: string]: { [day: string]: number } },
  sprints: SprintObject[],
  rounds: RoundObject[],
  eventStarts: number,
) => {
  let reads: number = 0;
  const updatedUserRanks: UserRank[] = [];
  // loop over users
  for (const uid of Object.keys(userDeltas)) {
    if (Object.keys(userDeltas[uid]).length) {
      const updatedRank = await incrementForRank(
        gameId,
        uid,
        userDeltas[uid],
        sprints,
        rounds,
        eventStarts,
      );

      if (updatedRank) {
        reads += 1;
        updatedUserRanks.push(updatedRank);
      }
    }
  }

  console.log("RANK READS:", reads);

  return updatedUserRanks;
};

const incrementForRank = async (
  gameId: string,
  uid: string,
  deltas: { [day: string]: number },
  sprints: SprintObject[],
  rounds: RoundObject[],
  eventStarts: number,
): Promise<UserRank | undefined> => {
  const userRank = await getUserRankForUID(gameId, uid);

  if (userRank) {
    const {
      dayCalObj,
      dayPointObj,
      weekCalObj,
      weekPointObj,
      monthCalObj,
      monthPointObj,
      totalCalories,
      totalFitPointsV2,
    } = getUpdatedDayObjsForUser(
      userRank,
      deltas,
      eventStarts,
      sprints,
      rounds,
    );

    // console.log(dayCalObj);
    // throw new Error("HI");

    return {
      ...userRank,
      totalCalories: totalCalories,
      fitPointsV2: totalFitPointsV2,
      dayCalObj,
      dayPointObj,
      weekCalObj,
      weekPointObj,
      monthCalObj,
      monthPointObj,
      updatedOn: Date.now(),
    };
  } else {
    // const user = await getUserById(uid);
    // getDaysElapsed(eventStarts, )
    return undefined;
  }
};

const getUpdatedDayObjsForUser = (
  userRank: UserRank,
  deltas: { [day: string]: number },
  eventStarts: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  // uid: string,
) => {
  let dayCalObj = userRank.dayCalObj ? userRank.dayCalObj : {};
  let totalCalories: number = userRank.totalCalories
    ? userRank.totalCalories
    : 0;
  let totalFitPointsV2: number = userRank.fitPointsV2
    ? userRank.fitPointsV2
    : 0;
  let dayPointObj = userRank.dayPointObj ? userRank.dayPointObj : {};
  let weekCalObj = userRank.weekCalObj ? userRank.weekCalObj : {};
  let weekPointObj = userRank.weekPointObj ? userRank.weekPointObj : {};
  let monthCalObj = userRank.monthCalObj ? userRank.monthCalObj : {};
  let monthPointObj = userRank.monthPointObj ? userRank.monthPointObj : {};

  // console.log("us", userRank.dayCalObj);
  // console.log("us2", dayCalObj);

  for (const day of Object.keys(deltas)) {
    const intUnix = Number.parseInt(day);
    const daysElapsed = getDaysElapsed(eventStarts, intUnix);

    const { month, week } = getCurrentWeekV3(sprints, rounds, daysElapsed);

    if (month >= 0 && week >= 0) {
      const currentWeek = `week-${week}`;
      const currentMonth = `month-${month}`;

      const dayBucket = getDayBucket(intUnix);
      const deltaCals = deltas[day];

      let deltaPoints = 0;
      if (deltas[day] < 0) {
        deltaPoints = -Math.floor(Math.abs(deltas[day]) / 300);
      } else {
        deltaPoints = Math.floor(Math.abs(deltas[day]) / 300);
      }

      functions.logger.log(
        `uid:${userRank.uid}`,
        `day:${dayBucket}`,
        `daysElapsed:${daysElapsed}`,
        `currentMonth:${currentMonth}`,
        `currentWeek:${currentWeek}`,
        `currentCal:${dayCalObj[dayBucket]}`,
        `deltaCals:${deltaCals}`,
        `currentPoint:${dayPointObj[dayBucket]}`,
        `deltaPoints:${deltaPoints}`,
      );

      totalCalories += deltaCals;
      totalFitPointsV2 += deltaPoints;

      dayCalObj = {
        ...dayCalObj,
        [dayBucket]: dayCalObj[dayBucket]
          ? dayCalObj[dayBucket] + deltaCals
          : deltaCals,
      };

      dayPointObj = {
        ...dayPointObj,
        [dayBucket]: dayPointObj[dayBucket]
          ? dayPointObj[dayBucket] + deltaPoints
          : deltaPoints,
      };

      weekCalObj = {
        ...weekCalObj,
        [currentWeek]: weekCalObj[currentWeek]
          ? weekCalObj[currentWeek] + deltaCals
          : deltaCals,
      };

      weekPointObj = {
        ...weekPointObj,
        [currentWeek]: weekPointObj[currentWeek]
          ? weekPointObj[currentWeek] + deltaPoints
          : deltaPoints,
      };

      monthCalObj = {
        ...monthCalObj,
        [currentMonth]: monthCalObj[currentMonth]
          ? monthCalObj[currentMonth] + deltaCals
          : deltaCals,
      };

      monthPointObj = {
        ...monthPointObj,
        [currentMonth]: monthPointObj[currentMonth]
          ? monthPointObj[currentMonth] + deltaPoints
          : deltaPoints,
      };
    }
  }

  return {
    dayCalObj,
    dayPointObj,
    weekCalObj,
    weekPointObj,
    monthCalObj,
    monthPointObj,
    totalCalories,
    totalFitPointsV2,
  };
};
