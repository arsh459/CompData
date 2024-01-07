import * as functions from "firebase-functions";
import { waCommunicationMain } from "../../Https/sendNotificationCheck/waCommunicationHandler";

// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const notificationCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("0 * * * *")
  .onRun(async () => {
    try {
      await waCommunicationMain();

      //   await generatorTrigger();
    } catch (error) {
      console.log("night cron");
    }
    return null;
  });
