import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  getCohortById,
  getSbEventById,
} from "../../../models/sbEvent/getUtils";
import {
  handleEventRegistration,
  handleUserEnrollment,
} from "../../../models/sbEvent/handleEvent";
import { sbEventPayment } from "../../../models/sbPayment/sbPayment";
import { getUserById } from "../../../models/User/Methods";
import { handleNewRegistration } from "./handleNewRegistration";
import { handlePaymentUpdate } from "./handlePaymentUpdate";
// import { handleRegistrationEmail } from "./handleRegistrationEmail";
// import { handleWhatsappMessage } from "./handleWhatsappMessage";

export const onPaymentCreateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/payments/{paymentId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onPaymentCreateFunc")) {
        return;
      }

      const userId = context.params.userId;
      const payment = snapshot.data() as sbEventPayment;

      // functions.logger.log("userId", userId);
      // functions.logger.log("event id", payment.eventId);

      if (userId && payment.eventId) {
        await handlePaymentUpdate(
          payment.eventId,
          userId,
          payment.amount / 100,
        );

        const eventObj = await getSbEventById(payment.eventId);
        const user = await getUserById(userId);
        // const customerUser = await getUserById(payment.uid ? payment.uid : "");

        if (eventObj) {
          const pinnedCohort = await getCohortById(
            eventObj.id,
            payment.cohortId,
          );
          await handleNewRegistration(
            payment.id,
            payment.order_id,
            payment.contact,
            user?.uid,
            payment.eventId,
            payment.email,
            eventObj.name,
            payment.amount ? `${payment.amount / 100}` : "",
            payment.currency,
            pinnedCohort?.id,
            payment.uid ? payment.uid : "",
          );

          await handleEventRegistration(eventObj.id, pinnedCohort);

          // await handleRegistrationEmail(
          //   eventObj,
          //   payment.email ? payment.email : "",
          //   payment.amount ? `${payment.amount / 100}` : "",
          //   payment.currency,
          //   payment.contact,
          // );

          // await handleWhatsappMessage(
          //   payment.email ? payment.email : "Unknwon email",
          //   payment.currency,
          //   payment.amount ? `${payment.amount / 100}` : "",
          //   payment.contact ? payment.contact : "",
          //   eventObj,
          //   user,
          //   pinnedCohort,
          //   customerUser?.name ? customerUser.name : "there",
          // );

          if (payment.uid) {
            await handleUserEnrollment(
              payment.uid,
              userId,
              eventObj.id,
              payment.cohortId,
            );
          }
          // await handleWhatsappMessage(payment, eventObj, user);
        }
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
