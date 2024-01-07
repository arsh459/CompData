import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUsersSubscriptions } from "../../../models/User/Methods";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
// import {
// handleUserActivityDump,
//   handleUserReconcile,
// } from "./handleUserLevelReconcile";
// import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";

interface PaidDumpInterface {
  uid: string;
  freeTrialEndsOn: string;
  paidPeriodEndsOn: string;
}

const corsHandler = cors({ origin: true });
export const paidUserDumpFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "2GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const sbUsers = await getUsersSubscriptions();
        // console.log("users", sbUsers.length);
        const returnSummary: PaidDumpInterface[] = [];
        for (const sbUser of sbUsers) {
          returnSummary.push({
            uid: sbUser.uid,
            freeTrialEndsOn: sbUser.freeTrialEndsOn
              ? getFormattedDateForUnix(
                  sbUser.freeTrialEndsOn,
                  "hh:mma YYYY-MM-DD",
                )
              : "",
            paidPeriodEndsOn: sbUser.paidPeriodEndsOn
              ? getFormattedDateForUnix(
                  sbUser.paidPeriodEndsOn,
                  "hh:mma YYYY-MM-DD",
                )
              : "",
          });

          //   i++;
        }
        return response.status(200).send({
          status: "success",
          numResults: sbUsers.length,
          data: returnSummary,
        });

        // let i: number = 0;
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
