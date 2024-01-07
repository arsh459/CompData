import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  alternativesForTemplates,
  testCohort,
  unpaid_noOnboarding_4Days_Array,
} from "../../PubSub/notifications/constants";
import { sendCohortMessage } from "../../PubSub/notifications/signUpCohortMessage";
// import * as admin from "firebase-admin";
// import { waCommunicationMain } from "./waCommunicationHandler";
// import { Reminder } from "../../../models/Reminders/Reminder";
// import { UserInterface } from "../../../models/User/User";

const corsHandler = cors({ origin: true });
export const sendNotificationCheckFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const optInMessages = await admin
        //   .firestore()
        //   .collection("users")
        //   .where("optOutSent", "==", "SCHEDULED")
        //   // .where("state", "==", "PENDING")
        //   .get();

        // for (const reminder of optInMessages.docs) {
        //   const data = reminder.data() as UserInterface;
        //   console.log("data", data.uid);

        //   await admin
        //     .firestore()
        //     .collection("users")
        //     .doc(data.uid)
        //     .update({ optOutSent: admin.firestore.FieldValue.delete() });
        //   // await admin
        //   //   .firestore()
        //   //   .collection("reminders")
        //   //   .doc(data.id)
        //   //   .update({ state: "FAILED" });
        // }

        // console.log(
        //   "callback data",
        //   JSON.stringify(
        //     getCallbackData(
        //       "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //       "notificationId",
        //       "cohortId",
        //     ),
        //   ),
        // );

        // const d = await sendHSMV2(
        //   "+919811800046",
        //   "what_is_sb_1",
        //   ["Rahul"],
        //   undefined,
        //   [
        //     "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/what_is_sb.png",
        //   ],
        //   JSON.stringify(
        //     getCallbackData(
        //       "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //       "notificationId",
        //       "cohortId",
        //     ),
        //   ),
        // );

        // if (d && typeof d !== "string")
        //   await savePushSend(
        //     "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //     "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //     "notificationId",
        //     d.id,
        //   );

        // console.log(d);

        // auth no onboarding list
        await sendCohortMessage(
          testCohort,
          unpaid_noOnboarding_4Days_Array,
          alternativesForTemplates,
          0.00001,
        );

        //
        // await waCommunicationMain(true);

        // return
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
