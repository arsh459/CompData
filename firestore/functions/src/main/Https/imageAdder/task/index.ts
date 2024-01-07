import * as functions from "firebase-functions";
import * as cors from "cors";
import { taskImageMain } from "./main";

const corsHandler = cors({ origin: true });
export const taskImageFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { taskId } = request.body as {
          taskId?: string;
        };
        const { status, message } = await taskImageMain(taskId);
        if (status) {
          response.status(200).send({ status: "Success", message });
        } else {
          response.status(505).send({ status: "Failed", message });
        }
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
