import * as functions from "firebase-functions";
import * as cors from "cors";
// import { handleNewConversation } from "./handleNewConversation";
// import { newConversationMessageBird } from "../interface";
import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const reportFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      functions.logger.log(request.body);
      try {
        await admin
          .firestore()
          .collection("pings")
          .doc()
          .set({ newPingTime: new Date().getTime() });

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
