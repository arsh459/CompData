import * as functions from "firebase-functions";
import * as cors from "cors";
import { dietPlanCreationMain } from "./main";

const corsHandler = cors({ origin: true });
export const dietPlanCreationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };
        const { status, message } = await dietPlanCreationMain(uid);
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
