import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshUserLeaderHandler } from "./refreshUserLeaderHandler";

const corsHandler = cors({ origin: true });
export const refreshUserLeaderboardFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as userLeaderQuery;

        if (body.eventId) {
          await refreshUserLeaderHandler(body.eventId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
