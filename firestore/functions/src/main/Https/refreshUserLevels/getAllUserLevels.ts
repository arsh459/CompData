import * as functions from "firebase-functions";
import * as cors from "cors";
import { LevelSummary } from "./handleLevelUpdate";
import { getAllSocialboatUsers } from "../../../models/User/Methods";
import { handleUserReconcile } from "./handleUserLevelReconcile";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import {
//   CHALLENGE_ONE,
//   FAT_BURNER_CHALLENGE,
//   FAT_BURNER_GAME,
//   WFH_CHALLENGE,
// } from "../../../constants/challenge";
// import { getAllCoachRanks } from "../../../models/Activity/getUtils";

const corsHandler = cors({ origin: true });
export const getAllUserLevelsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const sbUsers = await getAllSocialboatUsers();

        const now = Date.now();

        // let i: number = 0;
        const returnSummary: LevelSummary[] = [];
        for (const sbUser of sbUsers) {
          const { totalFPoints, userLevel, activePoints } =
            await handleUserReconcile(sbUser.uid, 300);

          returnSummary.push({
            uid: sbUser.uid,
            phone: sbUser.phone,
            name: sbUser.name,
            email: sbUser.email,
            totalFPoints: totalFPoints,
            activeFitPoints: activePoints,
            level: userLevel,

            fetchedOnDate: getFormattedDateForUnix(now),
            fetchedOnTime: getFormattedDateForUnix(now, "hh:mma YYYY-MM-DD"),
          });

          //   i++;
        }

        return response
          .status(200)
          .send({ status: "success", data: returnSummary });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
