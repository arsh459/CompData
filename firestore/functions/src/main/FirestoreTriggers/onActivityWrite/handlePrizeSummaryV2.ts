import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  createCoachSummaries,
  saveEventPrizeSummary,
} from "../../../models/Prizes/createSummary";
import { createEventSummary } from "../../../models/Prizes/eventSummary";
import {
  getMemberPodiumFinishes,
  getMonthlyPrizes_points,
  getTeamPodiumFinishes,
  getWeeklyPrizes_Points,
  typeCastToCoachPrizes,
  typeCastToUserPrizes,
} from "../../../models/Prizes/getPodiumFinishes";
// import { RoundObject, SprintObject } from "../../../models/sbEvent/sbEvent";
import { updatePrizes } from "../onActivityUpdate/updatePrizes";

export const handlePrizeSummaryV2 = async (
  parentId: string,
  userRanks: UserRank[],
  coachRanks: CoachRank[],
  eventSize: number,
  isAtStake: boolean,
  // sprints: SprintObject[],
  // rounds: RoundObject[],
) => {
  const podiumFinishes = getMemberPodiumFinishes(userRanks);
  const coachPodiumFinishes = getTeamPodiumFinishes(coachRanks);

  // weekly user prizes
  const weeklyPrizes = getWeeklyPrizes_Points(userRanks);
  const monthlyPrizes = getMonthlyPrizes_points(userRanks);

  // weekly user prizes
  const weeklyCoachPrizes = getWeeklyPrizes_Points(coachRanks);
  const monthlyCoachPrizes = getMonthlyPrizes_points(coachRanks);

  await updatePrizes(
    // undefined,
    // undefined,
    // undefined,
    // undefined,
    // undefined,
    // undefined,

    podiumFinishes.goldWinner,
    podiumFinishes.silverWinner,
    podiumFinishes.bronzeWinner,

    coachPodiumFinishes.goldWinner,
    coachPodiumFinishes.silverWinner,
    coachPodiumFinishes.bronzeWinner,
    eventSize,

    isAtStake,
    parentId,
    {},
    {},
    typeCastToUserPrizes(weeklyPrizes),
    typeCastToUserPrizes(monthlyPrizes),
    typeCastToCoachPrizes(weeklyCoachPrizes),
    typeCastToCoachPrizes(monthlyCoachPrizes),
  );

  const eventSummary = createEventSummary(coachRanks, {}, {});

  await createCoachSummaries(
    coachRanks,
    coachPodiumFinishes.gold,
    coachPodiumFinishes.silver,
    coachPodiumFinishes.bronze,
    podiumFinishes.gold,
    podiumFinishes.silver,
    podiumFinishes.bronze,
    {},
    {},
  );

  await saveEventPrizeSummary(parentId, eventSummary);
};
