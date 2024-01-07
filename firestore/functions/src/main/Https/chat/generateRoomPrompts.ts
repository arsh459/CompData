import * as functions from "firebase-functions";
import * as cors from "cors";
import { getLastMessages, getRoomById } from "../../../models/Room/Methods";
// import { handleChatCheck } from "./funcChecks";
// import { handleTitlePrompt } from "./handleTitlePrompt";
import { createPromptsForUserToAsk } from "./createPrompts";
// import { handleGroupImagePrompt } from "./handleImagePrompt";
// import { createPromptsForUserToAsk } from "./createPrompts";

const corsHandler = cors({ origin: true });

export const generateRoomPromptsFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, roomId } = request.body as {
          uid?: string;
          roomId?: string;
          //   newMessage?: ChatMessage;
        };

        if (uid && roomId) {
          // get room
          const room = await getRoomById(uid, roomId);

          if (
            room &&
            room.status !== "inactive"
            // &&
            // (!room.roomPromptsForUser || room.roomPromptsForUser?.length === 0)
          ) {
            const { chatMessages } = await getLastMessages(uid, room.id);

            // if (
            //   chatMessages.length > 2 &&
            //   (!room.roomPromptsForUser ||
            // room.roomPromptsForUser?.length === 0)
            // ) {
            //   console.log("generating prompts");
            await createPromptsForUserToAsk(uid, roomId, chatMessages);
            // }

            // console.log("response", responseLimit);
          }

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
