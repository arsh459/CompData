import * as functions from "firebase-functions";
import * as cors from "cors";
import { subTaskImageMain } from "./main";

const corsHandler = cors({ origin: true });
export const subTaskImageFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { subTaskId } = request.body as {
          subTaskId?: string;
        };

        const { status, message } = await subTaskImageMain(subTaskId);

        if (status) {
          response.status(200).send({ status: "success", message });
        } else {
          response.status(500).send({ status: "failed", message });
        }

        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
