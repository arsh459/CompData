import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshMain } from "./main";

const corsHandler = cors({ origin: true });

export const refreshLeaderboardFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { level } = request.body as { level?: number };

        if (typeof level === "number") {
          const status = await refreshMain(level);
          if (status) {
            response.status(200).send({ status: "success" });
          } else {
            response
              .status(500)
              .send({ status: "failed", reason: "levelObj not present in db" });
          }
        } else {
          response
            .status(500)
            .send({ status: "failed", reason: "level not present in query" });
        }

        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
