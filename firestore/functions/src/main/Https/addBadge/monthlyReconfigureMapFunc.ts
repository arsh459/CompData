import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { updateRoadmapHelper } from "./updateRoadmapHelper";

const corsHandler = cors({ origin: true });
export const monthlyReconfigureMapFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const user = await getUserById(uid);

          if (user) {
            await updateRoadmapHelper(user);
          }
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
