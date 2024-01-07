import { UserRank } from "../Activity/Activity";

export const getStreaks = (userRanks: UserRank[], after: number) => {
  const streaksInCommunity: { [communityId: string]: number } = {};
  const streaksByRank: { [uid: string]: UserRank } = {};

  for (const userRank of userRanks) {
    if (userRank?.numStreaks) {
      streaksByRank[userRank.uid] = userRank;

      if (streaksInCommunity[userRank.coachCommunityId]) {
        streaksInCommunity[userRank.coachCommunityId] += userRank.numStreaks;
      } else {
        streaksInCommunity[userRank.coachCommunityId] = userRank.numStreaks;
      }
    }
  }

  return { streaksInCommunity, streaksByRank };
};
