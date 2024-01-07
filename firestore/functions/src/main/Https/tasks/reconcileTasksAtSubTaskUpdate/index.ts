import * as functions from "firebase-functions";
import * as cors from "cors";
import { reconcileNutritionMainOnSub } from "./main";

const corsHandler = cors({ origin: true });
export const reconcileNutritionTasksOnSubFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { subTaskId } = request.body as { subTaskId?: string };
        if (!subTaskId) {
          response.status(400).send({ error: "Provide Id" });
          return;
        }
        await reconcileNutritionMainOnSub(subTaskId);
        response.status(200).send({ status: true });
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ status: false });
        return;
      }
    });
  });
