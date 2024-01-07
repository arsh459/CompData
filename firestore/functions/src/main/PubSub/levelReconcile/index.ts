import * as functions from "firebase-functions";
import { handleLevelUpdate } from "../../Https/refreshUserLevels/handleLevelUpdate";

export const levelReconcileFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("5 0 * * *")
  // .pubsub.schedule("*/2 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await handleLevelUpdate(true);
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
