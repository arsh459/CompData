import * as functions from "firebase-functions";
import { handleDayNotification } from "../morning/handleMorningNotifications";

export const eveningCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 20 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await handleDayNotification("evening");
    } catch (error) {
      console.log("evening cron");
    }
    return null;
  });
