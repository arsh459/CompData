import * as functions from "firebase-functions";
import * as cors from "cors";

import { mainPeriodHandler } from "./main";
import { getOnlyPeriodDatesFromDB } from "../../../models/User/Methods";
import { handlePeriodSync } from "./syncFlag";
// import { addFutureSortedDates } from "./futureUtils";

const corsHandler = cors({ origin: true });
export const refreshPeriodFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const newPeriodDates = await getOnlyPeriodDatesFromDB(uid);
          console.log("newPeriodDates from DB", newPeriodDates);

          await mainPeriodHandler(uid, newPeriodDates, false);
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
