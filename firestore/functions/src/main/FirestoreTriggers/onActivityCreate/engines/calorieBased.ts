import { Activity, UserRank } from "../../../../models/Activity/Activity";
import {
  flipRankObj,
  updateUserRankObj,
} from "../../../../models/Activity/createUtils";
import {
  reRankUsers,
  reRankUsers_distance,
  reRankUsers_speed,
  reRankUsers_streak,
  reRankUsers_week,
} from "../../../../models/Activity/handleRanking";
import { UserInterface } from "../../../../models/User/User";

export const calorieBasedEngine = async (
  activity: Activity,
  author: UserInterface,
  userRankObj: UserRank | undefined,
  userRanks: UserRank[],
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  coachEventId: string,
  communityId: string,
  coachCohortId: string,
) => {
  const newUserRankObj_unranked = await updateUserRankObj(
    activity,
    author,
    after,
    before,
    th,
    challengeLength,
    streakLength,
    eventId,
    coachEventId,
    coachCohortId,
    communityId,
    userRankObj,
  );

  if (newUserRankObj_unranked) {
    const newRankObjs = flipRankObj(userRanks, newUserRankObj_unranked);

    // update rank objs for all user
    const reRankedUsers_interim = reRankUsers(newRankObjs as UserRank[]);
    const reRankedUsers_streak = reRankUsers_streak(reRankedUsers_interim);
    const reRankedUsers_speed = reRankUsers_speed(reRankedUsers_streak);
    const reRankedUsers_week = reRankUsers_week(reRankedUsers_speed, after, 7);
    const reRankedUsers = reRankUsers_distance(reRankedUsers_week);

    return { reRankedUsers, newUserRankObj_unranked };
  }

  return {};
};
