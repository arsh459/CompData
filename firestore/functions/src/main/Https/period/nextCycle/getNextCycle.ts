import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getCycleById,
  getLastSavedPeriodDate,
  getUserById,
} from "../../../../models/User/Methods";
import { handleNextCycle } from "./nextCycleHandler";
import { getUserTimezone } from "../../taskGenerator/generateReminders";
import { saveFutureCycleData } from "../saveUtils";

// import { addFutureSortedDates } from "./futureUtils";

const corsHandler = cors({ origin: true });
export const getNextCycleFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { uid } = request.body as {
          uid?: string;
        };

        console.log("uid", uid);

        if (uid) {
          const user = await getUserById(uid);

          const lastObj = await getLastSavedPeriodDate(uid);

          console.log(lastObj);
          if (lastObj && user) {
            const lastCycle = await getCycleById(uid, lastObj.cycleId);

            const tzString = getUserTimezone(
              user.recommendationConfig?.timezone?.tzString,
            );

            if (lastCycle) {
              const { futureCycles, futurePeriodDates } = await handleNextCycle(
                lastObj,
                tzString,
                lastCycle,
              );

              // save data
              await saveFutureCycleData(uid, futureCycles, futurePeriodDates);

              return response.status(200).send({});
            }
          }

          //   await mainPeriodHandler(uid, newPeriodDates);
          return response.status(200).send({});
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

/**
 * cycles
 * cycle {
 *
 * }
 *
 * periodDateObj {
 *
 * }
 *
 * if (noCycles){
 * oldCycles = []
 * getNewCycles -> []
 * saveNewCycles
 * }
 *
 * if (oldCyclesExixt){
 *
 * }
 *
 *
 */
