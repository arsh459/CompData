import * as functions from "firebase-functions";
import * as cors from "cors";
import { updateRoundMain } from "./main";

const corsHandler = cors({ origin: true });

export const updateRoundFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { roundId } = request.body as { roundId?: string };

        if (roundId) {
          await updateRoundMain(roundId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
