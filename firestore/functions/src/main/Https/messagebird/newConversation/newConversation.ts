import * as functions from "firebase-functions";
import * as cors from "cors";
// import { handleNewConversation } from "./handleNewConversation";
// import { newConversationMessageBird } from "../interface";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const newConversationFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result = request.body as newConversationMessageBird;
        // functions.logger.log("body", result);
        // functions.logger.log("result", Object.keys(result));
        // functions.logger.log("contact", result.contact);
        // functions.logger.log("conversation", result.conversation);
        // functions.logger.log("type", result.type);
        // functions.logger.log("message", result.message);
        // functions.logger.log("request", request);

        // if image URI is absent create on demand
        // let uri: string = result.imageURI;
        // await admin
        //   .firestore()
        //   .collection("pings")
        //   .doc()
        //   .set({ newPingTime: new Date().getTime() });

        // handleNewConversation(
        //   result.conversation,
        //   result.contact,
        //   result.query,
        // );

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
