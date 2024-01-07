import * as functions from "firebase-functions";
import * as cors from "cors";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import {
  getUserActivityAfter,
  getUserRankForUID,
} from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getEventMetricsForEventObj } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import {
  getChallengeEndTime,
  getCurrentRoundTime,
} from "../../FirestoreTriggers/onActivityWrite/utils";

const corsHandler = cors({ origin: true });
export const reconcileUserPtsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const gameId = TEAM_ALPHABET_GAME;
        const uid = "XdrshWXNC8a6jSO7vtpGOx8Xhfu1";

        const rank = await getUserRankForUID(gameId, uid);

        const game = await getSbEventById(gameId);
        const metrics = getEventMetricsForEventObj(game);

        const nowTime = Date.now();

        if (metrics.after && metrics.rounds) {
          const days = getDaysElapsed(
            metrics.after,
            getChallengeEndTime(
              nowTime,
              metrics.before,
              metrics.challengeLength,
            ),
          );

          const roundStartTime = getCurrentRoundTime(
            days,
            metrics.after,
            metrics.rounds,
          );

          const userActs = await getUserActivityAfter(
            uid,
            roundStartTime,
            nowTime,
          );

          // activity points
          let userPts: number = 0;
          let goalPts: number = 0;
          for (const act of userActs) {
            const actCalories = (act.calories ? act.calories : 0) / 300;

            userPts += actCalories;
            goalPts += act.goalScores?.fit_points
              ? act.goalScores?.fit_points
              : 0;

            if (actCalories !== act.goalScores?.fit_points) {
              console.log(
                "Miss",
                `https://socialboat.live/admin/dashboard/${uid}/${act.id}`,
                act.activityName,
                act.goalScores,
                actCalories,
              );
            } else {
              //   console.log(act.activityName, act.goalScores, actCalories);
            }
          }

          console.log("userPts", userPts, goalPts);
          console.log("rank?.kpiScoresV2", rank?.kpiScoresV2);

          //   console.log("ro", roundStartTime);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
