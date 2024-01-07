import * as functions from "firebase-functions";
import * as cors from "cors";
import { reconcileDietPlanMain } from "./main";

const corsHandler = cors({ origin: true });
export const reconcileDietPlansFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { start, end } = request.body as { start?: number; end?: number };

        await reconcileDietPlanMain(start ? start : 0, end ? end : 0);

        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        response.status(400).send({ error: "Invalid request" });
        return;
      }
    });
  });
