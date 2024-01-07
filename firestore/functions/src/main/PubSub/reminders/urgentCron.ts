import * as functions from "firebase-functions";
import { getTasksByStateAndTime } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
import { handleRemindersV2 } from "../../../models/Reminders/handleRemindersV2";

export const urgentReminderCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 60 })
  .pubsub.schedule("* * * * *")
  .onRun(async () => {
    try {
      // curr date
      const currDate = new Date().getTime();

      //   functions.logger.log("currDate", currDate);

      // all scheduled tasks
      const urgentReminders = await getTasksByStateAndTime(currDate, "URGENT");
      functions.logger.log("URGENT CRON TASKS:", urgentReminders.length);

      await handleRemindersV2(urgentReminders, "SUCCESS", "FAILED");
    } catch (error) {
      console.log("email scheduler error", error);
    }
    return null;
  });
