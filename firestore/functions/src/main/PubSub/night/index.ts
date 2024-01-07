import * as functions from "firebase-functions";
// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const nightCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 21 * * *")
  .onRun(async () => {
    try {
      //   await handleDayNotification("evening");
    } catch (error) {
      console.log("night cron");
    }
    return null;
  });
