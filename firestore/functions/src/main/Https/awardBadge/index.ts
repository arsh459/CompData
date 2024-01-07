import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getUserById } from "../../../models/User/Methods";
// import {
//   getAwardById,
//   getBaseAchiever,
//   getUpdatedAwardIdForKPIs,
//   updateBaseAchiever,
// } from "../../../models/awards/getUtils";
// import { createProgressReportKPIs } from "./createUtils";
// import { getUserTimezone } from "../taskGenerator/generateReminders";

const corsHandler = cors({ origin: true });
export const awardBadgeFunc = functions
  .region("asia-south1")

  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const { uid, id, start, end } = request.body as {
        //   uid?: string;
        //   id?: string;
        //   start?: number;
        //   end?: number;
        // };

        // if (uid && id && start && end) {
        //   const award = await getAwardById(id);
        //   const baseAchiever = await getBaseAchiever(uid, id, start, end);

        //   const user = await getUserById(uid);

        //   const tzString = getUserTimezone(
        //     user?.recommendationConfig?.timezone?.tzString,
        //   );

        //   console.log("tzString", tzString);

        //   const kpis = await createProgressReportKPIs(
        //     tzString,
        //     uid,
        //     start,
        //     end,
        //     user?.dailyStepTarget ? user.dailyStepTarget : 5000,
        //   );

        //   console.log("kpis", kpis);
        //   const updatedAwardId = await getUpdatedAwardIdForKPIs(kpis, award);

        //   // update
        //   await updateBaseAchiever(
        //     baseAchiever,
        //     kpis.workoutRegularity,
        //     kpis.dietRegularity,
        //     kpis.stepRegularity,
        //     kpis.wtChange,
        //     kpis.moodAvg,
        //     kpis.energyAvg,
        //     updatedAwardId,
        //   );

        //   return response.status(200).send({ status: "success" });
        // }

        return response.status(400).send({ error: "Invalid request" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
