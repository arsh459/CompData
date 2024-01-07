import * as functions from "firebase-functions";
import * as cors from "cors";
import { dailyStreakMain } from "../main";

const corsHandler = cors({ origin: true });

export const dailyStreakCronTestFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        console.log("test cron func");
        await dailyStreakMain();

        response.status(200).send({ status: "success" });

        return;
      } catch (error) {
        console.log("email scheduler error", error);
      }
      return;
    });
  });
