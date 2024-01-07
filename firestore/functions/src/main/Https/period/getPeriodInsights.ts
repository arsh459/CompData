import * as functions from "firebase-functions";
import * as cors from "cors";
// import {
//   getUserById,
//   getUserPeriodDateForDateString,
// } from "../../../models/User/Methods";
// import { insightGenerator } from "./insightGenerator";

const corsHandler = cors({ origin: true });
export const getPeriodInsightsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, date } = request.body as {
          uid?: string;
          date?: string;
        };

        if (uid && date) {
          // const periodObj = await getUserPeriodDateForDateString(uid, date);

          // const user = await getUserById(uid);

          // if (
          // periodObj &&
          // predicted values
          // user?.periodTrackerObj?.predictedCycleLength &&
          // user.periodTrackerObj.preductedPeriodLength
          // ) {
          // const insight = insightGenerator(
          // periodObj,
          // user?.periodTrackerObj?.predictedCycleLength,
          // user.periodTrackerObj.preductedPeriodLength,
          // user,
          // );

          // console.log("insight", insight);

          return response.status(200).send({});
          // }

          // save relevant information in db
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * date
 *
 * periodDates <- UserMarkedDates
 *
 *
 *
 *
 */
