// import { USER_WEEKLY_PRIZES } from "../../../constants/challenge";
import { UserRank } from "../../../models/Activity/Activity";
import { flipRankObj } from "../../../models/Activity/createUtils";
import {
  reRankUsers_FitPoints,
  // reRankUsers_week_FitPoints,
} from "../../../models/Activity/handleRanking";
import {
  reRankUsers_month_FitPointsV2,
  reRankUsers_week_FitPointsV2,
} from "../../../models/Activity/handleRankingV2";
import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";

export const reRankUsersHelper = (
  userRanks: UserRank[],
  after: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  unrankedUser?: UserRank,
) => {
  if (!unrankedUser) {
    return userRanks;
  }
  const allRanks = flipRankObj(userRanks, unrankedUser);
  const reRanked = reRankUsers_FitPoints(allRanks as UserRank[]);

  const reRankedFitPoints = reRankUsers_week_FitPointsV2(reRanked, rounds);

  const reRankedFitPoints_Final = reRankUsers_month_FitPointsV2(
    reRankedFitPoints,
    after,
    sprints,
  );

  return reRankedFitPoints_Final;
};
/**
 *
 *
 *
 */
