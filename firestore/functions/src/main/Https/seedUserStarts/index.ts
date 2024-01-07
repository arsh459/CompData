import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  ARJA_BEGINEER,
  GREESHA_PCOS,
  KIRSTEN_JUMP_ROPE,
  KOHLI,
  MARY_KOM,
  PANDYA,
  PV_SINDHU,
  SOCIALBOAT_BEGINNER,
} from "../taskGenerator/constants";
import * as admin from "firebase-admin";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { BadgeProgress } from "../../../models/Prizes/Badges";
import { RecommendationConfig } from "../../../models/User/User";
import { getUserById } from "../../../models/User/Methods";
import { getDayStartIST } from "../../PubSub/activityTracker/utils";
// import { getTask } from "../../../models/Task/getUtils";

// import { getActivityById } from "../../../models/Activity/getUtils";

const corsHandler = cors({ origin: true });
export const seedUserStartFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // run at 12:00
        // if no new tasks done today, leave.
        // if new tasks done, increment

        for (const badgeId of [
          GREESHA_PCOS,
          ARJA_BEGINEER,
          SOCIALBOAT_BEGINNER,
          PV_SINDHU,
          MARY_KOM,
          PANDYA,
          KOHLI,
          KIRSTEN_JUMP_ROPE,
        ]) {
          console.log();
          console.log();
          console.log("badgeId", badgeId);
          const bProg = await admin
            .firestore()
            .collection("sbEvents")
            .doc(TEAM_ALPHABET_GAME)
            .collection("badges")
            .doc(badgeId)
            .collection("badgeProgress")
            .get();

          const bProgs: BadgeProgress[] = [];
          for (const progDoc of bProg.docs) {
            bProgs.push(progDoc.data() as BadgeProgress);
          }

          let i: number = 0;
          for (const progress of bProgs) {
            if (progress.progress.length && progress.progress[0].nbFPEarnt) {
              const user = await getUserById(progress.uid);
              if (
                user?.badgeId === badgeId &&
                !user.recommendationConfig?.start
              ) {
                const time = Date.now();
                const dayStart = getDayStartIST(time);

                const newStart =
                  dayStart - progress.currentDay * 24 * 60 * 60 * 1000;

                const recConfig: RecommendationConfig = {
                  primaryWorkoutCoach: user.motivatedBy ? user.motivatedBy : "",
                  start: newStart,
                  baseTier: 0,
                };

                // update badgeId
                // update badgeIdEnrolled

                // await admin
                //   .firestore()
                //   .collection("users")
                //   .doc(user.uid)
                //   .update({
                //     badgeId: badgeId,
                //     badgeIdEnrolled: badgeId,
                //     ["recommendationConfig.primaryWorkoutCoach"]:
                //       recConfig.primaryWorkoutCoach,
                //     ["recommendationConfig.start"]: recConfig.start,
                //     ["recommendationConfig.baseTier"]: recConfig.baseTier,
                //   });

                console.log(
                  i,
                  user?.name,
                  recConfig.primaryWorkoutCoach,
                  progress.currentDay,
                  // new Date(recConfig.start),
                );
                i++;
              }
            }
          }
        }

        //   if (status === "success")
        return response.status(200).send({ status: "success" });
        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
