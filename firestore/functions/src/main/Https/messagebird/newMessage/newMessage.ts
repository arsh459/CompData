import * as functions from "firebase-functions";
import * as cors from "cors";
import { newMessageMessageBird } from "../interface";
import { handleNewMessage } from "./handleNewMessage";
import { saveMessage } from "../../../../models/Conversations/createUtils";
import { groupSync } from "./groupSync";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const newMessageFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result = request.body as newMessageMessageBird;

        // functions.logger.log("message", result.message);
        // functions.logger.log("conversation", result.conversation);

        // only for messages sent via user
        if (
          result.message.origin === "inbound" &&
          result.message.content &&
          ((result.message.content.text &&
            result.message.content.text.length > 0) ||
            result.message.content.image ||
            result.message.content.file)
        ) {
          await handleNewMessage(
            result.conversation,
            result.contact,
            result.message,
          );
        } else if (result.message.origin === "api") {
          // functions.logger.log("result", result.message);
          // delay
          await saveMessage(result.conversation.id, result.message);
          setTimeout(async () => {
            await groupSync(result.message, result.conversation);
          }, 2000);
        } else {
          await saveMessage(result.conversation.id, result.message);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
