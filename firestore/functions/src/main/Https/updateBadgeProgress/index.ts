import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getTask } from "../../../models/Task/getUtils";
import {
  // userBadgeProg,
  userBadgeProgByBadgeId,
} from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { getActivityById } from "../../../models/Activity/getUtils";

const corsHandler = cors({ origin: true });
export const updateBadgeProgressFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        console.log(request.body);

        const { gameId, badgeId, uid } = request.body as {
          gameId?: string;
          badgeId?: string;
          uid?: string;
        };
        if (gameId && badgeId && uid) {
          await userBadgeProgByBadgeId(uid, badgeId, gameId);
        }

        // run at 12:00
        // if no new tasks done today, leave.
        // if new tasks done, increment

        //   const status = await removeUserFromTeam(uid, eventId);

        //   if (status === "success")
        return response.status(200).send({ status: "success" });
        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
