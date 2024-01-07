import * as functions from "firebase-functions";
import * as cors from "cors";
import { subTaskAIGenerationMain } from "./main";

const corsHandler = cors({ origin: true });
export const subTaskAIGenerationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { name } = request.body as {
          name?: string;
        };
        const { status, message } = await subTaskAIGenerationMain(name);
        if (status) {
          response.status(200).send({ status, message });
        } else {
          response.status(505).send({ status, message });
        }
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ status: false, error: "Invalid request" });
        return;
      }
    });
  });
