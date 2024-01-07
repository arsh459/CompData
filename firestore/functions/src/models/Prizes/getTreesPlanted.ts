import { UserRank } from "../Activity/Activity";
import { judgeCriterion } from "../sbEvent/sbEvent";

export const getTreesPlanted = (
  userRanks: UserRank[],
  treeCalCriterion: number,
  judgeCrit: judgeCriterion,
) => {
  const treesByCommunity: { [communityId: string]: number } = {};
  const treeByRanks: { [uid: string]: UserRank } = {};

  for (const userRank of userRanks) {
    const trees = getTreeForRank(userRank, treeCalCriterion, judgeCrit);
    if (trees) {
      treeByRanks[userRank.uid] = userRank;

      if (treesByCommunity[userRank.coachCommunityId]) {
        treesByCommunity[userRank.coachCommunityId] += trees;
      } else {
        treesByCommunity[userRank.coachCommunityId] = trees;
      }
    }
  }

  return { treesByCommunity, treeByRanks };
};

const getTreeForRank = (
  userRank: UserRank,
  treeCalCriterion: number,
  judgeCrit: judgeCriterion,
) => {
  if (judgeCrit === "calories") {
    if (userRank.totalCalories && userRank.totalCalories > treeCalCriterion) {
      return 1;
    }
  } else {
    if (typeof userRank.numStreaks === "number") {
      return userRank.numStreaks;
    }
  }

  return 0;
};
