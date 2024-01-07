import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainSubTask } from "./main";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const getSubTaskFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { type } = request.body as {
          type?: "workout" | "nutrition";

          // reconcile?: boolean;
        };

        if (type) {
          const { subTasks } = await mainSubTask(type === "workout");

          response.status(200).send({ status: "success", subTasks });
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
