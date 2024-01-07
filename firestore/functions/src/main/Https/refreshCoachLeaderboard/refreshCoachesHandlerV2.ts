import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getAllCoachRanks } from "../../../models/Activity/getUtils";
import {
  //   reconcileCoach,
  reconcileCoachV2,
  saveRankedCoaches,
} from "../../../models/Activity/coachCreateUtils";
import { CoachRank } from "../../../models/Activity/Activity";
import {
  //   rankCoaches,
  rankCoachesPoints,
  //   rankCoaches_streak,
  // reRankCoachesPoints_week,
  //   reRankCoaches_week,
} from "../../../models/Activity/handleRanking";
import {
  reRankCoaches_month_FitPointsV2,
  reRankCoaches_week_FitPointsV2,
} from "../../../models/Activity/handleCoachRankingV2";
// import { COACH_WEEKLY_PRIZES } from "../../../constants/challenge";

export const refreshCoachesHandlerV2 = async (eventId: string) => {
  const newRanks: CoachRank[] = [];

  // o(1) 1
  const { after, sprints, rounds, nbWorkoutsToCount } = await getEventMetrics(
    eventId,
  );

  // o(nTeams) 100
  const childEvents = await getChildEvents(eventId);

  for (const childEvent of childEvents) {
    const owner = childEvent.ownerUID;

    // o(coach) 100
    const coach = await getUserById(owner);

    // if (owner === "W1mm9HjTo8apZ11Qes9Mt8ckhpD3") {
    //   console.log(childEvent.name, coach?.name);
    // }

    if (coach && after && sprints && rounds) {
      // o(member) 400
      const newRank = await reconcileCoachV2(
        eventId,
        owner,
        coach,
        after,
        childEvent.id,
        childEvent.name,
        childEvent.eventKey ? childEvent.eventKey : "",
        nbWorkoutsToCount,
        // sprints,
        // rounds,
      );

      // console.log(
      //   "newRank",
      //   newRank?.authorName,
      //   newRank?.totalFitPointsV2,
      //   newRank?.numTransformations,
      // );

      if (newRank) {
        newRanks.push(newRank);
      }
    }

    // console.log("");
    // console.log("");
    // console.log("");
  }

  if (after && rounds && sprints) {
    const reRankedCoaches_interim = rankCoachesPoints(newRanks);

    // for (const coach of reRankedCoaches_interim) {
    //   console.log(
    //     coach.authorName,
    //     coach.rank,
    //     coach.totalFitPointsV2,
    //     coach.totalCalories,
    //   );
    // }

    const reRankedCoaches_current = reRankCoaches_week_FitPointsV2(
      reRankedCoaches_interim,
      // after,
      rounds,
      // COACH_WEEKLY_PRIZES,
    );

    const reankedFinal = reRankCoaches_month_FitPointsV2(
      reRankedCoaches_current,
      // after,
      sprints,
    );

    // const shreya = reankedFinal.filter(
    //   (item) => item.uid === "blvJ95rzEUSMGoxQ6e4N5BAcCZ43",
    // );

    // console.log("shreya", shreya);

    // throw new Error("HI");

    // console.log("reankedFinal", reankedFinal);

    // for (const rank of reankedFinal) {
    //   for (const sprint of sprints) {
    //     if (rank && rank.monthlyRank && rank.monthlyRank[sprint.id] <= 3) {
    //       console.log(
    //         sprint.id,
    //         "|",
    //         rank.authorName,
    //         "|",
    //         rank.monthlyRank[sprint.id],
    //         "|",
    //         rank.monthPointObj ? rank.monthPointObj[sprint.id] : "-",
    //       );
    //     }
    //   }

    //   for (const round of rounds) {
    //     if (rank && rank.weeklyRank && rank.weeklyRank[round.id] <= 3) {
    //       console.log(
    //         round.id,
    //         "|",
    //         rank.authorName,
    //         "|",
    //         rank.weeklyRank[round.id],
    //         "|",
    //         rank.weekPointObj ? rank.weekPointObj[round.id] : "-",
    //       );
    //     }
    //   }
    // }

    await saveRankedCoaches(reankedFinal, eventId);
  }
};
