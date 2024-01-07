import {
  AppSubscription,
  UserAppSubscription,
} from "@models/AppSubscription/AppSubscription";
import { EventInterface } from "@models/Event/Event";
import { WorkoutSeries } from "@models/Workouts/Series";
import { razorInstance } from "./init";
import { RazorpayPayment } from "./interface";

export const getEventById = async (eventId: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteEvent = await db.collection("sbEvents").doc(eventId).get();

  if (remoteEvent.exists) {
    return remoteEvent.data() as EventInterface;
  }

  return undefined;
};

export const getAppSubscription = async (subscriptionId: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteEvent = await db
    .collection("appSubscriptions")
    .doc(subscriptionId)
    .get();

  if (remoteEvent.exists) {
    return remoteEvent.data() as AppSubscription;
  }

  return undefined;
};

export const getUserAppSubscription = async (
  subscriptionId: string,
  uid: string
) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteEvent = await db
    .collection("appSubscriptions")
    .doc(subscriptionId)
    .collection("userSubs")
    .doc(uid)
    .get();

  if (remoteEvent.exists) {
    return remoteEvent.data() as UserAppSubscription;
  }

  return undefined;
};

export const getSeriesById = async (seriesId: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteSeries = await db.collection("workouts").doc(seriesId).get();

  if (remoteSeries.exists) {
    return remoteSeries.data() as WorkoutSeries;
  }

  return undefined;
};

export const getOrderPaymentsFromRazorpay = async (
  //   razorpay_order_id: string,
  razorpay_payment_id: string
) => {
  return (await razorInstance.payments.fetch(
    razorpay_payment_id
  )) as RazorpayPayment;

  //   const [order, payment] = await Promise.all([
  //     razorInstance.orders.fetch(razorpay_order_id),
  //     razorInstance.payments.fetch(razorpay_payment_id),
  //   ]);
  //   return {
  //     order,
  //     payment,
  //   };
};
