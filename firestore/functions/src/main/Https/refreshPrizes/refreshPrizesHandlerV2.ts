import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import {
  getAllCoachRanks,
  getAllUserRanks,
} from "../../../models/Activity/getUtils";
import { handlePrizeSummaryV2 } from "../../FirestoreTriggers/onActivityWrite/handlePrizeSummaryV2";

export const refreshPrizesHandlerV2 = async (eventId: string) => {
  const { after, nbMembers, sprints, rounds } = await getEventMetrics(eventId);

  // o(member) 400
  const allUsers = await getAllUserRanks(eventId);
  // o(teams) 100
  const allCoaches = await getAllCoachRanks(eventId);

  // console.log("allUsers", allUsers.length);
  // console.log("allCoaches", allCoaches.length);

  if (after && sprints && rounds) {
    await handlePrizeSummaryV2(
      eventId,
      allUsers,
      allCoaches,
      // challengeLength,
      // after,
      nbMembers,
      true,
      // sprints,
      // rounds,
    );
  }
};
