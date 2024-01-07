import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { badgeAdderFuncV2 } from "./badgeAdderFuncV2";
import { rankUserMain } from "../challenges/rankUser/main";

export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const corsHandler = cors({ origin: true });
export const addBadgeFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, updateMap, addToChallenge } = request.body as {
          uid?: string;
          // pace?: difficulty;
          // endpoint?: "v2";
          addToChallenge: boolean;
          updateMap?: boolean;
        };

        // if (uid && pace) {
        //   const user = await getUserById(uid);

        //   if (user) {
        //     await badgeAdderFunc(user, uid, pace);
        //   }
        // } else

        if (uid) {
          const user = await getUserById(uid);

          if (user) {
            await badgeAdderFuncV2(user, uid, updateMap);
          }

          if (addToChallenge) {
            const status = await rankUserMain(uid);
            console.log("Add to leaderboard state", status);
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
