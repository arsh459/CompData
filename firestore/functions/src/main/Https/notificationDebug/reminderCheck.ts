import * as functions from "firebase-functions";
import * as cors from "cors";
import { getRemindersForUserTemplate } from "../../../models/Reminders/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { getUserTimezone } from "../taskGenerator/generateReminders";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";
// import { handleTaskState } from "../../../models/Reminders/taskState";

// const swapnilUID = "wPKaomDuk4eoKHIIE7ArFPyynhU2";

const corsHandler = cors({ origin: true });
export const reminderCheckFunc = functions
  .region("asia-south1")

  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          console.log("uid", uid);
          const user = await getUserById(uid);
          const uReminders = await getRemindersForUserTemplate(
            uid,
            "summary_message",
          );

          const reminders = uReminders.sort(
            (x, y) =>
              (x.scheduledAt ? x.scheduledAt : 0) -
              (y.scheduledAt ? y.scheduledAt : 0),
          );

          const tz = getUserTimezone(
            user?.recommendationConfig?.timezone?.tzString,
          );

          for (const remind of reminders) {
            // await handleTaskState(remind, false, "SUCCESS", "FAILED");
            // if (remind.scheduledAt && remind.scheduledAt < Date.now()) {
            console.log(
              "r",
              remind.state,
              remind.date,
              remind.scheduledAt,
              remind.scheduledAt
                ? getFormattedDateForUnixWithTZ(
                    remind.scheduledAt,
                    tz,
                    "hh:mma ddd MMM DD YYYY",
                  )
                : null,
            );
            // }
          }

          return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "Invalid request" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
