import { CoachRank, UserRank } from "./Activity";

const coachRankingAlgo = (
  aTrans?: number,
  bTrans?: number,
  aCals?: number,
  bCals?: number,
) => {
  if (aTrans && bTrans && aCals && bCals) {
    if (aTrans === bTrans) {
      return bCals - aCals;
    } else {
      return bTrans - aTrans;
    }
  } else if (aTrans && !bTrans) {
    return -aTrans;
  } else if (!aTrans && bTrans) {
    return bTrans;
  } else if (!aTrans && !bTrans) {
    if (aCals && bCals) {
      return bCals - aCals;
    } else if (aCals && !bCals) {
      return -aCals;
    } else if (!aCals && bCals) {
      return bCals;
    }
  }

  return 0;
};

// const coachRankingAlgoV2 = (
//   aPoints?: number,
//   bPoints?: number,
//   aCals?: number,
//   bCals?: number,
// ) => {
//   if (aPoints && bPoints && aCals && bCals) {
//     if (aPoints === bPoints) {
//       return bCals - aCals;
//     } else {
//       return bPoints - aPoints;
//     }
//   } else if (aPoints && !bPoints) {
//     return -aPoints;
//   } else if (!aPoints && bPoints) {
//     return bPoints;
//   } else if (!aPoints && !bPoints) {
//     if (aCals && bCals) {
//       return bCals - aCals;
//     } else if (aCals && !bCals) {
//       return -aCals;
//     } else if (!aCals && bCals) {
//       return bCals;
//     }
//   }

//   return 0;
// };

export const rankCoaches = (coaches: CoachRank[]) => {
  coaches.sort((a, b) =>
    coachRankingAlgo(
      a.numTransformations,
      b.numTransformations,
      a.totalCalories,
      b.totalCalories,
    ),
  );

  const reRanked: CoachRank[] = [];
  for (let i: number = 0; i < coaches.length; i++) {
    reRanked.push({
      ...coaches[i],
      rank: i + 1,
    });
  }

  return reRanked;
};

export const rankCoachesPoints = (coaches: CoachRank[]) => {
  coaches.sort(
    (a, b) =>
      a.totalFitPointsV2 &&
      b.totalFitPointsV2 &&
      a.totalCalories &&
      b.totalCalories
        ? b.totalFitPointsV2 - a.totalFitPointsV2 ||
          b.totalCalories - a.totalCalories
        : a.totalFitPointsV2 && b.totalFitPointsV2
        ? b.totalFitPointsV2 - a.totalFitPointsV2
        : a.totalFitPointsV2 && !b.totalFitPointsV2
        ? -a.totalFitPointsV2
        : !a.totalFitPointsV2 && b.totalFitPointsV2
        ? b.totalFitPointsV2
        : 0,
    // coachRankingAlgo(
    //   a.totalFitPointsV2,
    //   b.totalFitPointsV2,
    //   a.numTransformations,
    //   b.numTransformations,
    // ),
  );

  const reRanked: CoachRank[] = [];
  for (let i: number = 0; i < coaches.length; i++) {
    reRanked.push({
      ...coaches[i],
      rank: i + 1,
    });
  }

  return reRanked;
};

export const rankCoaches_streak = (coaches: CoachRank[]) => {
  coaches.sort((a, b) =>
    coachRankingAlgo(
      a.numTotalStreaks,
      b.numTotalStreaks,
      a.totalCalories,
      b.totalCalories,
    ),
  );

  const reRanked: CoachRank[] = [];
  for (let i: number = 0; i < coaches.length; i++) {
    reRanked.push({
      ...coaches[i],
      streakRank: i + 1,
    });
  }

  return reRanked;
};

// export const reRankCoachesPoints_week = (
//   coaches: CoachRank[],
//   after: number,
// ) => {
//   const { weekString } = getCurrentWeek(after);

//   coaches.sort((a, b) =>
//     a.weekPointObj &&
//     b.weekPointObj &&
//     a.weekPointObj[weekString] &&
//     b.weekPointObj[weekString]
//       ? b.weekPointObj[weekString] - a.weekPointObj[weekString]
//       : a.weekPointObj && a.weekPointObj[weekString]
//       ? -a.weekPointObj[weekString]
//       : b.weekPointObj && b.weekPointObj[weekString]
//       ? b.weekPointObj[weekString]
//       : a.totalFitPoints && b.totalFitPoints
//       ? b.totalFitPoints - a.totalFitPoints
//       : a.totalFitPoints && !b.totalFitPoints
//       ? -a.totalFitPoints
//       : !a.totalFitPoints && b.totalFitPoints
//       ? b.totalFitPoints
//       : 0,
//   );

