import * as functions from "firebase-functions";
import * as cors from "cors";
import { NutritionResponse } from "./interface";
import { addNutritionActivities } from "../../../models/nutrition/utils";

const corsHandler = cors({ origin: true });

export const addNutritionFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const resp = request.body as NutritionResponse;

        if (resp.uid && resp.kcal && resp.day) {
          await addNutritionActivities(resp.uid, resp.day, resp.kcal);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
