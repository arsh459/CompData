import * as functions from "firebase-functions";
import * as cors from "cors";
import { fpUpdateHandler } from "./main";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const userFPUpdateFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 120, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as { uid?: string };

        if (uid) {
          await fpUpdateHandler(uid);
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * activities -> credits
 * myPurchases -> spends
 *
 * reconcile once.
 *
 * onActUpdate -> updateCredits, userFP
 * onPurchaseUpdate -> updateSpends, userFP
 *
 * credit = 12 + (-prev + new)
 * debits = 10 + (-prev + new)
 *
 * credits
 * spends
 * userFP
 *
 *
 */
