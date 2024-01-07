import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainPeriodHandler } from "../main";
import { fetchOnlyPeriodDates } from "../../../../models/User/Methods";

// import { addFutureSortedDates } from "./futureUtils";

const corsHandler = cors({ origin: true });
export const markPeriodFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { uid, date, action } = request.body as {
          uid?: string;
          date?: string;
          action: "add" | "remove";
        };

        // console.log("uid", uid);
        // console.log("newPeriodDates", newPeriodDates);

        if (uid && date && action) {
          const periodDates = await fetchOnlyPeriodDates(uid);

          const newPeriodDates: string[] = [];
          if (action === "add") {
            periodDates.periodDatesInArray.map((item) =>
              newPeriodDates.push(item.date),
            );
            newPeriodDates.push(date);
          } else {
            periodDates.periodDatesInArray.map((item) =>
              item.date !== date ? newPeriodDates.push(item.date) : null,
            );
          }

          await mainPeriodHandler(uid, newPeriodDates, true);

          return response.status(200).send({});
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
