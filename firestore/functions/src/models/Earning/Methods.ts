import { Earning } from "./Earning";
import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";

export const createEarning = (
  earningType: "VIEW" | "LISTING_BOOKING" | "TRIP_BOOKING",
  value: number,
  bookingId: string,
  title: string,
  body: string,
  action: "CREDIT" | "DEBIT",
  commissionPercentage: number,
  image?: string | undefined
): Earning => {
  return {
    createdOn: new Date().getTime(),
    earningType: earningType,
    value: value,
    status: "PENDING",
    action: action,
    bookingId: bookingId,
    title: title,
    body: body,
    ...(image ? { image: image } : {}),
    commissionRate: commissionPercentage,
    earningId: uuid(),
  };
};

export const getEarningByBookingId = async (
  id: string,
  uid: string
): Promise<Earning | undefined> => {
  const earn = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("earnings")
    .where("bookingId", "==", id)
    .get();

  if (earn.docs.length > 0 && earn.docs[0].exists) {
    return earn.docs[0].data() as Earning;
  }

  return undefined;
};

export const getAllEarningByBookingId = async (
  id: string,
  uid: string
): Promise<Earning[]> => {
  const earn = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("earnings")
    .where("bookingId", "==", id)
    .get();

  const allEarnings: Earning[] = [];
  for (const earning of earn.docs) {
    if (earning.exists) {
      allEarnings.push(earning.data() as Earning);
    }
  }

  return allEarnings;
};

export const getRangeEarningByUserId = async (
  uid: string,
  min: number,
  max: number
): Promise<Earning[]> => {
  const earn = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("earnings")
    .where("createdOn", ">=", min)
    .where("createdOn", "<=", max)
    .get();

  const allEarnings: Earning[] = [];
  for (const earning of earn.docs) {
    if (earning.exists) {
      allEarnings.push(earning.data() as Earning);
    }
  }

  return allEarnings;
};

export const getEarningSum = (earnings: Earning[]): number => {
  return earnings.reduce(
    (acc, item) => acc + (item.action === "CREDIT" ? item.value : -item.value),
    0
  );
};

export const getAllEarningByUserId = async (
  uid: string
): Promise<Earning[]> => {
  const earn = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("earnings")
    .get();

  const allEarnings: Earning[] = [];
  for (const earning of earn.docs) {
    if (earning.exists) {
      allEarnings.push(earning.data() as Earning);
    }
  }

  return allEarnings;
};
