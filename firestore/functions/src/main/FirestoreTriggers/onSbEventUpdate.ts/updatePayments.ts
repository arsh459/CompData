import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import * as admin from "firebase-admin";

export const updatePaymentNames = async (
  previousEvent: sbEventInterface,
  nowEvent: sbEventInterface,
) => {
  // if event names have changed
  if (previousEvent.name !== nowEvent.name) {
    const eventPayments = await admin
      .firestore()
      .collection("users")
      .doc(nowEvent.ownerUID)
      .collection("payments")
      .where("eventId", "==", nowEvent.id)
      .get();

    for (const eventPayment of eventPayments.docs) {
      await eventPayment.ref.update({
        eventName: nowEvent.name,
      });
    }
  }
};
