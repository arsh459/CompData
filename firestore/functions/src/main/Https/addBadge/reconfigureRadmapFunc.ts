import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { getUserById } from "../../../models/User/Methods";
import { reconfigureRoadmap } from "./reconfigureRoadmap";
import { addAchieversToRoadmap } from "./achiever/addAchievers";
import { UserInterface } from "../../../models/User/User";
import { saveAchievers } from "./achiever/saveUtils";
import { handleRoadmapUpdateToUser } from "./path/createUtils";

const corsHandler = cors({ origin: true });
export const reconfigureRoadmapFunc = functions
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
            const { allAchievementPaths, totalGoal } = await reconfigureRoadmap(
              user,
            );

            // console.log("totalGoal", totalGoal);
            // throw new Error("p");
            // mark completed
            const { monthItems, completedTargets } =
              await handleRoadmapUpdateToUser(user, allAchievementPaths);

            console.log();
            console.log("completedTargets", completedTargets);
            console.log();

            await admin.firestore().collection("users").doc(uid).update({
              thingsToWorkOn: totalGoal,
            });

            const updatedUser: UserInterface = {
              ...user,
              thingsToWorkOn: totalGoal,
            };

            const { achieversToAdd, achieversToRemove, totalTargets } =
              await addAchieversToRoadmap(user.uid, updatedUser, monthItems);

            await saveAchievers(
              updatedUser.uid,
              achieversToAdd,
              achieversToRemove,
              totalTargets,
              completedTargets,
            );
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
