import * as functions from "firebase-functions";
import * as cors from "cors";

const corsHandler = cors({ origin: true });

export const mergeUsers = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        console.log("hi");

        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
