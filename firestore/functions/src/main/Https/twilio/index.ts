import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getStunServer,
  saveStunServer,
  STUNResponse,
} from "../../../models/stun/TwilioServer";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const turnServerFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 120, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const now = Date.now() - 1000 * 60 * 60;

        const stunServer = await getStunServer(now);
        // console.log("st", stunServer);
        if (stunServer) {
          return response
            .status(200)
            .send({ status: "success", response: stunServer });
        } else {
          const client = require("twilio")(accountSid, authToken, {
            lazyLoading: true,
          });

          const stunRes = (await client.tokens.create()) as STUNResponse;

          const expires = Date.now() + Number.parseInt(stunRes.ttl);

          await saveStunServer(stunRes, expires);

          return response
            .status(200)
            .send({ status: "success", response: stunRes });
        }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
