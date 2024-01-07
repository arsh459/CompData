// import { ONE_WINNER_WEEK_PERIOD } from "../../constants/challenge";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { CoachRank, UserRank } from "./Activity";
// import { getCurrentMonth } from "./handleRanking";

export const reRankUsers_week_FitPointsV2 = (
  rankObjs: UserRank[],
  // after: number,
  rounds: RoundObject[],
  // numPrizes: number,
) => {
  let rankObjsToUse: UserRank[] = rankObjs;
  let allPreviousToppers: { [uid: string]: boolean } = {};

  let j: number = 0;
  for (const round of rounds) {
    const sprintId = round.sprintId;
    const previousSprintId =
      j - 1 >= 0 ? rounds[j - 1]?.sprintId : round.sprintId;
    const weekStringI = round.id;

    // console.log("sprintId", sprintId);
    // console.log("previousSprintId", previousSprintId);
    // console.log("weekStringI", weekStringI);
    // console.log("allPreviousToppers", allPreviousToppers);

    // remove all toppers after week period
    if (previousSprintId !== sprintId) {
      allPreviousToppers = {};
    }

    const rankedForWeekI = weekRankByFitPoint(
      rankObjsToUse,
      weekStringI,
      // round.filter,
    );
    const { purgedRanks, removedRanks } = purgePreviousRankers(
      rankedForWeekI,
      allPreviousToppers,
    );

    // console.log("removedRanks", removedRanks);

    const { weeklyRanked, toppers } = addWeeklyRank(
      purgedRanks,
      weekStringI,
      round.numPrizes,
    );

    // console.log(round.id);
    // console.log("toppers", toppers);

    // console.log("");

    rankObjsToUse = mergePurged(
      weeklyRanked,
      removedRanks,
      weekStringI,
    ) as UserRank[];

    allPreviousToppers = {
      ...allPreviousToppers,
      ...toppers,
    };

    j++;
  }

  // const { numWeeks, weekString } = getCurrentWeek(after, roundLength);

  // for (let i: number = 0; i < numWeeks; i++) {
  //   // console.log("i", i);
  //   const weekStringI = `week-${i}`;

  //   const rankedForWeekI = weekRankByFitPoint(rankObjsToUse, weekStringI);
  //   const { purgedRanks, removedRanks } = purgePreviousRankers(
  //     rankedForWeekI,
  //     allPreviousToppers,
  //   );

  //   const { weeklyRanked, toppers } = addWeeklyRank(
  //     purgedRanks,
  //     weekStringI,
  //     numPrizes,
  //   );
  //   rankObjsToUse = mergePurged(
  //     weeklyRanked,
  //     removedRanks,
  //     weekStringI,
  //   ) as UserRank[];

  //   // remove all toppers after week period
  //   if ((i + 1) % ONE_WINNER_WEEK_PERIOD === 0) {
  //     allPreviousToppers = {};
  //   } else {
  //     allPreviousToppers = {
  //       ...allPreviousToppers,
  //       ...toppers,
  //     };
  //   }
  // }

  return rankObjsToUse;
};

const getPtsForWeeklyRank = (
  userRank: UserRank,
  weekString: string,
  filter?: string,
) => {
  if (filter === "gender:female" && userRank.gender !== "female") {
    return -1;
  }

  if (userRank.weekPointObj && userRank.weekPointObj[weekString]) {
    return userRank.weekPointObj[weekString];
  }

  return 0;
};

