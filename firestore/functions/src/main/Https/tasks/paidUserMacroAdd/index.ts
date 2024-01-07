import * as functions from "firebase-functions";
import * as cors from "cors";
import { paidUserMainAdd } from "./main";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const paidUserFactsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { users } = await paidUserMainAdd();

        response.status(200).send({ status: "success", users });
        return;

        //   if (status === "success")

        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
