import * as functions from "firebase-functions";
import * as cors from "cors";
import { handleSakhiMain } from "./main";

const corsHandler = cors({ origin: true });

export const sakhiFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { phone, message } = request.body as {
          phone?: string;
          message?: string;
        };

        if (phone && message) {
          await handleSakhiMain(phone, message);
          response.status(200).send({ status: "success" });
          return;
        }

        response
          .status(500)
          .send({ status: "failed", reason: "no phone number" });
        return;
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
