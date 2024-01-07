import * as functions from "firebase-functions";
import * as cors from "cors";
import { newMessageMessageBird } from "../interface";

// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const newMessageV2Func = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result = request.body as newMessageMessageBird;

        // functions.logger.log("message", result.message);
        // functions.logger.log("conversation", result.conversation);

        // only for messages sent via user
        console.log("result", result);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
