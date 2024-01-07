import * as functions from "firebase-functions";
import * as cors from "cors";
import { badgeUpdateMainFunc } from "../main";
// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const badgeUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { badgeId, recreate } = request.body as {
          badgeId?: string;
          recreate?: boolean;
          // reconcile?: boolean;
        };

        if (badgeId) {
          await badgeUpdateMainFunc(badgeId, recreate ? true : false);
        }

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