//   const reRanked_week: CoachRank[] = [];
//   for (let i: number = 0; i < coaches.length; i++) {
//     // console.log("coach", coaches[i].authorName, i);
//     reRanked_week.push({
//       ...coaches[i],
//       currentWeekRank: i + 1,
//     });
//   }

//   return reRanked_week;
// };

export const reRankCoaches_week = (
  coaches: CoachRank[],
  after: number,
  roundLength: number,
) => {
  const { weekString } = getCurrentWeek(after, roundLength);

  coaches.sort((a, b) =>
    a.weekCalMin &&
    b.weekCalMin &&
    a.weekCalMin[weekString] &&
    b.weekCalMin[weekString]
      ? b.weekCalMin[weekString] - a.weekCalMin[weekString]
      : a.weekCalMin && a.weekCalMin[weekString]
      ? -a.weekCalMin[weekString]
      : b.weekCalMin && b.weekCalMin[weekString]
      ? b.weekCalMin[weekString]
      : a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  const reRanked_week: CoachRank[] = [];
  for (let i: number = 0; i < coaches.length; i++) {
    // console.log("coach", coaches[i].authorName, i);
    reRanked_week.push({
      ...coaches[i],
      currentWeekRank: i + 1,
    });
  }

  return reRanked_week;
};

export const reRankUsers_FitPoints = (rankObjs: UserRank[]) => {
  rankObjs.sort((a, b) =>
    a.fitPointsV2 && b.fitPointsV2 && a.totalCalories && b.totalCalories
      ? b.fitPointsV2 - a.fitPointsV2 || b.totalCalories - a.totalCalories
      : a.fitPointsV2 && b.fitPointsV2
      ? b.fitPointsV2 - a.fitPointsV2
      : a.fitPointsV2 && !b.fitPointsV2
      ? -a.fitPointsV2
      : !a.fitPointsV2 && b.fitPointsV2
      ? b.fitPointsV2
      : 0,
  );

  const communityRanks: { [communityId: string]: number } = {};
  const reRanked: UserRank[] = [];
  for (let i: number = 0; i < rankObjs.length; i++) {
    if (communityRanks[rankObjs[i].coachCommunityId]) {
      reRanked.push({
        ...rankObjs[i],
        rank: i + 1,
        // communityRank: communityRanks[rankObjs[i].coachCommunityId] + 1,
      });

      communityRanks[rankObjs[i].coachCommunityId] += 1;
    } else {
      reRanked.push({
        ...rankObjs[i],
        rank: i + 1,
        // communityRank: 1,
      });

      communityRanks[rankObjs[i].coachCommunityId] = 1;
    }
  }

  return reRanked;
};

export const reRankUsers = (rankObjs: UserRank[]) => {
  rankObjs.sort((a, b) =>
    a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  const communityRanks: { [communityId: string]: number } = {};
  const reRanked: UserRank[] = [];
  for (let i: number = 0; i < rankObjs.length; i++) {
    if (communityRanks[rankObjs[i].coachCommunityId]) {
      reRanked.push({
        ...rankObjs[i],
        rank: i + 1,
        communityRank: communityRanks[rankObjs[i].coachCommunityId] + 1,
      });

      communityRanks[rankObjs[i].coachCommunityId] += 1;
    } else {
      reRanked.push({
        ...rankObjs[i],
        rank: i + 1,
        communityRank: 1,
      });

      communityRanks[rankObjs[i].coachCommunityId] = 1;
    }
  }

  return reRanked;
};

export const reRankUsers_streak = (rankObjs: UserRank[]) => {
  rankObjs.sort((a, b) =>
    a.numStreaks && b.numStreaks
      ? b.numStreaks - a.numStreaks
      : a.numStreaks && !b.numStreaks
      ? -a.numStreaks
      : !a.numStreaks && b.numStreaks
      ? b.numStreaks
      : a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  const reRanked_streak: UserRank[] = [];
  for (let i: number = 0; i < rankObjs.length; i++) {
    reRanked_streak.push({
      ...rankObjs[i],
      streakRank: i + 1,
    });
  }

  return reRanked_streak;
};

export const reRankUsers_speed = (rankObjs: UserRank[]) => {
  rankObjs.sort((a, b) =>
    a.avgSpeed && b.avgSpeed
      ? b.avgSpeed - a.avgSpeed
      : a.avgSpeed && !b.avgSpeed
      ? -a.avgSpeed
      : !a.avgSpeed && b.avgSpeed
      ? b.avgSpeed
      : a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  const reRanked_streak: UserRank[] = [];
  for (let i: number = 0; i < rankObjs.length; i++) {
    reRanked_streak.push({
      ...rankObjs[i],
      avgSpeedRank: i + 1,
    });
  }

  return reRanked_streak;
};

export const reRankUsers_distance = (rankObjs: UserRank[]) => {
  rankObjs.sort((a, b) =>
    a.totalDistance && b.totalDistance
      ? b.totalDistance - a.totalDistance
      : a.totalDistance && !b.totalDistance
      ? -a.totalDistance
      : !a.totalDistance && b.totalDistance
      ? b.totalDistance
      : a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  const reRanked_streak: UserRank[] = [];
  for (let i: number = 0; i < rankObjs.length; i++) {
    reRanked_streak.push({
      ...rankObjs[i],
      distanceRank: i + 1,
    });
  }

  return reRanked_streak;
};

export const reRankUsers_week = (
  rankObjs: UserRank[],
  after: number,
  roundLength: number,
) => {
  const { weekString, previousWeeks } = getCurrentWeek(after, roundLength);

  // console.log("weekString", weekString);
  // console.log("previousWeeks", previousWeeks);

  const prevToppers = getPreviousToppers(rankObjs, previousWeeks);

  // console.log("prevToppers", prevToppers);

  const sortedRanks = rankForWeek(rankObjs, weekString);

  const reRanked_week: UserRank[] = [];
  let j = 0;
  for (let i: number = 0; i < sortedRanks.length; i++) {
    if (!prevToppers[sortedRanks[i].uid]) {
      reRanked_week.push({
        ...rankObjs[i],
        currentWeekRank: j + 1,
      });

      j++;
    } else {
      reRanked_week.push({
        ...rankObjs[i],
        currentWeekRank: sortedRanks.length,
      });
    }
  }

  return reRanked_week;
};

// const handleRankersForWeek = (
//   ranks: UserRank[],
//   week: string,
//   prevToppers: { [uid: string]: boolean },
// ) => {
//   const rankedForWeek = rankForWeek_FitPoints(ranks, week);

//   const reRanked_week: UserRank[] = [];
//   let j = 0;
//   for (let i: number = 0; i < rankedForWeek.length; i++) {
//     if (!prevToppers[rankedForWeek[i].uid]) {
//       reRanked_week.push({
//         ...rankedForWeek[i],
//         currentWeekRank: j + 1,
//       });

//       j++;
//     } else {
//       reRanked_week.push({
//         ...rankedForWeek[i],
//         currentWeekRank: rankedForWeek.length,
//       });
//     }
//   }

//   const newRanks: { [uid: string]: boolean } = {};
//   if (reRanked_week[0] && reRanked_week[0].rank !== rankedForWeek.length) {
//     newRanks[reRanked_week[0].uid] = true;
//   }

//   if (reRanked_week[1] && reRanked_week[1].rank !== rankedForWeek.length) {
//     newRanks[reRanked_week[1].uid] = true;
//   }

//   if (reRanked_week[2] && reRanked_week[2].rank !== rankedForWeek.length) {
//     newRanks[reRanked_week[2].uid] = true;
//   }

//   return newRanks;
// };

// export const reRankUsers_week_FitPoints = (
//   rankObjs: UserRank[],
//   after: number,
// ) => {
//   const { weekString, previousWeeks } = getCurrentWeek(after);

//   // console.log("weekString", weekString);
//   // console.log("previousWeeks", previousWeeks);

//   const prevToppers = getPreviousToppers_FitPoints(rankObjs, previousWeeks);

//   // console.log("prevToppers", prevToppers);

//   const sortedRanks = rankForWeek_FitPoints(rankObjs, weekString);

//   const reRanked_week: UserRank[] = [];
//   let j = 0;
//   for (let i: number = 0; i < sortedRanks.length; i++) {
//     if (!prevToppers[sortedRanks[i].uid]) {
//       reRanked_week.push({
//         ...rankObjs[i],
//         currentWeekRank: j + 1,
//       });

//       j++;
//     } else {
//       reRanked_week.push({
//         ...rankObjs[i],
//         currentWeekRank: sortedRanks.length,
//       });
//     }
//   }

//   return reRanked_week;
// };

// const rankForWeek_FitPoints = (userRanks: UserRank[], weekString: string) => {
//   userRanks.sort((a, b) =>
//     a.weekPointObj &&
//     b.weekPointObj &&
//     a.weekPointObj[weekString] &&
//     b.weekPointObj[weekString] &&
//     a.weekCalObj &&
//     b.weekCalObj &&
//     a.weekCalObj[weekString] &&
//     b.weekCalObj[weekString]
//       ? b.weekPointObj[weekString] - a.weekPointObj[weekString] ||
//         b.weekCalObj[weekString] - a.weekCalObj[weekString]
//       : a.weekPointObj &&
//         b.weekPointObj &&
//         a.weekPointObj[weekString] &&
//         b.weekPointObj[weekString]
//       ? b.weekPointObj[weekString] - a.weekPointObj[weekString]
//       : a.weekPointObj && a.weekPointObj[weekString]
//       ? -a.weekPointObj[weekString]
//       : b.weekPointObj && b.weekPointObj[weekString]
//       ? b.weekPointObj[weekString]
//       : a.fitPointsV2 && b.fitPointsV2
//       ? b.fitPointsV2 - a.fitPointsV2
//       : a.fitPointsV2 && !b.fitPointsV2
//       ? -a.fitPointsV2
//       : !a.fitPointsV2 && b.fitPointsV2
//       ? b.fitPointsV2
//       : 0,
//   );

//   return userRanks;
// };

const rankForWeek = (userRanks: UserRank[], weekString: string) => {
  userRanks.sort((a, b) =>
    a.weekCalObj &&
    b.weekCalObj &&
    a.weekCalObj[weekString] &&
    b.weekCalObj[weekString]
      ? b.weekCalObj[weekString] - a.weekCalObj[weekString]
      : a.weekCalObj && a.weekCalObj[weekString]
      ? -a.weekCalObj[weekString]
      : b.weekCalObj && b.weekCalObj[weekString]
      ? b.weekCalObj[weekString]
      : a.totalCalories && b.totalCalories
      ? b.totalCalories - a.totalCalories
      : a.totalCalories && !b.totalCalories
      ? -a.totalCalories
      : !a.totalCalories && b.totalCalories
      ? b.totalCalories
      : 0,
  );

  // const reRanked_week: UserRank[] = [];
  // for (let i: number = 0; i < userRanks.length; i++) {
  //   reRanked_week.push({
  //     ...userRanks[i],
  //     currentWeekRank: i + 1,
  //   });
  // }

  return userRanks;
};

// const getPreviousToppers_FitPoints = (
//   userRanks: UserRank[],
//   weeks: string[],
// ) => {
//   const previousToppers: { [uid: string]: boolean } = {};

//   for (const week of weeks) {
//     const reRanked = rankForWeek_FitPoints(userRanks, week);

//     let i = 0;
//     for (const user of reRanked) {
//       if (i === 3) {
//         break;
//       }

//       if (!previousToppers[user.uid]) {
//         previousToppers[user.uid] = true;
//         i++;
//       }
//     }
//   }

//   return previousToppers;
// };

const getPreviousToppers = (userRanks: UserRank[], weeks: string[]) => {
  const previousToppers: { [uid: string]: boolean } = {};

  for (const week of weeks) {
    const reRanked = rankForWeek(userRanks, week);

    let i = 0;
    for (const user of reRanked) {
      if (i === 3) {
        break;
      }

      if (!previousToppers[user.uid]) {
        previousToppers[user.uid] = true;
        i++;
      }
    }
  }

  return previousToppers;
};

export const getCurrentWeek = (
  challengeStarts: number,
  roundLength: number,
) => {
  const now = Date.now();
  const weeks = Math.floor(
    (now - challengeStarts) / (roundLength * 24 * 60 * 60 * 1000),
  );

  const previousWeeks: string[] = [];
  for (let i = 0; i < weeks; i++) {
    if (i !== weeks) {
      previousWeeks.push(`week-${i}`);
    }
  }

  return {
    weekString: `week-${weeks}`,
    previousWeeks: previousWeeks,
    numWeeks: weeks + 1,
  };
};

export const getCurrentMonth = (
  challengeStarts: number,
  roundLength: number,
) => {
  const now = Date.now();
  const months = Math.floor(
    (now - challengeStarts) / (roundLength * 24 * 60 * 60 * 1000),
  );

  const previousMonths: string[] = [];
  for (let i = 0; i < months; i++) {
    if (i !== months) {
      previousMonths.push(`month-${i}`);
    }
  }

  return {
    monthString: `month-${months}`,
    previousMonths: previousMonths,
    numMonths: months + 1,
  };
};

// const getPreviousWeekStrings = (weeks: number) => {
//   // const now = Date.now();
//   // const weeks = Math.floor((now - challengeStarts) / (7 * 24 * 60 * 60 * 1000));

//   const previousWeeks: string[] = [];
//   for (let i = 0; i < weeks; i++) {
//     if (i !== weeks) {
//       previousWeeks.push(`week-${i}`);
//     }
//   }

//   return previousWeeks;
// };

/**
 * weekPointsObj
 * week-0, prev
 * Rank
 *
 * week-1, prev
 * Rank
 *
 */
