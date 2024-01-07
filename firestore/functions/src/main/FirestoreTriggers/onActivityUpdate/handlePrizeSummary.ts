import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  createCoachSummaries,
  saveEventPrizeSummary,
} from "../../../models/Prizes/createSummary";
import { createEventSummary } from "../../../models/Prizes/eventSummary";
import {
  getMemberPodiumFinishes,
  getTeamPodiumFinishes,
  getWeeklyPrizes,
} from "../../../models/Prizes/getPodiumFinishes";
import { getStreaks } from "../../../models/Prizes/getStreaks";
import { getTreesPlanted } from "../../../models/Prizes/getTreesPlanted";
import { judgeCriterion } from "../../../models/sbEvent/sbEvent";
import { updatePrizes } from "./updatePrizes";

export const handlePrizeSummary = async (
  parentId: string,
  userRanks: UserRank[],
  coachRanks: CoachRank[],
  treeCalCriterion: number,
  after: number,
  eventSize: number,
  isAtStake: boolean,
  judgeCrit: judgeCriterion,
  challengeLength: number,
) => {
  const podiumFinishes = getMemberPodiumFinishes(userRanks);
  const coachPodiumFinishes = getTeamPodiumFinishes(coachRanks);
  const weeklyPrizes = getWeeklyPrizes(
    userRanks,
    challengeLength,
    after,
    7,
    30,
  );

  const { treesByCommunity, treeByRanks } = getTreesPlanted(
    userRanks,
    treeCalCriterion,
    judgeCrit,
  );

  const { streaksInCommunity, streaksByRank } = getStreaks(userRanks, after);

  await updatePrizes(
    podiumFinishes.goldWinner,
    podiumFinishes.silverWinner,
    podiumFinishes.bronzeWinner,

    coachPodiumFinishes.goldWinner,
    coachPodiumFinishes.silverWinner,
    coachPodiumFinishes.bronzeWinner,

    eventSize,
    isAtStake,
    parentId,
    treeByRanks,
    streaksByRank,
    weeklyPrizes,
    {},
    {},
    {},
  );

  const eventSummary = createEventSummary(
    coachRanks,
    treesByCommunity,
    streaksInCommunity,
  );

  await createCoachSummaries(
    coachRanks,
    coachPodiumFinishes.gold,
    coachPodiumFinishes.silver,
    coachPodiumFinishes.bronze,
    podiumFinishes.gold,
    podiumFinishes.silver,
    podiumFinishes.bronze,
    treesByCommunity,
    streaksInCommunity,
  );

  await saveEventPrizeSummary(parentId, eventSummary);
};

// prizes collection
// prize {} -> Rank 1, 2, 3. Streak
