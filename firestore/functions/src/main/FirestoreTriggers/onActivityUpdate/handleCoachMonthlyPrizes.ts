import { CoachPrizes, CoachRank } from "../../../models/Activity/Activity";
import {
  createPrize,
  deletePrize,
  getMonthlyPrizeFromDb,
  savePrize,
  updatePrize,
} from "../../../models/Prizes/createUtils";
import { getUserById } from "../../../models/User/Methods";

export const handleMonthlyCoachRankWrapper = async (
  monthlyPrizes: CoachPrizes,
  parentId: string,
  isTeamAward: boolean,
  eventSize: number,
) => {
  for (const month of Object.keys(monthlyPrizes)) {
    // console.log("week", week);
    // console.log("1st", weeklyPrizes[week].first);
    // console.log("2nd", weeklyPrizes[week].second);
    // console.log("3rd", weeklyPrizes[week].third);
    await handleCoachMonthlyRank(
      parentId,
      month,
      1,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].first,
    );
    await handleCoachMonthlyRank(
      parentId,
      month,
      2,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].second,
    );
    await handleCoachMonthlyRank(
      parentId,
      month,
      3,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].third,
    );
  }
};

const handleCoachMonthlyRank = async (
  parentId: string,
  month: string,
  rank: number,
  eventSize: number,
  isTeamAward: boolean,
  user?: CoachRank,
) => {
  if (user) {
    // console.log("rank exists", rank, user.authorName);
    await handleCoachMonthRankPrize(
      user,
      rank,
      eventSize,
      parentId,
      true,
      month,
      isTeamAward,
    );
  } else {
    // console.log("rank does not exist", rank);
    const remoteWeekAward = await getMonthlyPrizeFromDb(
      rank,
      parentId,
      isTeamAward,
      month,
    );

    // console.log("remoteWeekAward previous", remoteWeekAward?.awardedToName);

    if (remoteWeekAward) {
      await deletePrize(remoteWeekAward);
    }
  }
};

const handleCoachMonthRankPrize = async (
  coachRank: CoachRank,
  rank: number,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
  month: string,
  isTeamAward: boolean,
) => {
  const remotePrize = await getMonthlyPrizeFromDb(
    rank,
    parentId,
    isTeamAward,
    month,
  );
  // console.log("remote prize now", remotePrize?.prizeName);

  if (!remotePrize) {
    const coach = await getUserById(coachRank.uid);
    const prize = createPrize(
      parentId,
      coachRank.uid,
      coachRank.coachEventId,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      coachRank.uid,
      coachRank?.authorName ? coachRank.authorName : "",
      isAtStake,
      "monthlyRank",
      isTeamAward,
      undefined,
      undefined,
      undefined,
      //   month,
    );

    // console.log("new prize", prize);

    await savePrize(prize);
  } else {
    const coach = await getUserById(coachRank.uid);
    const updatedPrize = updatePrize(
      remotePrize,
      coachRank.uid,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      coachRank.uid,
      coachRank.authorName ? coachRank.authorName : "",
      isAtStake,
      coachRank.coachEventId,
      coachRank.uid,
      "monthlyRank",
    );

    // console.log("updatedPrize prize", updatedPrize);

    await savePrize(updatedPrize);
  }
};
