import { db } from "@config/firebase";
import { checkpoints, userSlotStatus } from "@models/User/User";
import { doc, updateDoc } from "firebase/firestore";

export const updateSlotStatus = async (
  uid: string,
  slotStatusVal: userSlotStatus,
  slotId?: string,
  bookingId?: string
) => {
  await updateDoc(doc(db, "users", uid), {
    onboardingCallStatus: slotStatusVal,
  });

  if (slotId && bookingId)
    await updateDoc(doc(doc(db, "slots", slotId), "slotBooking", bookingId), {
      status: slotStatusVal,
    });
};

export const updateUserCheckpoint = async (
  uid: string,
  key: checkpoints,
  value: boolean
) => {
  await updateDoc(doc(db, "users", uid), {
    [`waMessageStatus.${key}`]: value,
  });
};

export const updateUserUnsub = async (uid: string, unsub: boolean) => {
  await updateDoc(doc(db, "users", uid), {
    unsubscribe: unsub,
  });
};
