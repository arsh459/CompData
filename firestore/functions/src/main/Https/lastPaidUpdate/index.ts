import * as functions from "firebase-functions";
import * as cors from "cors";
import { usersPaidDates } from "./constants";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { parseDate } from "./utils";

const corsHandler = cors({ origin: true });

export const lastPaidUpdateFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        for (const userObj of usersPaidDates) {
          // const dt1 = ;

          console.log(userObj.uid);
          await mixpanel.people.set(
            userObj.uid,
            {
              lastPaidUnix: parseDate(userObj.lastPaidDate),
              paidPeriodEndsOn: parseDate(userObj.accessTill),
            },
            { $ignore_time: true },
          );
        }
        response.status(200).send({ status: "success" });
        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