const weekRankByFitPoint = (
  userRanks: UserRank[],
  weekString: string,
  filter?: string,
) => {
  return userRanks.sort((a, b) => {
    const aPts = getPtsForWeeklyRank(a, weekString, filter);
    const bPts = getPtsForWeeklyRank(b, weekString, filter);

    return bPts - aPts;

    // return a.weekPointObj &&
    //   b.weekPointObj &&
    //   a.weekPointObj[weekString] &&
    //   b.weekPointObj[weekString] &&
    //   a.weekCalObj &&
    //   b.weekCalObj &&
    //   a.weekCalObj[weekString] &&
    //   b.weekCalObj[weekString]
    //   ? b.weekPointObj[weekString] - a.weekPointObj[weekString] ||
    //       b.weekCalObj[weekString] - a.weekCalObj[weekString]
    //   : a.weekPointObj &&
    //     b.weekPointObj &&
    //     a.weekPointObj[weekString] &&
    //     b.weekPointObj[weekString]
    //   ? b.weekPointObj[weekString] - a.weekPointObj[weekString]
    //   : a.weekPointObj && a.weekPointObj[weekString]
    //   ? -a.weekPointObj[weekString]
    //   : b.weekPointObj && b.weekPointObj[weekString]
    //   ? b.weekPointObj[weekString]
    //   : a.fitPointsV2 && b.fitPointsV2
    //   ? b.fitPointsV2 - a.fitPointsV2
    //   : a.fitPointsV2 && !b.fitPointsV2
    //   ? -a.fitPointsV2
    //   : !a.fitPointsV2 && b.fitPointsV2
    //   ? b.fitPointsV2
    //   : 0;
  });
};

const getPtsForMonthlyRank = (
  userRank: UserRank,
  monthString: string,
  filter?: string,
) => {
  if (filter === "gender:female" && userRank.gender !== "female") {
    return -1;
  }

  if (userRank.monthPointObj && userRank.monthPointObj[monthString]) {
    return userRank.monthPointObj[monthString];
  }

  return 0;
};

const monthRankByFitPoint = (
  userRanks: UserRank[],
  monthString: string,
  filter?: string,
) => {
  return userRanks.sort((a, b) => {
    const aPts = getPtsForMonthlyRank(a, monthString, filter);
    const bPts = getPtsForMonthlyRank(b, monthString, filter);

    return bPts - aPts;

    // return a.monthPointObj &&
    //   b.monthPointObj &&
    //   a.monthPointObj[monthString] &&
    //   b.monthPointObj[monthString] &&
    //   a.monthCalObj &&
    //   b.monthCalObj &&
    //   a.monthCalObj[monthString] &&
    //   b.monthCalObj[monthString]
    //   ? b.monthPointObj[monthString] - a.monthPointObj[monthString] ||
    //       b.monthCalObj[monthString] - a.monthCalObj[monthString]
    //   : a.monthPointObj &&
    //     b.monthPointObj &&
    //     a.monthPointObj[monthString] &&
    //     b.monthPointObj[monthString]
    //   ? b.monthPointObj[monthString] - a.monthPointObj[monthString]
    //   : a.monthPointObj && a.monthPointObj[monthString]
    //   ? -a.monthPointObj[monthString]
    //   : b.monthPointObj && b.monthPointObj[monthString]
    //   ? b.monthPointObj[monthString]
    //   : a.fitPointsV2 && b.fitPointsV2
    //   ? b.fitPointsV2 - a.fitPointsV2
    //   : a.fitPointsV2 && !b.fitPointsV2
    //   ? -a.fitPointsV2
    //   : !a.fitPointsV2 && b.fitPointsV2
    //   ? b.fitPointsV2
    //   : 0;
  });
};

export const purgePreviousRankers = (
  userRanks: (UserRank | CoachRank)[],
  previousToppers: { [uid: string]: boolean },
) => {
  const purgedRanks: (UserRank | CoachRank)[] = [];
  const removedRanks: (UserRank | CoachRank)[] = [];
  //   const toppers: {[uid: string]: boolean} = {};
  for (const userRank of userRanks) {
    if (!previousToppers[userRank.uid]) {
      purgedRanks.push(userRank);
    } else {
      removedRanks.push(userRank);
    }
  }

  return { purgedRanks, removedRanks };
};

