import * as functions from "firebase-functions";
import * as cors from "cors";
import { getAllUsers_ByCollection } from "../../../../models/User/Methods";
import { reconcileViews } from "./handleReconcile";

const corsHandler = cors({ origin: true });
export const reconcileViewsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const allUsers = await getAllUsers_ByCollection();
        for (let i = 0; i < allUsers.length; i++) {
          const user = allUsers[i];
          if (user.uid) {
            await reconcileViews(user);
          }

          console.log(`${i}/${allUsers.length}`, user.uid);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
