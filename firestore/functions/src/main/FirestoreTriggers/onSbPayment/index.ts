import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { addPaidConv } from "../onUserUpdate/updateFPConv";
import { RazorpayPayment } from "../../../models/sbPayment/sbPayment";
// import { Activity } from "../../../models/Activity/Activity";
// import { dailyStepsHandler } from "./dailyStepsHandler";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { getUserById } from "../../../models/User/Methods";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";

export const onSbPaymentCreateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document(
    "appSubscriptions/{subId}/userSubs/{uid}/payments/{paymentId}",
  )
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onSbPaymentCreate")) {
        return;
      }

      const payment = change.data() as RazorpayPayment;
      const uid = context.params.uid;

      if (payment && uid) {
        // await addPaidConv(
        //   uid,
        //   payment.amount ? payment.amount / 100 : 0,
        //   payment.currency,
        //   payment.plan_id ? payment.plan_id : "website",
        //   "web",
        // );
        console.log(
          "PAID ON WEB:",
          "UID:",
          uid,
          "PRICE:",
          payment.amount ? payment.amount / 100 : 0,
          "CURRENCY:",
          payment.currency,
          payment.plan_id ? payment.plan_id : "website",
        );
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
