import { Registration } from "./Registration";
import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";

export const createNewRegistration = (
  paymentId: string,
  orderId: string,
  phone: string,
  eventId: string,
  registrationType: "paid" | "invite",
  email: string | undefined | null,
  name: string | undefined | null,
  eventName: string | undefined,
  amount?: string | undefined | null,
  currency?: string | undefined | null,
  inviteId?: string,
  cohortId?: string,
  userUid?: string,
): Registration => {
  return {
    id: uuid(),
    phone,
    eventId,
    paymentId,
    orderId,
    registrationType,
    createdOn: new Date().getTime(),
    ...(name ? { name: name } : {}),
    ...(email ? { email: email } : {}),
    ...(eventName ? { eventName: eventName } : {}),
    ...(amount ? { amount: amount } : {}),
    ...(currency ? { currency: currency } : {}),
    ...(inviteId ? { inviteId: inviteId } : {}),
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(userUid ? { userUid: userUid } : {}),
  };
};

export const saveRegistration = async (
  registration: Registration,
  uid: string,
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("registrations")
    .doc(registration.id)
    .set(registration);
};
