import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainUpdateFunc } from "./main";

const corsHandler = cors({ origin: true });

export const updateLeaderboardFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { clearOld, roundId, skipSave } = request.body as {
          clearOld?: boolean;
          roundId?: string;
          skipSave?: boolean;
        };

        if (roundId) {
          console.log("roundId", roundId);
          await mainUpdateFunc(roundId, clearOld, skipSave);
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
