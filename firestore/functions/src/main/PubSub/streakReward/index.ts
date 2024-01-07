import * as functions from "firebase-functions";
import { handleStreakPrize } from "./handleStreakReward";

export const streakCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("*/2 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await handleStreakPrize();
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
