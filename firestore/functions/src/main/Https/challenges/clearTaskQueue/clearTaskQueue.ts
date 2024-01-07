import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainTaskQueue } from "./main";

const corsHandler = cors({ origin: true });

export const clearTaskQueueFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const status = await mainTaskQueue();
        if (status) {
          return response.status(200).send({ status: "success" });
        } else {
          return response.status(400).send({
            status: "failed",
            reason: "processing failed",
          });
        }

        // console.log("request");
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
