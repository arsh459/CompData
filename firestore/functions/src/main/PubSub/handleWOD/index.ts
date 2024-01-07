import * as functions from "firebase-functions";
import { handleWOD } from "../../Https/refreshUserLevels/handleWOD";
// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const wodCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 9 * * THU")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      if (Date.now() < 1649963008000) {
        await handleWOD();
      }
    } catch (error) {
      console.log("evening cron");
    }
    return null;
  });
