import * as functions from "firebase-functions";
import * as cors from "cors";
import { getActivityById } from "../../../models/Activity/getUtils";
import { handleAlgoliaUpdate } from "../../FirestoreTriggers/onActivityQueueEnter/handleAlgoliaUpdate";
// import { getUserById } from "../../../models/User/Methods";
// import { fpUpdateHandler } from "./main";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";
export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const corsHandler = cors({ origin: true });
export const activityToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, activityId } = request.body as {
          uid?: string;
          activityId?: difficulty;
        };

        if (uid && activityId) {
          const act = await getActivityById(uid, activityId);

          console.log("uid", uid, activityId);

          if (act) {
            try {
              await handleAlgoliaUpdate(act);
            } catch (error) {
              console.log("error here", error);
            }
          }

          // const userObj = await getUserById(uid);

          // if (
          //   userObj?.invitedPageId &&
          //   userObj.invitedPageId === "AIESEC Delhi University"
          // ) {
          //   badgeId = "397afe31-2663-43a9-bb86-3f9ab9e60499";
          //   dailyFPTarget = 20;
          // } else if (
          //   userObj?.invitedPageId &&
          //   userObj.invitedPageId === "PECFEST"
          // ) {
          //   badgeId = "9ef56ee6-bd64-4242-aeea-457494355e68";
          //   dailyFPTarget = 20;
          // } else
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
