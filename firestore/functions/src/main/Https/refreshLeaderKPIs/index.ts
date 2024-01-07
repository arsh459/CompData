import * as functions from "firebase-functions";
import * as cors from "cors";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
// import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// // import { getAllCoachRanks } from "../../../models/Activity/getUtils";
// import {
//   reconcileCoach,
//   //   saveRankedCoaches,
// } from "../../../models/Activity/coachCreateUtils";
// import { CoachRank } from "../../../models/Activity/Activity";
// import {
//   rankCoaches,
//   rankCoaches_streak,
//   reRankCoaches_week,
// } from "../../../models/Activity/handleRanking";
import {
  getAllUserRanks,
  getAllUserRanksForCoach,
  getCoachRank,
} from "../../../models/Activity/getUtils";

// import { UserInterface } from "../../../../models/User/User";

const corsHandler = cors({ origin: true });
export const refreshLeaderKPIsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as challengeLeaderQuery;
        if (body.eventId) {
          const childEvents = await getChildEvents(body.eventId);

          let totalCalories: number = 0;
          for (const childEvent of childEvents) {
            const coach = await getUserById(childEvent.ownerUID);

            console.log("childEvent", childEvent.name, coach?.name);

            if (coach?.uid) {
              const coachRank = await getCoachRank(body.eventId, coach?.uid);
              const userRanks = await getAllUserRanksForCoach(
                body.eventId,
                coach?.uid,
              );

              let cals: number = 0;
              for (const userRank of userRanks) {
                console.log(
                  "user",
                  userRank.authorName,
                  userRank.totalCalories,
                );

                if (userRank.totalCalories) {
                  cals = cals + userRank.totalCalories;
                  totalCalories = totalCalories + userRank.totalCalories;
                }
              }

              console.log("cals", coach.name, cals);
              console.log("coach cals", coachRank?.totalCalories);
            }

            console.log("");
            console.log("");
            console.log("");
          }

          console.log("totalCalories", totalCalories);

          const allUserRanks = await getAllUserRanks(body.eventId);
          let userRankCalTotal: number = 0;
          for (const userRank of allUserRanks) {
            userRankCalTotal =
              userRankCalTotal +
              (userRank.totalCalories ? userRank.totalCalories : 0);
          }

          console.log("userRankCalTotal", userRankCalTotal);
        }

        // const newRanks: CoachRank[] = [];
        // console.log("body", body.eventId);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
