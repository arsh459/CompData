import * as functions from "firebase-functions";
import * as cors from "cors";
// import { sendNotification } from "../../../utils/notifications";
// import { RemoteNotifeeData } from "../../../models/Notifications/interface";
// import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
// import { parseNotifeeData } from "../../../models/Notifications/createNotification";
import { onDemandParams } from "./interface";
import { getCohortMembers } from "../mixpanel/getUtils";
import { getTemplateNotification } from "../../../models/Notifications/Methods";

import { MixpanelMemberFirstore } from "../mixpanel/interface";
import { batchPromiseNotifications } from "../../FirestoreTriggers/onMixpanelCohortMemberUpdate/batchPromiseHandler";

const corsHandler = cors({ origin: true });

// export type notificationTypeSB = "text" | "image" | "message";

export const sendOnDemandNotificationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "4GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { cohortId, templateId } = request.body as onDemandParams;

        console.log("cohortId", cohortId, templateId);

        // get cohort members
        const members = await getCohortMembers(cohortId);
        console.log("members", members.length);

        // get notification
        const tempNot = await getTemplateNotification(templateId);
        console.log("tempNot", tempNot);

        if (tempNot) {
          // for each member
          const memberCount: number = members.length;

          for (let i: number = 0; i <= memberCount; i += 50) {
            const st = i;
            const en = i + 50;
            const memberArray: MixpanelMemberFirstore[] = members.slice(st, en);
            console.log("st", st, en, memberArray.length);

            await batchPromiseNotifications(memberArray, tempNot);
          }

          // for (const member of members) {
          //   await sendUserNotification(member, tempNot);
          // }
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

// hourlyNotificationCron
// notification will have schedule objects = string[] // 'hh:mm day'
// fetch all notifications arrayContains === string
// fetch all cohorts where arrayContains === notificationId
// for cohort - notification, fetch all members
// send notification
