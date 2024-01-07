import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import {
  badgeProgressReconcile,
  // badgeProgressUpdaterV2,
} from "../../FirestoreTriggers/onBaseTaskWrite/badgeUpdater";
import { getBadge } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { updateRoundsWithBadges } from "./utils/updateRoundsWithBadges";

const corsHandler = cors({ origin: true });
export const updateBadgeLevelsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { badgeId } = request.body as {
          badgeId?: string;
          // reconcile?: boolean;
        };
        // console.log("task", taskId);
        // console.log("reconcile", reconcile, typeof reconcile);
        // if (taskId) {
        // const task = await getTask(taskId);
        // console.log("task", task?.name);
        // if (task && !reconcile) {
        // change to v2
        // await badgeProgressUpdaterV2(task);
        // } else if (task && reconcile) {

        if (badgeId) {
          const badge = await getBadge(badgeId, TEAM_ALPHABET_GAME);
          if (badge) {
            await badgeProgressReconcile(badge, true);

            // challenge round update
            await updateRoundsWithBadges(badgeId);
          }
        }

        // }
        // }

        //   const status = await removeUserFromTeam(uid, eventId);

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
