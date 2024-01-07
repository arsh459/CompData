import * as functions from "firebase-functions";
import * as cors from "cors";
import { reconcileNutritionMain } from "./main";

const corsHandler = cors({ origin: true });
export const reconcileNutritionTasksFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await reconcileNutritionMain();

        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
