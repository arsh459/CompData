import * as functions from "firebase-functions";
import * as cors from "cors";
import { removeUserMain } from "./main";

const corsHandler = cors({ origin: true });

export const removeUserFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        console.log("Removing", uid);

        if (uid) {
          const status = await removeUserMain(uid);
          console.log("status", status);
          if (status) {
            response.status(200).send({ status: "success" });
            return;
          }
        } else {
          response
            .status(400)
            .send({ status: "failed", reason: "uid not present" });

          return;
        }

        response.status(400).send({
          status: "failed",
          reason: "user not present or implementation error",
        });

        return;

        // console.log("request");
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
