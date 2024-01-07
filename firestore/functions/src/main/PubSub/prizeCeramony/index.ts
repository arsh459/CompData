import * as functions from "firebase-functions";
import { handlePrizeNotif } from "./handlePrizeNotif";

export const prizeCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("00 19 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      if (Date.now() < 1638840983000) {
        await handlePrizeNotif();
      }
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
