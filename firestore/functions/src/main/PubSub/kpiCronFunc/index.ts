import * as functions from "firebase-functions";
import { FAT_BURNER_GAME } from "../../../constants/challenge";
import { seedDataFunc } from "../../Https/seedUserData/seedDataFunc";

export const kpiCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("0 */2 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await seedDataFunc(FAT_BURNER_GAME, "month-3");
      // await seedDataFunc(RUNNER_GAME);
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
