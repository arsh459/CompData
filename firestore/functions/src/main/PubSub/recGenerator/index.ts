import * as functions from "firebase-functions";
import { generatorTrigger } from "./main";
// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const recGeneratorFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("30 23 * * *")
  .onRun(async () => {
    try {
      await generatorTrigger();
    } catch (error) {
      console.log("night cron");
    }
    return null;
  });
