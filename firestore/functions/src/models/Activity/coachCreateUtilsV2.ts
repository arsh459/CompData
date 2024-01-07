import { UserInterface } from "../User/User";
import { ActivityUserPts, CoachRank } from "./Activity";

export const updateCoachRankV3 = (
  // author: UserInterface,

  dayPointObj: { [day: string]: number },
  weekPointObj: { [week: string]: number },
  dayCalObj: { [day: string]: number },
  weekCalObj: { [week: string]: number },
  monthCalObj: { [month: string]: number },
  monthPointObj: { [month: string]: number },
  // teamName: string,
  // teamKey: string,
  coachRank: CoachRank,
): CoachRank => {
  return {
    ...coachRank,
    dayPointObj: dayPointObj,
    weekPointObj: weekPointObj,
    dayCalObj: dayCalObj,
    weekCalObj: weekCalObj,
    monthPointObj,
    monthCalObj,
    totalCalories: sumValues(dayCalObj),
    totalFitPointsV2: sumValues(dayPointObj),
    numTransformations: sumValues(dayPointObj),
    // teamName,
    // teamKey,
    updatedOn: Date.now(),
  };
};

export const updateCoachRankV2 = (
  author: UserInterface,
  coachEventId: string,
  dayPointObj: { [day: string]: number },
  weekPointObj: { [week: string]: number },
  dayCalObj: { [day: string]: number },
  weekCalObj: { [week: string]: number },
  monthCalObj: { [month: string]: number },
  monthPointObj: { [month: string]: number },
  teamName: string,
  teamKey: string,
  sortedCoachActivityPts: { [month: string]: ActivityUserPts[] },
  coachRank?: CoachRank,
): CoachRank => {
  if (coachRank) {
    return {
      ...coachRank,
      dayPointObj: dayPointObj,
      weekPointObj: weekPointObj,
      dayCalObj: dayCalObj,
      weekCalObj: weekCalObj,
      monthActPts: sortedCoachActivityPts,
      monthPointObj,
      monthCalObj,
      totalCalories: sumValues(dayCalObj),
      totalFitPointsV2: sumValues(dayPointObj),
      numTransformations: sumValues(dayPointObj),
      teamName,
      teamKey,
      updatedOn: Date.now(),
      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),
    };
  } else {
    return {
      rank: -1,
      uid: author.uid,

      totalCalories: sumValues(dayCalObj),
      totalFitPointsV2: sumValues(dayPointObj),
      numTransformations: sumValues(dayPointObj),

      dayCalObj: dayCalObj,
      weekCalObj: weekCalObj,
      monthActPts: sortedCoachActivityPts,
      // taskUIDMap: taskMap,
      dayPointObj: dayPointObj,
      weekPointObj: weekPointObj,
      monthPointObj,
      monthCalObj,
      updatedOn: Date.now(),
      teamName,
      teamKey,

      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),

      prizes: [],
      coachEventId: coachEventId,
    };
  }
};

const sumValues = (numObj: { [day: string]: number }) => {
  let total: number = 0;
  for (const num of Object.values(numObj)) {
    total += num;
  }

  return total;
};
