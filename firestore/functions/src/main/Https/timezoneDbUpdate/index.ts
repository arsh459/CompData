import * as functions from "firebase-functions";
import * as cors from "cors";
import { timezoneDbUpdateMain } from "./main";

const corsHandler = cors({ origin: true });

export const timezoneDbUpdateFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const status = await timezoneDbUpdateMain();

        if (status) {
          response.status(200).send({ status: "success" });
          return;
        } else {
          response.status(500).send({
            status: "failed",
            reason: "Unhandled Server condition",
          });
          return;
        }
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