export const mergePurged = (
  userRanks: (UserRank | CoachRank)[],
  toppersForPreviousWeek: (UserRank | CoachRank)[],
  weekString: string,
) => {
  for (const topperForWeek of toppersForPreviousWeek) {
    // console.log(
    //   "topper",
    //   topperForWeek.authorName,
    //   userRanks.length,
    //   toppersForPreviousWeek.length,
    // );
    userRanks.push({
      ...topperForWeek,
      weeklyRank: {
        ...(topperForWeek.weeklyRank ? topperForWeek.weeklyRank : {}),
        [weekString]: userRanks.length + toppersForPreviousWeek.length,
      },
    });
  }

  return userRanks;
};

export const addWeeklyRank = (
  userRanks: UserRank[] | CoachRank[],
  weekString: string,
  numPrizes: number,
) => {
  let i: number = 0;
  const weeklyRanked: (UserRank | CoachRank)[] = [];
  const toppers: { [uid: string]: boolean } = {};
  for (const userRank of userRanks) {
    // if (i <= numPrizes) {
    //   console.log(
    //     i + 1,
    //     weekString,
    //     userRank.authorName,
    //     userRank.weekPointObj ? userRank.weekPointObj[weekString] : null,
    //     userRank.weeklyRank ? userRank.weeklyRank[weekString] : null,
    //   );
    // }
    weeklyRanked.push({
      ...userRank,
      weeklyRank: {
        ...(userRank.weeklyRank ? userRank.weeklyRank : {}),
        [weekString]: i + 1,
      },
    });

    if (i <= numPrizes - 1) {
      // console.log("topper", userRank.uid);
      toppers[userRank.uid] = true;
    }

    i++;
  }

  return { weeklyRanked, toppers };
};

export const addMonthlyRank = (
  userRanks: (UserRank | CoachRank)[],
  monthString: string,
) => {
  let i: number = 0;
  const monthlyRanked: (UserRank | CoachRank)[] = [];
  // const toppers: { [uid: string]: boolean } = {};
  for (const userRank of userRanks) {
    monthlyRanked.push({
      ...userRank,
      monthlyRank: {
        ...(userRank.monthlyRank ? userRank.monthlyRank : {}),
        [monthString]: i + 1,
      },
    });

    // if (i <= 2) {
    //   toppers[userRank.uid] = true;
    // }

    i++;
  }

  return { monthlyRanked };
};

export const addWeekRankToCurrent = (
  userRanks: (UserRank | CoachRank)[],
  weekString: string,
) => {
  const currentRankUsers: (UserRank | CoachRank)[] = [];
  for (const userRank of userRanks) {
    currentRankUsers.push({
      ...userRank,
      currentWeekRank:
        userRank?.weeklyRank && userRank?.weeklyRank[weekString]
          ? userRank.weeklyRank[weekString]
          : -1,
    });
  }

  return currentRankUsers;
};

export const reRankUsers_month_FitPointsV2 = (
  userRanks: UserRank[],
  after: number,
  sprints: SprintObject[],
) => {
  // let j: number = 0;
  let rankObjsToUse: UserRank[] = userRanks;
  for (const sprint of sprints) {
    const monthStringI = sprint.id;

    const rankedForMonthI = monthRankByFitPoint(
      rankObjsToUse,
      monthStringI,
      // sprint.filter,
    );
    const { monthlyRanked } = addMonthlyRank(rankedForMonthI, monthStringI);
    rankObjsToUse = monthlyRanked as UserRank[];
  }

  return rankObjsToUse;

  // const { numMonths } = getCurrentMonth(after, sprintLength);

  // for (let i: number = 0; i < numMonths; i++) {
  //   const monthStringI = `month-${i}`;

  //   const rankedForMonthI = monthRankByFitPoint(rankObjsToUse, monthStringI);

  //   const { monthlyRanked } = addMonthlyRank(rankedForMonthI, monthStringI);

  //   // add monthly ranks
  //   rankObjsToUse = monthlyRanked as UserRank[];
  // }

  // return rankObjsToUse;
};
