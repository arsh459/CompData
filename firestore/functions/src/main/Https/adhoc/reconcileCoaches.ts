import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getUserById } from "../../../models/User/Methods";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
import {
  getAllCoachRanks,
  //   getAllUserRanks,
} from "../../../models/Activity/getUtils";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getStreakPrize } from "../../../models/Prizes/getStreakPrize";
// import {
//   reconcileUser_activities,
//   saveRankedUsers,
// } from "../../../models/Activity/createUtils";
import { getUserById } from "../../../models/User/Methods";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { CoachRank } from "../../../models/Activity/Activity";
import {
  rankCoaches,
  rankCoaches_streak,
  reRankCoaches_week,
  //   reRankUsers,
  //   reRankUsers_streak,
} from "../../../models/Activity/handleRanking";
import {
  reconcileCoach,
  saveRankedCoaches,
} from "../../../models/Activity/coachCreateUtils";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const reconcileCoachLeaderboardFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const parentId = "c0897a45-bf7f-4a93-99df-ae3dd612924d";

      const {
        after,
        // before,
        calCriterion,
        // nbMembers,
        // calThForStreak,
        // challengeLength,
        // streakLengthTh,
        roundLength,
        judgeCrit,
        state,
      } = await getEventMetrics(parentId);

      const parentEvent = await getSbEventById(parentId);

      if (state === "active" && after && parentEvent) {
        const coaches = await getAllCoachRanks(parentId);

        const coachRanks: CoachRank[] = [];
        for (const coach of coaches) {
          console.log("coach", coach.authorName, coach.uid);

          const coachUser = await getUserById(coach.uid);

          if (coachUser) {
            const newCoachRank = await reconcileCoach(
              parentId,
              coach.uid,
              coachUser,
              calCriterion,
              judgeCrit,
              after,
            );

            console.log(
              "newCoachRank",
              newCoachRank?.authorName,
              newCoachRank?.totalCalories,
            );

            if (newCoachRank) {
              coachRanks.push(newCoachRank);
            }
          }
        }

        const rankedCoaches = rankCoaches(coachRanks);
        const reRankedCoaches_current = reRankCoaches_week(
          rankedCoaches,
          after,
          roundLength,
        );
        const coachesOnStreak = rankCoaches_streak(reRankedCoaches_current);

        await saveRankedCoaches(coachesOnStreak, parentId);
        // console.log("coachesOnStreak", coachesOnStreak);
      }

      try {
        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
