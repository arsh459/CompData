import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { Gift } from "./Gift";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { internalFreeTrialRequest } from "@utils/payments/payRequest";

export const createGift = (
  fromName: string,
  fromUID: string,
  fromEmail: string
  //   plan: AppSubscription
): Gift => {
  return {
    fromName,
    fromUID,
    id: uuidv4(),
    unix: Date.now(),
    fromEmail,
    toName: "",
    toMessage: "",
    // plan,
  };
};

export const saveGift = async (gift: Gift) => {
  await setDoc(doc(db, "gifts", gift.id), gift);
};

export const updateGiftStatus = async (
  giftId: string,
  status: "REDEEMED" | "PAID"
) => {
  await setDoc(doc(db, "gifts", giftId), { status: status });
};

export const addPlanToGift = async (id: string, plan: AppSubscription) => {
  await updateDoc(doc(db, "gifts", id), { plan: plan, status: "PAID" });
};

export const redeemGift = async (gift: Gift, uid: string) => {
  if (gift.plan && gift.plan.durationInDays) {
    await internalFreeTrialRequest(
      gift.plan?.id,
      "Gift Card",
      uid,
      gift.plan?.durationInDays
    );

    await updateGiftStatus(gift.id, "REDEEMED");
  }
};
