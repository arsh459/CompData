import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainSeedUser } from "./main";
import { seedUserFuncInterface } from "./interface";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

const corsHandler = cors({ origin: true });
export const seedPaidUsersFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { usersToSeed } = request.body as {
          usersToSeed?: seedUserFuncInterface[];

          // reconcile?: boolean;
        };

        if (usersToSeed) {
          await mainSeedUser(usersToSeed);

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
