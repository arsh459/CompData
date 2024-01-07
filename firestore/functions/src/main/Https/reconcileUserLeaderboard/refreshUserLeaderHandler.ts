import { getUserById } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { UserRank } from "../../../models/Activity/Activity";
import {
  reRankUsers,
  reRankUsers_distance,
  reRankUsers_speed,
  reRankUsers_streak,
  reRankUsers_week,
} from "../../../models/Activity/handleRanking";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import {
  reconcileUser_activities,
  saveRankedUsers,
} from "../../../models/Activity/createUtils";

export const refreshUserLeaderHandler = async (eventId: string) => {
  const newRanks: UserRank[] = [];
  const {
    // calCriterion,
    // judgeCrit,
    challengeLength,
    streakLengthTh,
    calThForStreak,
    after,
    before,
    // sprintLength,
    roundLength,
  } = await getEventMetrics(eventId);

  const userRanks = await getAllUserRanks(eventId);
  //   console.log("userRanks", userRanks.length);

  for (const userRank of userRanks) {
    const user = await getUserById(userRank.uid);

    // console.log("user", user?.name);

    if (user && after) {
      const newRank = await reconcileUser_activities(
        eventId,
        user,
        calThForStreak,
        challengeLength,
        streakLengthTh,
        after,
        before,
        userRank.coachCommunityId,
        userRank.coachEventId,
        "",
      );

      if (newRank) {
        newRanks.push(newRank);

        console.log(
          "New User:",
          user.name,
          newRank?.numStreaks,
          newRank?.totalCalories,
          newRank.scoreMinCal,
        );
      }
    }
  }

  if (after) {
    const reRanked = reRankUsers(newRanks);
    const reRankedStreak = reRankUsers_streak(reRanked);
    const reRankedSpeed = reRankUsers_speed(reRankedStreak);
    const reRankedWeek = reRankUsers_week(reRankedSpeed, after, roundLength);
    const reRankedDistance = reRankUsers_distance(reRankedWeek);

    await saveRankedUsers(reRankedDistance, eventId);
  }
};
