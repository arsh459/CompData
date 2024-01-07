import * as functions from "firebase-functions";
import { handleDayNotification } from "./handleMorningNotifications";

export const morningCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("5 19 * * *")
  // .pubsub.schedule("*/2 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await handleDayNotification("morning");
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
