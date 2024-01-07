import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getAllCoachRanks } from "../../../models/Activity/getUtils";
import {
  reconcileCoach,
  saveRankedCoaches,
} from "../../../models/Activity/coachCreateUtils";
import { CoachRank } from "../../../models/Activity/Activity";
import {
  rankCoaches,
  rankCoaches_streak,
  reRankCoaches_week,
} from "../../../models/Activity/handleRanking";

export const refreshCoachesHandler = async (eventId: string) => {
  const newRanks: CoachRank[] = [];
  const { calCriterion, judgeCrit, after, roundLength } = await getEventMetrics(
    eventId,
  );

  const childEvents = await getChildEvents(eventId);
  for (const childEvent of childEvents) {
    const owner = childEvent.ownerUID;

    const coach = await getUserById(owner);
    // console.log("coach", coach?.name);

    if (coach && after) {
      const newRank = await reconcileCoach(
        eventId,
        owner,
        coach,
        calCriterion,
        judgeCrit,
        after,
      );

      console.log(
        "newRank",
        newRank?.authorName,
        newRank?.totalCalories,
        newRank?.numTransformations,
      );

      if (newRank) {
        newRanks.push(newRank);
      }
    }

    console.log("");
    console.log("");
    console.log("");
  }

  if (after) {
    const reRankedCoaches_interim = rankCoaches(newRanks);
    const reRankedCoaches_current = reRankCoaches_week(
      reRankedCoaches_interim,
      after,
      roundLength,
    );

    const reRankedCoaches = rankCoaches_streak(reRankedCoaches_current);

    await saveRankedCoaches(reRankedCoaches, eventId);
  }
};
