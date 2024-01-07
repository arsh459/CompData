import * as functions from "firebase-functions";
import * as cors from "cors";
import { postProfile } from "./interface";
import { saveProfileData } from "./saveProfile";

// import { firestore } from "firebase-admin";
// import { handleExpiringConv } from "../../PubSub/messagebird/endOfChat/handleExpiringConversation";
// import { ConversationInterface } from "../../../models/Conversations/Conversation";
// import { getContact } from "../../../models/Conversations/sendUtils";
// import { sendMessageToConversation } from "../../../models/Conversations/sendUtils";
// import {
//   //   toRahulPhone,
//   toSwapnilPhone,
//   //   toRahulPhone,
//   //   toSwapnilPhone,
//   //   toSwapnilPhone,
// } from "../../../constants/email/contacts";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { handleNewConversation } from "./handleNewConversation";
// import { newConversationMessageBird } from "../interface";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const assignmentPostFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as postProfile;
        const randomNumber = Math.random();

        if (randomNumber < 0.25) {
          return response.status(505).send({ error: "Server is busy" });
        } else if (randomNumber >= 0.25 && randomNumber < 0.33) {
          return response.status(505).send({ error: "Server is busy" });
        } else if (body.uid && request.method === "POST") {
          await saveProfileData(body);

          await sleep(Math.round(3000 * Math.random()));

          return response.status(200).send({ status: "success" });
        } else {
          return response.status(400).send({ error: "Invalid request" });
        }
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}