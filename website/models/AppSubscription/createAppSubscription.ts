import { UserAppSubscription } from "./AppSubscription";
import { doc, setDoc } from "firebase/firestore";
import { db } from "config/firebase";

export const createUserAppSubscription = (
  uid: string,
  freeTrialDays: number
): UserAppSubscription => {
  const now = Date.now();
  return {
    uid,
    freeTrialStartedOn: now,
    freeTrialEndsOn: now + freeTrialDays * 24 * 60 * 60 * 1000,
    numPayments: 0,
  };
};
export const createUserAppSubscriptionLastPaid = (
  uid: string,
  freeTrialDays: number,
  lastPaidUnix: number,
  lastPaidValue: number,
  lastPlanName: string,
  lastPaidCurrency: "INR" | "USD"
): UserAppSubscription => {
  const now = Date.now();
  return {
    uid,
    freeTrialStartedOn: now,
    freeTrialEndsOn: now + freeTrialDays * 24 * 60 * 60 * 1000,
    numPayments: 0,
    lastPaidUnix,
    lastPaidValue,
    lastPlanName,
    lastPaidCurrency,
  };
};
export const saveUserSubscription = async (
  plan: UserAppSubscription,
  planId: string
) => {
  console.log({ plan });

  await setDoc(
    doc(doc(db, "appSubscriptions", planId), "userSubs", plan.uid),
    plan
  );
};
