import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getTemplateNotification } from "../../../models/Notifications/Methods";
import { getCohort, getCohortMembers } from "../../Https/mixpanel/getUtils";
// import { MixpanelMemberFirstore } from "../../Https/mixpanel/interface";
import { sendUserNotification } from "./sendUserNotification";

export const USER_NOTIFICATION_TIME_THROTTLE = 1000;

export const onMixpanelCohortMemberUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("mixpanelCohorts/{id}/members/{memberId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onMixpanelCohortMemberUpdateFunc",
        )
      ) {
        return;
      }

      // const updatedCohort = change.after.data() as MixpanelMemberFirstore;
      const cohortId = context.params.id;

      // getCohort
      const mixpanelCohort = await getCohort(cohortId);

      if (mixpanelCohort && mixpanelCohort.onAddNotification) {
        const members = await getCohortMembers(cohortId);
        const tempNot = await getTemplateNotification(
          mixpanelCohort.onAddNotification,
        );

        if (tempNot) {
          for (const member of members) {
            await sendUserNotification(member, tempNot);
          }
        }
      }

      // check ifNotification was sent before x days
      // check userThrottle
      // send notification
      // else skip

      return;
    } catch (error) {
      console.error(error);
    }
  });
