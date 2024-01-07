import * as functions from "firebase-functions";
import { dailyStreakMain } from "./main";

export const dailyStreakCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("*/15 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await dailyStreakMain();
      return;
    } catch (error) {
      console.log("email scheduler error", error);
    }
    return null;
  });
