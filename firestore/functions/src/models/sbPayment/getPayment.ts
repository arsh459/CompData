import * as admin from "firebase-admin";
import { sbEventPayment, SbRazorPayment } from "./sbPayment";

export const getPaymentObj = async (uid: string, paymentId: string) => {
  const payObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("payments")
    .doc(paymentId)
    .get();

  if (payObj.exists) {
    return payObj.data() as sbEventPayment;
  }

  return undefined;
};

export const getAllUserPayments = async (uid: string) => {
  const payObj = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .doc(uid)
    .collection("payments")
    .get();

  const paymentDocs: sbEventPayment[] = [];
  for (const paymentObj of payObj.docs) {
    paymentDocs.push(paymentObj.data() as sbEventPayment);
  }

  return paymentDocs;
};

export const getRazorPaymentObj = async (uid: string, paymentId: string) => {
  const payObj = await admin
    .firestore()
    .collection("appSubscriptions")
    .doc("0cPvVrnphNJBnvvOM9Zf")
    .collection("userSubs")
    .doc(uid)
    .collection("payments")
    .doc(paymentId)
    .get();

  if (payObj.exists) {
    return payObj.data() as sbEventPayment;
  }

  return undefined;
};

export const getPaymentObjForGame = async (
  uid: string,
  paymentId: string,
  gameId: string,
) => {
  const payObj = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("subscriptions")
    .doc(gameId)
    .collection("payments")
    .doc(paymentId)
    .get();

  if (payObj.exists) {
    return payObj.data() as SbRazorPayment;
  }

  return undefined;
};
