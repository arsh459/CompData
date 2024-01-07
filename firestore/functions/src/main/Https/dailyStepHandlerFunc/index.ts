import * as functions from "firebase-functions";
import * as cors from "cors";
import { dailyStepsHandler } from "../../FirestoreTriggers/stepUpdate/dailyStepsHandler";
import { getStepDocs } from "../../../models/StepDoc/StepDoc";

const corsHandler = cors({ origin: true });
export const dailyStepHandlerFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const resp = request.body as { uid?: string };

        if (resp.uid) {
          const remoteDocs = await getStepDocs(resp.uid);
          for (const stepDoc of remoteDocs) {
            await dailyStepsHandler(resp.uid, stepDoc);
          }
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
