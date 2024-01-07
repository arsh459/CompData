import * as functions from "firebase-functions";
import * as cors from "cors";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
// import { getUserById } from "../../../models/User/Methods";
import {
  ALPHABET_GAME,
  // FAT_BURNER_GAME,
  // RUNNER_GAME,
  // WOMENS_GAME,
} from "../../../constants/challenge";

import { updateUserSubscription } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { getCurrentSprint } from "../../FirestoreTriggers/onActivityWrite/utils";
// import * as admin from "firebase-admin";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const alotSubscriptionByUIDFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: { uid: string } = request.body;

        // admin.firestore().collection('sbEvents').doc(RUNNER_GAME).update({
        //   pricing: [

        //   ]
        // })

        const games = [ALPHABET_GAME];
        for (const gameId of games) {
          const { after, sprints } = await getEventMetrics(gameId);

          console.log("after", after, sprints);

          if (after && sprints) {
            const now = Date.now();

            const days = getDaysElapsed(after, now);
            const sprintId = getCurrentSprint(days, sprints);

            console.log("days", days, sprintId);
            if (sprintId) {
              for (const uid of [
                "cOT8jJkbpqTtYGIyV5fq4749pYt2",
                "EAey9AA6D1f9jP67hdAp1XDKsEz1",
                // "gBontvCwL0ZpYYee7xsJaub4xWm1",
                // "zxEOIpN3zjbhExXCybBB4UWxdci1",
                // "W1mm9HjTo8apZ11Qes9Mt8ckhpD3",
                // "UXXqyWp55VMV1xLrOZXEdPAO5M02",
                // "DMlAtpYgdEZ7krcVjVERQ2LSjV92",
                // "40OqdGRJ0rQdUbSaZDyj9zm36uU2",
                // "XdrshWXNC8a6jSO7vtpGOx8Xhfu1",
                // "kqKoanqUkXe5xo2D8VSC2sIautm2",
                // "AW96TfTIthaUsi6b1IxHyl6SRcn1",
                // "L1SZPp2jshR3TCfv5816kc9j3i32",
                // "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
              ]) {
                await updateUserSubscription(uid, gameId, sprintId);
                console.log("user", uid, gameId, sprintId);
                // }
              }
            }
          }
        }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
