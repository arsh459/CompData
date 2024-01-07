import * as functions from "firebase-functions";
import * as cors from "cors";

import { mainPeriodHandler } from "./main";
import { handlePeriodSync } from "./syncFlag";
// import { addFutureSortedDates } from "./futureUtils";

const corsHandler = cors({ origin: true });
export const periodTrackerFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { uid, newPeriodDates } = request.body as {
          uid?: string;
          newPeriodDates?: string[];
        };

        // console.log("uid", uid);
        // console.log("newPeriodDates", newPeriodDates);

        if (uid && newPeriodDates) {
          await mainPeriodHandler(uid, newPeriodDates, true);
          await handlePeriodSync(uid);
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
