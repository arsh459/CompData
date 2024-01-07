import * as functions from "firebase-functions";
import { notificationMessage } from "./main";

export const workoutCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("50 6 * * 1,2,3,4,5,6")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await notificationMessage();
    } catch (error) {
      console.log("email scheduler error", error);
    }
    return null;
  });
