import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshPrizesHandlerV2 } from "./refreshPrizesHandlerV2";

const corsHandler = cors({ origin: true });
export const refreshPrizesV2Func = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as refreshPrizesLeaderQuery;

        // const newRanks: CoachRank[] = [];
        if (body.eventId) {
          await refreshPrizesHandlerV2(body.eventId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });