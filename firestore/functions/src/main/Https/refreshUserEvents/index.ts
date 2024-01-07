import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getAllSocialboatUsers } from "../../../models/User/Methods";
// import { getUserActivities } from "../../../models/Activity/getUtils";
// import { addUIDToEvent } from "../../../models/sbEvent/getUtils";
import { refreshHandler } from "./refreshHandler";
// import { sendGlobalMessage } from "./sendGlobalMessage";

const corsHandler = cors({ origin: true });
export const refreshUserEventFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await refreshHandler();
        // await sendGlobalMessage("00ec36a1-6eac-4924-a0eb-c40bbe7c409b");

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log("error", error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
