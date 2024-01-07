import * as functions from "firebase-functions";
import * as cors from "cors";
import { summariseKPIHandler } from "./summariseHandler";

const corsHandler = cors({ origin: true });
export const summariseKPIsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as {
          uid?: string;
          gameId?: string;
          sprintId?: string;
        };

        console.log("b", body.gameId, body.uid, body.sprintId);

        if (body.gameId && body.uid) {
          await summariseKPIHandler(body.uid, body.gameId, body.sprintId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.error(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
