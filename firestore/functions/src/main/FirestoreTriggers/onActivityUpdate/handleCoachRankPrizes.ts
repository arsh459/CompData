import { CoachPrizes, CoachRank } from "../../../models/Activity/Activity";
import {
  createPrize,
  deletePrize,
  getWeeklyPrizeFromDb,
  savePrize,
  updatePrize,
} from "../../../models/Prizes/createUtils";
import { getUserById } from "../../../models/User/Methods";

export const handleCoachWeeklyRankWrapper = async (
  weeklyPrizes: CoachPrizes,
  parentId: string,
  isTeamAward: boolean,
  eventSize: number,
) => {
  for (const week of Object.keys(weeklyPrizes)) {
    // console.log("week", week);
    // console.log("1st", weeklyPrizes[week].first);
    // console.log("2nd", weeklyPrizes[week].second);
    // console.log("3rd", weeklyPrizes[week].third);
    await handleCoachWeeklyRank(
      parentId,
      week,
      1,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].first,
    );
    await handleCoachWeeklyRank(
      parentId,
      week,
      2,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].second,
    );
    await handleCoachWeeklyRank(
      parentId,
      week,
      3,
      eventSize,
      isTeamAward,
      weeklyPrizes[week].third,
    );
  }
};

const handleCoachWeeklyRank = async (
  parentId: string,
  week: string,
  rank: number,
  eventSize: number,
  isTeamAward: boolean,
  user?: CoachRank,
) => {
  if (user) {
    // console.log("rank exists", rank, user.authorName);
    await handleWeekCoachRankPrize(
      user,
      rank,
      eventSize,
      parentId,
      true,
      isTeamAward,
      week,
    );
  } else {
    // console.log("rank does not exist", rank);
    const remoteWeekAward = await getWeeklyPrizeFromDb(
      rank,
      parentId,
      isTeamAward,
      week,
    );

    // console.log("remoteWeekAward previous", remoteWeekAward?.awardedToName);

    if (remoteWeekAward) {
      await deletePrize(remoteWeekAward);
    }
  }
};

const handleWeekCoachRankPrize = async (
  coachRank: CoachRank,
  rank: number,
  eventSize: number,
  parentId: string,
  isAtStake: boolean,
  isTeamAward: boolean,
  week: string,
) => {
  const remotePrize = await getWeeklyPrizeFromDb(
    rank,
    parentId,
    isTeamAward,
    week,
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
      "weeklyRank",
      isTeamAward,
      undefined,
      undefined,
      undefined,
      week,
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
      "weeklyRank",
    );

    // console.log("updatedPrize prize", updatedPrize);

    await savePrize(updatedPrize);
  }
};
