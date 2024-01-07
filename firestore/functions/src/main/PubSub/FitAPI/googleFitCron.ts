import * as functions from "firebase-functions";
import { handleFitUpdates } from "./handleFitUpdates";
// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const googleFitCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("*/10 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await handleFitUpdates();
    } catch (error) {
      console.log("evening cron");
    }
    return null;
  });
