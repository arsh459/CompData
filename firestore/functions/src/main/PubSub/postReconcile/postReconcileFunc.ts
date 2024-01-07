import * as functions from "firebase-functions";
import { seedParentPostId } from "../../Https/refreshUserLevels/seedParentPostId";
// import { handleDayNotification } from "./handleMorningNotifications";

export const postReconcileCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("*/5 * * * *")
  // .pubsub.schedule("*/2 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await seedParentPostId(Date.now() - 6 * 60 * 1000);
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
