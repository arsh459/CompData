import { UserPrizes, UserRank } from "../../../models/Activity/Activity";
import {
  createPrize,
  deletePrize,
  getMonthlyPrizeFromDb,
  savePrize,
  updatePrize,
} from "../../../models/Prizes/createUtils";
import { getUserById } from "../../../models/User/Methods";

export const handleMonthlyUserRankWrapper = async (
  monthlyPrizes: UserPrizes,
  parentId: string,
  isTeamAward: boolean,
  eventSize: number,
) => {
  for (const month of Object.keys(monthlyPrizes)) {
    // console.log("week", week);
    // console.log("1st", weeklyPrizes[week].first);
    // console.log("2nd", weeklyPrizes[week].second);
    // console.log("3rd", weeklyPrizes[week].third);
    await handleMonthlyRank(
      parentId,
      month,
      1,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].first,
    );
    await handleMonthlyRank(
      parentId,
      month,
      2,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].second,
    );
    await handleMonthlyRank(
      parentId,
      month,
      3,
      eventSize,
      isTeamAward,
      monthlyPrizes[month].third,
    );
  }
};

const handleMonthlyRank = async (
  parentId: string,
  month: string,
  rank: number,
  eventSize: number,
  isTeamAward: boolean,
  user?: UserRank,
) => {
  if (user) {
    // console.log("rank exists", rank, user.authorName);
    await handleMonthRankPrize(
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

const handleMonthRankPrize = async (
  userRank: UserRank,
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
    const coach = await getUserById(userRank.coachCommunityId);
    const prize = createPrize(
      parentId,
      userRank.coachCommunityId,
      userRank.coachEventId,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      userRank.uid,
      userRank?.authorName ? userRank.authorName : "",
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
    const coach = await getUserById(userRank.coachCommunityId);
    const updatedPrize = updatePrize(
      remotePrize,
      userRank.coachCommunityId,
      rank,
      eventSize,
      coach?.name ? coach.name : "",
      userRank.uid,
      userRank.authorName ? userRank.authorName : "",
      isAtStake,
      userRank.coachEventId,
      userRank.coachCommunityId,
      "monthlyRank",
    );

    // console.log("updatedPrize prize", updatedPrize);

    await savePrize(updatedPrize);
  }
};
