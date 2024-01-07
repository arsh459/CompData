// import { sbEventPayment } from "../../../models/sbPayment/sbPayment";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { firestore } from "firebase-admin";

export const handlePaymentUpdate = async (
  eventId: string,
  uid: string,
  amount: number,
) => {
  await updateOne("users", uid, {
    sbEarnings: firestore.FieldValue.increment(amount),
    sbStudents: firestore.FieldValue.increment(1),
  });

  // await updateOne("sbEvents", eventId, {
  //   earnings: firestore.FieldValue.increment(amount),
  //   students: firestore.FieldValue.increment(1),
  // });
};
