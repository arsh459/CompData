import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { getUserById } from "../../../models/User/Methods";
import { getSBPlan } from "../../Https/export/paidUsers";
import { mixpanel } from "../../../mixpanel/mixpanel";
// import { getTask } from "../../../models/Task/getUtils";
// import { sumariseHandler } from "../../Https/summariseKPIs/summariseHandler";

export const onNewPaymentFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 60 })
  .firestore.document(
    "appSubscriptions/{subId}/userSubs/{uid}/payments/{paymentId}",
  )
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onNewGamePaymentFunc")
      ) {
        return;
      }

      // const gameId: string = context.params.gameId;
      const uid: string = context.params.uid;
      const paymentId: string = context.params.paymentId;

      console.log("NEW GAME PAYMENT", uid, paymentId);

      const sNow = Date.now();
      await saveReminderInDB(
        createReminder(
          true,
          "game_payment",
          undefined,
          sNow,
          undefined,
          undefined,
          undefined,
          uid,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          paymentId,
        ),
      );

      const userObj = await getUserById(uid);
      if (userObj?.sbPlanId) {
        const sbPlanAdded = await getSBPlan(userObj.sbPlanId);

        if (sbPlanAdded?.offerings) {
          const docCons =
            typeof sbPlanAdded.offerings.nbDoctorConsultation === "number"
              ? sbPlanAdded.offerings.nbDoctorConsultation
              : 0;
          const dietCons =
            typeof sbPlanAdded.offerings.nbDietConsultation === "number"
              ? sbPlanAdded.offerings.nbDietConsultation
              : 0;

          await admin
            .firestore()
            .collection("users")
            .doc(userObj.uid)
            .update({
              [`consultations.nbDoctorConsultationsTotal`]:
                admin.firestore.FieldValue.increment(docCons),
              [`consultations.nbDietConsultationsTotal`]:
                admin.firestore.FieldValue.increment(dietCons),
            });
        }

        // update plan in db
        await mixpanel.people.set(
          userObj.uid,
          {
            planName: sbPlanAdded?.name ? sbPlanAdded?.name : "SB Plan",
          },
          { $ignore_time: true },
        );
      }

      // const activityPre = snapshot.before.data() as WorkoutActivity;

      return;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
