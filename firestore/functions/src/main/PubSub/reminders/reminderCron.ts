import * as functions from "firebase-functions";
import { getTasksByStateAndTime } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
import { handleRemindersV2 } from "../../../models/Reminders/handleRemindersV2";

export const reminderCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("*/10 * * * *")
  .onRun(async () => {
    try {
      // curr date
      const currDate = new Date().getTime();

      //   functions.logger.log("currDate", currDate);

      // all scheduled tasks
      const remindersToSend = await getTasksByStateAndTime(currDate, "PENDING");
      functions.logger.log("REMINDER CRON TASKS:", remindersToSend.length);

      //   functions.logger.log("remindersToSend", remindersToSend.length);
      await handleRemindersV2(remindersToSend, "SUCCESS", "FAILED");
    } catch (error) {
      console.log("email scheduler error", error);
    }
    return null;
  });
