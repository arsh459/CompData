// import { ONE_WINNER_WEEK_PERIOD } from "../../constants/challenge";
import { COACH_WEEKLY_PRIZES } from "../../constants/challenge";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { CoachRank } from "./Activity";
// import { getCurrentMonth } from "./handleRanking";
import {
  addMonthlyRank,
  addWeeklyRank,
  // addWeekRankToCurrent,
  mergePurged,
  purgePreviousRankers,
} from "./handleRankingV2";

export const reRankCoaches_week_FitPointsV2 = (
  rankObjs: CoachRank[],
  // after: number,
  rounds: RoundObject[],
  // numPrizes: number,
) => {
  // const { numWeeks, weekString } = getCurrentWeek(after, roundLength);
  //   console.log("numWeeks", numWeeks);
  //   console.log("weekString", weekString);
  //   console.log("rankObjs", rankObjs.length);
  let rankObjsToUse: CoachRank[] = rankObjs;
  let allPreviousToppers: { [uid: string]: boolean } = {};
  let j: number = 0;
  for (const round of rounds) {
    const weekStringI = round.id;
    const currentSprint = round.sprintId;
    const previousSprintId =
      j - 1 >= 0 ? rounds[j - 1]?.sprintId : round.sprintId;

    if (currentSprint !== previousSprintId) {
      allPreviousToppers = {};
    }

    const rankedForWeekI = coachWeekRankByFitPoint(rankObjsToUse, weekStringI);
    const { purgedRanks, removedRanks } = purgePreviousRankers(
      rankedForWeekI,
      allPreviousToppers,
    );
    const { weeklyRanked, toppers } = addWeeklyRank(
      purgedRanks,
      weekStringI,
      round.numCoachPrizes ? round.numCoachPrizes : COACH_WEEKLY_PRIZES,
    );

    rankObjsToUse = mergePurged(weeklyRanked, removedRanks, weekStringI);

    allPreviousToppers = {
      ...allPreviousToppers,
      ...toppers,
    };

    j++;
  }

  return rankObjsToUse;

  // for (let i: number = 0; i < numWeeks; i++) {
  //   // console.log("i", i);
  //   const weekStringI = `week-${i}`;

  //   // console.log("weekStringI", weekStringI);

  //   const rankedForWeekI = coachWeekRankByFitPoint(rankObjsToUse, weekStringI);
  //   const { purgedRanks, removedRanks } = purgePreviousRankers(
  //     rankedForWeekI,
  //     allPreviousToppers,
  //   );

  //   // console.log("purgedRanks", purgedRanks.length);
  //   // console.log("removedRanks", removedRanks.length);

  //   const { weeklyRanked, toppers } = addWeeklyRank(
  //     purgedRanks,
  //     weekStringI,
  //     numPrizes,
  //   );
  //   rankObjsToUse = mergePurged(weeklyRanked, removedRanks, weekStringI);

  //   // remove all toppers after week period
  //   if ((i + 1) % ONE_WINNER_WEEK_PERIOD === 0) {
  //     allPreviousToppers = {};
  //   } else {
  //     allPreviousToppers = {
  //       ...allPreviousToppers,
  //       ...toppers,
  //     };
  //   }

  //   // console.log("rankObjsToUse", rankObjsToUse.length);

  //   // console.log("toppers", toppers);

  //   // console.log("newRanks", newRanks);
  //   // }
  // }

  // return addWeekRankToCurrent(rankObjsToUse, weekString);

  // console.log("weekString", weekString);
  // console.log("previousWeeks", previousWeeks);

  // const prevToppers = getPreviousToppers_FitPoints(rankObjs, previousWeeks);

  // console.log("allPreviousToppers", allPreviousToppers);
};

const coachWeekRankByFitPoint = (
  userRanks: CoachRank[],
  weekString: string,
) => {
  return userRanks.sort((a, b) =>
    a.weekPointObj &&
    b.weekPointObj &&
    a.weekPointObj[weekString] &&
    b.weekPointObj[weekString] &&
    a.weekCalObj &&
    b.weekCalObj &&
    a.weekCalObj[weekString] &&
    b.weekCalObj[weekString]
      ? b.weekPointObj[weekString] - a.weekPointObj[weekString] ||
        b.weekCalObj[weekString] - a.weekCalObj[weekString]
      : a.weekPointObj &&
        b.weekPointObj &&
        a.weekPointObj[weekString] &&
        b.weekPointObj[weekString]
      ? b.weekPointObj[weekString] - a.weekPointObj[weekString]
      : a.weekPointObj && a.weekPointObj[weekString]
      ? -a.weekPointObj[weekString]
      : b.weekPointObj && b.weekPointObj[weekString]
      ? b.weekPointObj[weekString]
      : a.totalFitPointsV2 && b.totalFitPointsV2
      ? b.totalFitPointsV2 - a.totalFitPointsV2
      : a.totalFitPointsV2 && !b.totalFitPointsV2
      ? -a.totalFitPointsV2
      : !a.totalFitPointsV2 && b.totalFitPointsV2
      ? b.totalFitPointsV2
      : 0,
  );
};

const coachMonthRankByFitPoint = (
  userRanks: CoachRank[],
  monthString: string,
) => {
  return userRanks.sort((a, b) =>
    a.monthPointObj &&
    b.monthPointObj &&
    a.monthPointObj[monthString] &&
    b.monthPointObj[monthString] &&
    a.monthCalObj &&
    b.monthCalObj &&
    a.monthCalObj[monthString] &&
    b.monthCalObj[monthString]
      ? b.monthPointObj[monthString] - a.monthPointObj[monthString] ||
        b.monthCalObj[monthString] - a.monthCalObj[monthString]
      : a.monthPointObj &&
        b.monthPointObj &&
        a.monthPointObj[monthString] &&
        b.monthPointObj[monthString]
      ? b.monthPointObj[monthString] - a.monthPointObj[monthString]
      : a.monthPointObj && a.monthPointObj[monthString]
      ? -a.monthPointObj[monthString]
      : b.monthPointObj && b.monthPointObj[monthString]
      ? b.monthPointObj[monthString]
      : a.totalFitPointsV2 && b.totalFitPointsV2
      ? b.totalFitPointsV2 - a.totalFitPointsV2
      : a.totalFitPointsV2 && !b.totalFitPointsV2
      ? -a.totalFitPointsV2
      : !a.totalFitPointsV2 && b.totalFitPointsV2
      ? b.totalFitPointsV2
      : 0,
  );
};

export const reRankCoaches_month_FitPointsV2 = (
  coachRanks: CoachRank[],
  // after: number,
  sprints: SprintObject[],
) => {
  let rankObjsToUse: CoachRank[] = coachRanks;
  // let j: number = 0;
  for (const sprint of sprints) {
    const monthStringI = sprint.id;

    const rankedForMonthI = coachMonthRankByFitPoint(
      rankObjsToUse,
      monthStringI,
    );

    const { monthlyRanked } = addMonthlyRank(rankedForMonthI, monthStringI);

    rankObjsToUse = monthlyRanked;
  }

  return rankObjsToUse;

  // const { numMonths } = getCurrentMonth(after, sprintLength);

  // for (let i: number = 0; i < numMonths; i++) {
  //   const monthStringI = `month-${i}`;

  //   const rankedForMonthI = coachMonthRankByFitPoint(
  //     rankObjsToUse,
  //     monthStringI,
  //   );

  //   const { monthlyRanked } = addMonthlyRank(rankedForMonthI, monthStringI);

  //   // add monthly ranks
  //   rankObjsToUse = monthlyRanked;
  // }

  // return rankObjsToUse;
};
