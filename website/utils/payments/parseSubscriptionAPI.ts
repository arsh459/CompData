import { ParsedUrlQuery } from "querystring";

export const parseSubscriptionIds = (query: ParsedUrlQuery) => {
  return {
    razorpayIds:
      query[`razorpayIds[]`] && typeof query[`razorpayIds[]`] === "string"
        ? [query[`razorpayIds[]`]]
        : query[`razorpayIds[]`] && typeof query[`razorpayIds[]`] === "object"
        ? query[`razorpayIds[]`]
        : [],
  };
};

export const parseCreateSubscription = (query: ParsedUrlQuery) => {
  return {
    plan_id:
      query.plan_id && typeof query.plan_id === "string" ? query.plan_id : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    phone: query.phone && typeof query.phone === "string" ? query.phone : "",
    name: query.name && typeof query.name === "string" ? query.name : "",

    start_at:
      query.start_at && typeof query.start_at === "string"
        ? parseInt(query.start_at)
        : Date.now() + 5 * 60 * 60 * 1000,
  };
};

export const parseSubVerify = (query: ParsedUrlQuery) => {
  return {
    // orderId:
    // query.orderId && typeof query.orderId === "string" ? query.orderId : "",
    // razorpay_order_id:
    // query.razorpay_order_id && typeof query.razorpay_order_id === "string"
    // ? query.razorpay_order_id
    // : "",
    subscriptionId:
      query.subscriptionId && typeof query.subscriptionId === "string"
        ? query.subscriptionId
        : "",
    planId:
      query.planId && typeof query.planId === "string" ? query.planId : "",
    razorpay_payment_id:
      query.razorpay_payment_id && typeof query.razorpay_payment_id === "string"
        ? query.razorpay_payment_id
        : "",
    razorpay_signature:
      query.razorpay_signature && typeof query.razorpay_signature === "string"
        ? query.razorpay_signature
        : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};

export const parseCancelRequest = (query: ParsedUrlQuery) => {
  return {
    subscriptionId:
      query.subscriptionId && typeof query.subscriptionId === "string"
        ? query.subscriptionId
        : "",
  };
};
