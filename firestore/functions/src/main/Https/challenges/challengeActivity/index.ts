import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainActivityFetch } from "./main";

const corsHandler = cors({ origin: true });

export const challengeActivityFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { roundId } = request.body as {
          roundId?: string;
        };

        if (roundId) {
          console.log("roundId", roundId);
          await mainActivityFetch(roundId);
          response.status(200).send({ status: "success" });
        } else {
          response
            .status(500)
            .send({ status: "failed", reason: "Provide roundId" });
        }

        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
