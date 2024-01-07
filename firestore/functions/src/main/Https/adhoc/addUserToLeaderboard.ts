import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const addUserToLeaderFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: { uid: string } = request.body;

        const user = await getUserById(result.uid);

        if (user && user.terraUser) {
          // await triggerPastUpdates([user], false);
          // await handleNewUserRank(result.eventId, user);
        }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
