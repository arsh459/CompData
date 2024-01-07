import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { handlePrizeSummary } from "../../FirestoreTriggers/onActivityUpdate/handlePrizeSummary";
import {
  getAllCoachRanks,
  getAllUserRanks,
} from "../../../models/Activity/getUtils";

export const refreshPrizesHandler = async (eventId: string) => {
  const { calCriterion, judgeCrit, after, nbMembers, challengeLength } =
    await getEventMetrics(eventId);

  const allUsers = await getAllUserRanks(eventId);
  const allCoaches = await getAllCoachRanks(eventId);

  if (after) {
    // const globalPrizes = getWeeklyPrizes(
    //   allUsers,
    //   challengeLength,
    //   after,
    // );
    // console.log("globalPrizes", globalPrizes);

    await handlePrizeSummary(
      eventId,
      allUsers,
      allCoaches,
      calCriterion,
      after,
      nbMembers,
      true,
      judgeCrit,
      challengeLength,
    );
  }
};
