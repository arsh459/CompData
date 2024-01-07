import * as functions from "firebase-functions";
import { getUsersForEmail, sendEmails } from "../../../models/User/emailSets";
// import {getUserLeads} from '../../../models/Lead/Methods/getUtils';
// import {getAllNotificationsForUser} from '../../../models/Notifications/Methods';
// import {getUserTrips} from '../../../models/Trip/Methods/getUtils';
// import { UserInterface } from "../../../models/User/User";

export const signUpEmailScheduler = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("*/10 * * * *")
  .onRun(async () => {
    try {
      // curr date
      const currDate = new Date().getTime();

      const welcomeUsers = await getUsersForEmail(currDate, "unixWelcomeEmail");
      await sendEmails("unixWelcomeEmail", welcomeUsers);

      const d2Emails = await getUsersForEmail(currDate, "unixDay2Email");
      await sendEmails("unixDay2Email", d2Emails);

      const d3Emails = await getUsersForEmail(currDate, "unixDay3Email");
      await sendEmails("unixDay3Email", d3Emails);
    } catch (error) {
      console.log("email scheduler error", error);
    }
    return null;
  });
