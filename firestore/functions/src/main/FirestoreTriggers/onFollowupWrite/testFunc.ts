import * as functions from "firebase-functions";
import * as cors from "cors";
import { handleFollowup } from "./main";

export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const corsHandler = cors({ origin: true });
export const onFollowupTestFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
          // pace?: difficulty;
          // endpoint?: "v2";
        };

        // if (uid && pace) {
        //   const user = await getUserById(uid);

        //   if (user) {
        //     await badgeAdderFunc(user, uid, pace);
        //   }
        // } else

        if (uid) {
          await handleFollowup(uid);
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
