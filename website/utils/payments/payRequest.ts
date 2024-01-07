import { currency } from "@templates/PaymentTemplate/SelectPlan";
import axios from "axios";
import { RazorpayOrder, RazorpaySubscription } from "./interface";
// import { RazorpayOrder } from "pages/api/payments/utils/interface";

export const internalSubscriptionRequest = async (
  planId: string,
  startAt: number,
  uid: string,
  phone: string,
  name: string
) => {
  try {
    const response = await axios({
      url: "/api/sub/create",
      method: "POST",
      params: {
        plan_id: planId,
        start_at: startAt,
        uid,
        phone,
        name,
      },
    });

    const data = response.data as RazorpaySubscription;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const internalFreeTrialRequest = async (
  appSubId: string,
  companyCode: string,
  uid: string,
  duration: number
) => {
  try {
    const response = await axios({
      url: "/api/payments/freeTrial",
      method: "POST",
      params: {
        appSubId,
        companyCode,
        uid,
        duration,
      },
    });

    const data = response.data as RazorpayOrder;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

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
      url: "/api/payments/paySubscriptionV2",
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

export const internalAppSubscriptionRequest = async (
  appSubId: string,
  discount: number
) => {
  try {
    const response = await axios({
      url: "/api/payments/paySubscription",
      method: "POST",
      params: {
        appSubId,
        discount,
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

  
) => {
  // if (id) {
  try {
    const response = await axios({
      url: "/api/payments/verifySubscriptionV2",
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

export const internalAppSignatureVerify = async (
  appSubId: string,
  // id: string,
  // eventName: string,
  // ownerUID: string,
  orderId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  uid: string,
  companyCode?: string

  // cohortId: string,

  // cInviteCode?: string
) => {
  // if (id) {
  try {
    const response = await axios({
      url: "/api/payments/verifySubscription",
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
        uid,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
  }
  // }
};

export const internalPayRequest = async (
  //   userId: string,
  gameId: string,
  subscriptionId: string,
  discount?: number

  // type?: "series"
) => {
  console.log("id", gameId);
  // console.log("discount", discount);
  console.log("subscriptionId", subscriptionId);
  // console.log("type", type);
  if (gameId) {
    try {
      const response = await axios({
        url: "/api/payments/pay",
        method: "POST",
        params: {
          eventId: gameId,
          subscriptionId,
          ...(discount ? { discount: discount } : {}),
          // ...(type ? { typeCheckout: type } : {}),
        },
      });

      const data = response.data as RazorpayOrder;
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
};

export const internalSubscriptionSignatureVerify = async (
  // razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  uid: string,
  planId: string,
  subscriptionId: string
) => {
  // if (id) {
  try {
    const response = await axios({
      url: "/api/sub/verify",
      method: "POST",
      params: {
        // eventId,
        // orderId,
        planId,
        subscriptionId,
        // razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        uid,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
  }
  // }
};

export const internalSignatureVerify = async (
  eventId: string,
  // id: string,
  // eventName: string,
  // ownerUID: string,
  orderId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  uid: string,
  sprintId?: string,
  roundId?: string
  // cohortId: string,

  // cInviteCode?: string
) => {
  // if (id) {
  try {
    const response = await axios({
      url: "/api/payments/verify",
      method: "POST",
      params: {
        eventId,
        orderId,
        // eventName: eventName,
        // ownerUID: ownerUID,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        // cohortId,
        // codeId: cInviteCode,
        sprintId: sprintId ? sprintId : "",
        roundId: roundId ? roundId : "",
        uid,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
  }
  // }
};

export interface RazorpayAuthorization {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpaySubscriptionAuthorization {
  razorpay_subscription_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
