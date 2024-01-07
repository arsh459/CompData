import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainRoundEnd } from "./main";

const corsHandler = cors({ origin: true });

export const archiveRoundFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { roundId } = request.body as { roundId?: string };

        if (roundId) {
          await mainRoundEnd(roundId);

          response.status(200).send({ status: "success" });
        } else {
          response
            .status(500)
            .send({ status: "failed", reason: "Please provide a roundId" });
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
