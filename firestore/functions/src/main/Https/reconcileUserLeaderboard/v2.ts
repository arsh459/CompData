import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshUserLeaderHandlerV3 } from "./refreshUserLeaderHandlerV3";

const corsHandler = cors({ origin: true });
export const refreshUserLeaderboardV2Func = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as userLeaderQuery;

        // console.log("b", body.eventId);

        if (body.eventId) {
          await refreshUserLeaderHandlerV3(
            body.eventId,
            body.round,
            body.sprintId,
            // body.refresh ? body.refresh : "LAST_ROUND_ONLY",
          );
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.error(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * userRank {}
 * monthTaskPts: {[month: string]: {[taskId: string]: number}}
 *
 * coachRank {}
 * for (each user){
 *  for (each task) {
 *   taskUIDMap -> {[taskId: string]: uid}
 *  }
 * }
 */
