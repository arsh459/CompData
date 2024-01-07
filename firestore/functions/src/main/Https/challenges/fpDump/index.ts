import * as functions from "firebase-functions";
import * as cors from "cors";
import { fpDumpMain } from "./main";

const corsHandler = cors({ origin: true });

export const fpDumpFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { status, reason } = await fpDumpMain();
        console.log("status", status);
        if (status) {
          response.status(200).send({ status: "success" });
          return;
        } else {
          response.status(500).send({ status, reason });
          return;
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
