import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainWorkoutGet } from "./main";
import { Task } from "../../../../models/Task/Task";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const getWorkoutsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { badgeId, badgeIds } = request.body as {
          badgeId?: string;
          badgeIds?: string[];

          // reconcile?: boolean;
        };

        if (badgeId) {
          const { tasks } = await mainWorkoutGet(badgeId);

          response.status(200).send({ status: "success", tasks });
          return;
        } else if (badgeIds) {
          const tkList: Task[] = [];
          for (const badgeIdI of badgeIds) {
            const { tasks } = await mainWorkoutGet(badgeIdI);
            tkList.push(...tasks);
          }

          response.status(200).send({ status: "success", tkList });
          return;
        }

        //   if (status === "success")

        // }

        response.status(400).send({ error: "failed" });
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
