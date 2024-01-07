import {
  createNewRegistration,
  saveRegistration,
} from "../../../models/Registration/createRegistration";

export const handleNewRegistration = async (
  paymentId: string,
  orderId: string,
  contact: string | undefined | null,
  uid: string | undefined,
  eventId: string,
  email: string | undefined | null,
  eventName: string | undefined,
  amount: string | undefined | null,
  currency: string | undefined | null,
  cohortId: string | undefined,
  userUid: string,
) => {
  if (contact && uid) {
    const newReg = createNewRegistration(
      paymentId,
      orderId,
      contact,
      eventId,
      "paid",
      email,
      undefined,
      eventName,
      amount,
      currency,
      undefined,
      cohortId,
      userUid,
    );

    console.log(
      "new reg",
      newReg.id,
      newReg.email,
      newReg.phone,
      newReg.amount,
    );

    await saveRegistration(newReg, uid);
  }
};
