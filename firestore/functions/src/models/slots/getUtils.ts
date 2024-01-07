import * as admin from "firebase-admin";
import { SlotBooking } from "./Slot";

export const getSlotBooking = async (bookingId: string, slotId: string) => {
  const remoteDoc = await admin
    .firestore()
    .collection("slots")
    .doc(slotId)
    .collection("slotBooking")
    .doc(bookingId)
    .get();

  if (remoteDoc.exists) {
    return remoteDoc.data() as SlotBooking;
  }

  return undefined;
};
