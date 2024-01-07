import * as functions from "firebase-functions";
// import { handleActivityQueue } from "../../Https/reconcileUserLeaderboard/refreshUserLeaderboardV2Inc";
// import { getFormattedDateForUnix } from "../activityTracker/utils";
import {
  // FAT_BURNER_GAME,
  // RUNNER_GAME,
  // WOMENS_GAME,
  // ALPHABET_GAME,
  TEAM_ALPHABET_GAME,
  // HEADSTART_GAME,
  // GURGAON_FIT,
  // BURPEE_GAME,
  // STUDENT_OLYMPICS,
} from "../../../constants/challenge";

import { refreshUserLeaderHandlerV3 } from "../../Https/reconcileUserLeaderboard/refreshUserLeaderHandlerV3";
// import { refreshCoachesHandlerV2 } from "../../Https/refreshCoachLeaderboard/refreshCoachesHandlerV2";
// import { refreshPrizesHandlerV2 } from "../../Https/refreshPrizes/refreshPrizesHandlerV2";

export const activityQueueFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "4GB" })
  .pubsub.schedule("*/30 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async (context) => {
    try {
      // await refreshUserLeaderHandlerV3(FAT_BURNER_GAME);
      // await refreshCoachesHandlerV2(FAT_BURNER_GAME);
      // await refreshPrizesHandlerV2(FAT_BURNER_GAME);
      // try {
      //   await refreshUserLeaderHandlerV3(RUNNER_GAME);
      //   await refreshCoachesHandlerV2(RUNNER_GAME);
      // } catch (error) {}
      // await refreshPrizesHandlerV2(RUNNER_GAME);

      // try {
      //   await refreshUserLeaderHandlerV3(WOMENS_GAME);
      //   await refreshCoachesHandlerV2(WOMENS_GAME);
      // } catch (error) {}

      // try {
      //   await refreshUserLeaderHandlerV3(ALPHABET_GAME);
      //   await refreshCoachesHandlerV2(ALPHABET_GAME);
      // } catch (error) {}

      try {
        await refreshUserLeaderHandlerV3(TEAM_ALPHABET_GAME);
        // await refreshCoachesHandlerV2(TEAM_ALPHABET_GAME);
      } catch (error) {}

      // try {
      //   await refreshUserLeaderHandlerV3(HEADSTART_GAME);
      //   await refreshCoachesHandlerV2(HEADSTART_GAME);
      // } catch (error) {}

      try {
        // await refreshUserLeaderHandlerV3(STUDENT_OLYMPICS);
        // await refreshCoachesHandlerV2(STUDENT_OLYMPICS);
      } catch (error) {}

      // try {
      //   await refreshUserLeaderHandlerV3(GURGAON_FIT);
      //   await refreshCoachesHandlerV2(GURGAON_FIT);
      // } catch (error) {}
      // await refreshPrizesHandlerV2(RUNNER_GAME);

      // const unix = new Date(context.timestamp).getTime();
      // const hour = getFormattedDateForUnix(unix, "HH:mm");
      // functions.logger.log("hour:", hour);
      // if (
      //   [
      //     "00:00",
      //     "04:00",
      //     "08:00",
      //     "12:00",
      //     "16:00",
      //     "20:00",
      //     "24:00",
      //   ].includes(hour)
      // ) {
      //   functions.logger.log("hour: reconcile", hour);
      //   // reconcile
      //   await refreshUserLeaderHandlerV2(FAT_BURNER_GAME);
      //   await refreshCoachesHandlerV2(FAT_BURNER_GAME);
      //   await refreshPrizesHandlerV2(FAT_BURNER_GAME);
      //   await refreshUserLeaderHandlerV2(RUNNER_GAME);
      //   await refreshCoachesHandlerV2(RUNNER_GAME);
      //   await refreshPrizesHandlerV2(RUNNER_GAME);
      // } else {
      //   functions.logger.log("hour: increment", hour);
      //   await handleActivityQueue();
      // }
    } catch (error) {
      functions.logger.error("activity queue", error);
    }
    return null;
  });
