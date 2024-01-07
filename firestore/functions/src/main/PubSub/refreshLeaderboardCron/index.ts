import * as functions from "firebase-functions";
import { FAT_BURNER_GAME, RUNNER_GAME } from "../../../constants/challenge";
import { refreshUserLeaderHandlerV3 } from "../../Https/reconcileUserLeaderboard/refreshUserLeaderHandlerV3";
// import { refreshCoachesHandlerV2 } from "../../Https/refreshCoachLeaderboard/refreshCoachesHandlerV2";
// import { refreshPrizesHandlerV2 } from "../../Https/refreshPrizes/refreshPrizesHandlerV2";

export const refreshLeaderboardCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "4GB" })
  .pubsub.schedule("0 */4 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      await refreshUserLeaderHandlerV3(FAT_BURNER_GAME);
      // await refreshCoachesHandlerV2(FAT_BURNER_GAME);
      // await refreshPrizesHandlerV2(FAT_BURNER_GAME);

      await refreshUserLeaderHandlerV3(RUNNER_GAME);
      // await refreshCoachesHandlerV2(RUNNER_GAME);
      // await refreshPrizesHandlerV2(RUNNER_GAME);
    } catch (error) {
      console.log("morning notification failed");
    }
  });
