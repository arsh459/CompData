import { UserRank } from "../../../models/Activity/Activity";
import { reRankUsers_FitPoints } from "../../../models/Activity/handleRanking";
import {
  reRankUsers_month_FitPointsV2,
  reRankUsers_week_FitPointsV2,
} from "../../../models/Activity/handleRankingV2";
// import { USER_WEEKLY_PRIZES } from "../../../constants/challenge";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";
import { genderType } from "../../../models/User/User";

export const genderFilter = (gender: genderType, filter?: string) => {
  if (gender === "female" && filter === "gender:female") {
    return true;
  }

  if (filter !== "gender:female") {
    return true;
  }

  return false;
};

export const replaceDuplicateRanks = (
  ranks: UserRank[],
  updatedRanks: UserRank[],
) => {
  const ranksToUpdate: UserRank[] = [];
  for (const rank of ranks) {
    const itemPresent = updatedRanks.filter((item) => item.uid === rank.uid);
    if (itemPresent.length > 0) {
      ranksToUpdate.push(itemPresent[0]);
    } else {
      ranksToUpdate.push(rank);
    }
  }

  return ranksToUpdate;
};

export const getAllCoachUsers = (userRanks: UserRank[]) => {
  const coachUsers: UserRank[] = [];
  const coachTeamRanks: { [uid: string]: UserRank[] } = {};
  for (const userRank of userRanks) {
    if (userRank.uid === userRank.coachCommunityId) {
      coachUsers.push(userRank);
    }

    if (coachTeamRanks[userRank.coachCommunityId]) {
      coachTeamRanks[userRank.coachCommunityId].push(userRank);
    } else {
      coachTeamRanks[userRank.coachCommunityId] = [userRank];
    }
  }

  return { coachUsers, coachTeamRanks };
};

export const handleUserRankingWrapper = (
  userRanks: UserRank[],
  after: number,
  rounds: RoundObject[],
  sprints: SprintObject[],
) => {
  const reRanked = reRankUsers_FitPoints(userRanks);
  const reRankedWeek = reRankUsers_week_FitPointsV2(
    reRanked,
    // after,
    rounds,
    // USER_WEEKLY_PRIZES,
  );
  const monthlyRanked = reRankUsers_month_FitPointsV2(
    reRankedWeek,
    after,
    sprints,
  );

  return monthlyRanked;
};
