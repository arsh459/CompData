import * as functions from "firebase-functions";
import * as cors from "cors";
import { mixpanel } from "../../../mixpanel/mixpanel";
// import { subTaskDataItem, subTasksToUpdate } from "./constants";
import { getPaidUsers } from "../export/paidUsers";

const corsHandler = cors({ origin: true });

export const updateUserFlagsFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        let i: number = 0;
        const { paidUsers, userAppSubs } = await getPaidUsers();
        for (const paidUser of paidUsers) {
          const sub = userAppSubs[i];

          if (sub.paidPeriodEndsOn) {
            console.log(
              i,
              " | ",
              paidUser.uid,
              " | ",
              sub.paidPeriodEndsOn,
              " | ",
              paidUser.name,
            );
            await mixpanel.people.set(
              paidUser.uid,
              {
                paidPeriodEndsOn: new Date(sub.paidPeriodEndsOn),
              },
              { $ignore_time: true },
            );

            i++;
          }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
