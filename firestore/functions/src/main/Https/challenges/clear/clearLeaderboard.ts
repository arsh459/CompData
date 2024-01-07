import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainClearFunc } from "./main";

const corsHandler = cors({ origin: true });

export const clearLeaderboardFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        await mainClearFunc();

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
