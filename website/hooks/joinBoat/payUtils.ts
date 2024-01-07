import { currency } from "@templates/PaymentTemplate/SelectPlan";
import {
  internalAppSignatureVerify,
  // internalAppSignatureVerify,
  internalAppSignatureVerifyV2,
  internalAppSubscriptionRequest,
  // internalAppSubscriptionRequest,
  internalAppSubscriptionRequestV2,
  internalPayRequest,
  internalSignatureVerify,
  internalSubscriptionRequest,
  internalSubscriptionSignatureVerify,
  RazorpayAuthorization,
  RazorpaySubscriptionAuthorization,
} from "@utils/payments/payRequest";
export const razorpay_key_id_front = "rzp_live_N8tAbOcFSLnajr";

export const subscriptionRequest = async (
  planId: string,
  freeTrialPeriod: number,
  uid: string,
  email: string,
  phone: string,
  name: string,
  onSuccessAsync?: () => Promise<string | void>,
  onSuccessSync?: () => void
) => {
  const subscriptionObj = await internalSubscriptionRequest(
    planId,
    Date.now() + freeTrialPeriod * 24 * 60 * 60 * 1000,
    uid,
    phone,
    name
  );
  // console.log("subscriptionObj", subscriptionObj);
  if (subscriptionObj) {
    const options = {
      key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
      subscription_id: subscriptionObj.id,
      name: "SocialBoat",
      description: "Real life fitness game",
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: "#FF556C",
      },
      handler: async function (response: RazorpaySubscriptionAuthorization) {
        try {
          console.log("r", response);
          await internalSubscriptionSignatureVerify(
            // response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            uid,
            planId,
            subscriptionObj.id
          );
          if (onSuccessAsync) {
            await onSuccessAsync();
          }
          if (onSuccessSync) {
            console.log("HERE!");
            onSuccessSync();
          }
        } catch (error) {
          console.log("error", error);
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
};

export const subscriptionRequestV2 = async (
  planId: string,
  uid: string,
  email: string,
  phone: string,
  onSuccessAsync?: () => Promise<string | void>,
  onSuccessSync?: () => void,
  discount?: number
) => {
  const razorOrder = await internalAppSubscriptionRequest(
    planId,
    discount ? discount : 0
  );

  // console.log("r", razorOrder);

  if (razorOrder) {
    const options = {
      key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
      amount: razorOrder.amount.toString(),
      currency: razorOrder.currency,
      name: "SocialBoat",
      order_id: razorOrder.id,
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: "#FF556C",
      },
      handler: async function (response: RazorpayAuthorization) {
        // console.log("re", response);
        try {
          await internalAppSignatureVerify(
            planId,
            razorOrder.id,
            // heading ? heading : "",
            // ownerUID,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,

            uid
            // duration,
            // companyCode
          );

          if (onSuccessAsync) {
            await onSuccessAsync();
          }

          if (onSuccessSync) {
            onSuccessSync();
          }
        } catch (error) {
          console.log("error here", error);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // console.log("subscriptionObj", subscriptionObj);
};

export const subscriptionRequestV3 = async (
  planId: string,
  uid: string,
  email: string,
  phone: string,
  currency: currency,
  cost: number,
  duration: number,
  name: string,
  offers: string[],
  sbPlanId: string,
  onSuccessAsync?: () => Promise<string | void>,
  onSuccessSync?: () => void,
  companyCode?: string
) => {
  const razorOrder = await internalAppSubscriptionRequestV2(
    planId,
    cost,

    currency,
    uid,
    phone,
    name,
    offers
  );

  // console.log("r", razorOrder);

  if (razorOrder) {
    const options = {
      key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
      amount: razorOrder.amount.toString(),
      currency: razorOrder.currency,
      name: "SocialBoat",
      order_id: razorOrder.id,
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: "#FF556C",
      },
      handler: async function (response: RazorpayAuthorization) {
        // console.log("re", response);
        try {
          await internalAppSignatureVerifyV2(
            planId,
            razorOrder.id,
            // heading ? heading : "",
            // ownerUID,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            sbPlanId,

            uid,
            duration,
            companyCode
          );

          if (onSuccessAsync) {
            await onSuccessAsync();
          }

          if (onSuccessSync) {
            onSuccessSync();
          }
        } catch (error) {
          console.log("error here", error);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // console.log("subscriptionObj", subscriptionObj);
};

export const payRequest = async (
  gameId: string,
  subscriptionId: string,
  sprintId: string,
  roundId: string,
  uid: string,
  email: string,
  phone: string,
  onSuccessAsync?: () => Promise<string | void>,
  onSuccessSync?: () => void
) => {
  console.log("HIIII");
  const razorOrder = await internalPayRequest(gameId, subscriptionId, 0);
  console.log("razorOrder", razorOrder);
  if (razorOrder) {
    const options = {
      key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
      amount: razorOrder.amount.toString(),
      currency: razorOrder.currency,
      name: "SocialBoat",
      order_id: razorOrder.id,
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: "#FF556C",
      },
      handler: async function (response: RazorpayAuthorization) {
        try {
          await internalSignatureVerify(
            gameId,
            razorOrder.id,
            // heading ? heading : "",
            // ownerUID,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,

            uid,
            sprintId,
            roundId
          );

          if (onSuccessAsync) {
            await onSuccessAsync();
          }

          if (onSuccessSync) {
            onSuccessSync();
          }
        } catch (error) {
          console.log("error", error);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
};
