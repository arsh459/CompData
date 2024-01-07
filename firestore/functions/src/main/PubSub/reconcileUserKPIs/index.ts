import * as functions from "firebase-functions";
import { reconcileUserActivities } from "./userActivityReconcile";

export const reconcileUserKPIsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("0 9 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      const th = 400;
      await reconcileUserActivities(th);
    } catch (error) {
      console.log("User reconciliation failed");
      console.log("error", error);
    }
    return null;
  });
