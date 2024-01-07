import { RazorpayOrder } from "@models/razorpay/interface";
import axios from "axios";
export type currency = "USD" | "INR";

export const internalAppSubscriptionRequestV2 = async (
  appSubId: string,
  cost: number,
  currency: currency,
  uid: string,
  phone: string,
  name: string,
  offers: string[]
) => {
  try {
    const response = await axios({
      url: "https://www.socialboat.live/api/payments/paySubscriptionV2",
      method: "POST",
      params: {
        appSubId,
        cost,
        uid,
        phone,
        name,
        currency,
        offers,
      },
    });

    const data = response.data as RazorpayOrder;

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export const internalAppSignatureVerifyV2 = async (
  appSubId: string,
  // id: string,
  // eventName: string,
  // ownerUID: string,
  orderId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  sbPlanId: string,
  uid: string,
  duration: number,
  companyCode?: string

  // cohortId: string,

  // cInviteCode?: string
) => {
  // if (id) {
  try {
    const response = await axios({
      url: "https://www.socialboat.live/api/payments/verifySubscriptionV2",
      method: "POST",
      params: {
        appSubId,
        orderId,
        // eventName: eventName,
        // ownerUID: ownerUID,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        // cohortId,
        // codeId: cInviteCode,
        companyCode: companyCode ? companyCode : "",
        sbPlanId,
        uid,
        duration,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
  }
  // }
};
export const calculatePlanDuration = (packageType: string): number => {
  const durations: { [key: string]: number } = {
    MONTHLY: 30,
    THREE_MONTH: 180,
    ANNUAL: 365,
  };

  return durations[packageType] || 0;
};
export const getPrefixSuffix = (days: number) => {
  if (days === 30) {
    return {
      prefix: 1,
      suffix: "Month Plan",
      nbMonth: 1,
    };
  } else if (days === 60) {
    return {
      prefix: 2,
      suffix: "Months Upgrade",
      nbMonth: 2,
    };
  } else if (days === 90) {
    return {
      prefix: 3,
      suffix: "Months Plan",
      nbMonth: 3,
    };
  } else if (days === 180) {
    return {
      prefix: 6,
      suffix: "Months Plan",
      nbMonth: 6,
    };
  } else if (days === 365) {
    return {
      prefix: 1,
      suffix: "Year Plan",
      nbMonth: 12,
    };
  } else if (days === 330) {
    return {
      prefix: 11,
      suffix: "Month Upgrade",
      nbMonth: 11,
    };
  } else if (days === 270) {
    return {
      prefix: 9,
      suffix: "Month Upgrade",
      nbMonth: 27,
    };
  } else {
    return {
      prefix: days,
      suffix: "days",
      nbMonth: days / 30,
    };
  }
};
