import * as functions from "firebase-functions";
import * as cors from "cors";
import { getPaidUsers } from "./paidUsers";
import { getNonZeroActivities } from "./getProgress";
import { format } from "date-fns";

const corsHandler = cors({ origin: true });

export interface ExportUserActivityProgressData {
  uid: string;
  name: string;
  phone: string;
  fp: number;
  type: "workout" | "steps" | "nutrition";
  activityName: string;
  date: string; // yyyy-mm-dd
}

export const activityProgressFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { start } = request.body as {
          start?: number;
        };

        // get paid users
        const { paidUsers } = await getPaidUsers();

        const finalData: ExportUserActivityProgressData[] = [];
        // for each user fetch data

        let i: number = 0;
        for (const paidUser of paidUsers) {
          const acts = await getNonZeroActivities(
            paidUser.uid,
            start ? start : Date.now(),
          );

          console.log(i, paidUser.name, acts.length);
          i++;

          for (const act of acts) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              activityName: act.activityName,
              fp: act.calories ? act.calories / 300 : 0,
              date: act.createdOn
                ? format(new Date(act.createdOn), "yyyy-MM-dd")
                : "",
              type:
                act.source === "nutrition"
                  ? "nutrition"
                  : act.stepsActive
                  ? "steps"
                  : "workout",
            });
          }
        }

        return response
          .status(200)
          .send({ status: "success", numEntries: i, data: finalData });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
