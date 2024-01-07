import { CoachRank } from "../Activity/Activity";
import { EventPrizeSummary } from "./Prize";

export const createEventSummary = (
  coachRanks: CoachRank[],
  treesByCommunity: { [communityId: string]: number },
  streakSummary: { [communityId: string]: number },
): EventPrizeSummary => {
  let trees: number = 0;
  let totalCalories: number = 0;
  let numStreaks: number = 0;
  for (const coachRank of coachRanks) {
    totalCalories += coachRank.totalCalories ? coachRank.totalCalories : 0;
    trees += treesByCommunity[coachRank.uid]
      ? treesByCommunity[coachRank.uid]
      : 0;
    numStreaks += streakSummary[coachRank.uid]
      ? streakSummary[coachRank.uid]
      : 0;
  }

  return {
    totalCalories: totalCalories,
    numTrees: trees,
    numTeams: coachRanks.length,
    numConsistent: numStreaks,
  };
};
