import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainSeedFunc } from "./main";

const corsHandler = cors({ origin: true });

export const seedLeaderboardFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await mainSeedFunc();
        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
