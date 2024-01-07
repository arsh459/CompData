import * as functions from "firebase-functions";
import * as cors from "cors";
import { getSakhiQuestionsMain } from "./main";

const corsHandler = cors({ origin: true });

export const getSakhiQuestionsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { msgTexts, userMessages, roomsCount } =
          await getSakhiQuestionsMain();

        response.status(200).send({
          status: "success",
          msgTexts,
          userMessages,
          roomsCount,
        });
        return;
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
