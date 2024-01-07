import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainSeedSubtask } from "./main";
import { seedSubtaskInterface } from "./interface";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const seedSubtasksFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { subTasks } = request.body as {
          subTasks?: seedSubtaskInterface[];

          // reconcile?: boolean;
        };

        if (subTasks) {
          await mainSeedSubtask(subTasks);

          response.status(200).send({ status: "success" });
          return;
        }

        //   if (status === "success")
        return response.status(500).send({ status: "failed" });
        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
