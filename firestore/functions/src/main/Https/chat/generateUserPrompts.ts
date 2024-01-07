import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { createPromptsForUserHome } from "./createPrompts";
// import { createPromptsForUserToAsk } from "./createPrompts";

const corsHandler = cors({ origin: true });

export const generateUserPromptsFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;

          //   newMessage?: ChatMessage;
        };

        if (uid) {
          // get room
          //   const room = await getRoomById(uid, roomId);
          const user = await getUserById(uid);

          if (user)
            //   if (user && (!user.gptPrompts || user.gptPrompts?.length === 0)) {
            await createPromptsForUserHome(user);
          //   } else if (refresh) {
          //   }

          return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * createRoom.
 * if no messages, create a message
 * if user message, create a response
 *
 * if unanswered message from user, respond
 */
