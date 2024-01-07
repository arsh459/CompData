import * as functions from "firebase-functions";
import * as cors from "cors";
import { reconcileMixpanelStreakData } from "./main";

// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";

const corsHandler = cors({ origin: true });
export const streakMixpanelFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await reconcileMixpanelStreakData();

        response.status(200).send({ status: "success" });

        return;
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
