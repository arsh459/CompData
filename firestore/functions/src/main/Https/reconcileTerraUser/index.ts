import * as functions from "firebase-functions";
import * as cors from "cors";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
import { getUserById } from "../../../models/User/Methods";

const corsHandler = cors({ origin: true });
export const reconcileTerraUserFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 360 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const result: { uid: string } = request.body;

        console.log("here", result);

        if (result.uid) {
          const user = await getUserById(result.uid);
          console.log("user", user?.uid, user?.terraUser?.user_id);
          if (user) {
            // const statuses = await triggerPastUpdates([user], false);

            // console.log("statuses", statuses);

            return response
              .status(200)
              .send({ status: "success", details: {} });
          }
        }

        return response.status(400).send({ status: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ status: "failed" });
      }
    });
  });
