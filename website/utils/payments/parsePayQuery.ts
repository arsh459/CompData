import { ParsedUrlQuery } from "querystring";

export const parsePaySubscriptionQuery = (query: ParsedUrlQuery) => {
  return {
    appSubId:
      query.appSubId && typeof query.appSubId === "string"
        ? query.appSubId
        : "",
    discount:
      query.discount && typeof query.discount === "string"
        ? parseFloat(query.discount)
        : 0,
  };

  // return "";
};

export const parsePaySubscriptionQueryV2 = (query: ParsedUrlQuery) => {
  return {
    appSubId:
      query.appSubId && typeof query.appSubId === "string"
        ? query.appSubId
        : "",
    cost:
      query.cost && typeof query.cost === "string" ? parseFloat(query.cost) : 0,
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    phone: query.phone && typeof query.phone === "string" ? query.phone : "",
    name: query.name && typeof query.name === "string" ? query.name : "",
    currency:
      query.currency && typeof query.currency === "string"
        ? query.currency
        : "INR",
    offers:
      query.offers && typeof query.offers === "object" ? query.offers : [],
  };

  // return "";
};

export const parsePayQuery = (query: ParsedUrlQuery) => {
  // if (query.eventId && typeof query.eventId === "string") {
  //   return query.eventId;
  // }

  // console.log("query", query);

  return {
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    discount:
      query.discount && typeof query.discount === "string"
        ? parseFloat(query.discount)
        : 0,
    subscriptionId:
      query.subscriptionId && typeof query.subscriptionId === "string"
        ? query.subscriptionId
        : "",
    // type:
    //   query.typeCheckout && typeof query.typeCheckout === "string"
    //     ? query.typeCheckout
    //     : "",
  };

  // return "";
};

export const parseAuthQuery = (query: ParsedUrlQuery) => {
  return {
    orderId:
      query.orderId && typeof query.orderId === "string" ? query.orderId : "",
    razorpay_order_id:
      query.razorpay_order_id && typeof query.razorpay_order_id === "string"
        ? query.razorpay_order_id
        : "",
    sprintId:
      query.sprintId && typeof query.sprintId === "string"
        ? query.sprintId
        : "",
    roundId:
      query.roundId && typeof query.roundId === "string" ? query.roundId : "",
    // eventName:
    //   query.eventName && typeof query.eventName === "string"
    //     ? query.eventName
    //     : "",
    // ownerUID:
    //   query.ownerUID && typeof query.ownerUID === "string"
    //     ? query.ownerUID
    //     : "",
    razorpay_payment_id:
      query.razorpay_payment_id && typeof query.razorpay_payment_id === "string"
        ? query.razorpay_payment_id
        : "",
    razorpay_signature:
      query.razorpay_signature && typeof query.razorpay_signature === "string"
        ? query.razorpay_signature
        : "",
    eventId:
      query.eventId && typeof query.eventId === "string" ? query.eventId : "",
    // cohortId:
    //   query.cohortId && typeof query.cohortId === "string"
    //     ? query.cohortId
    //     : "",
    // codeId:
    //   query.codeId && typeof query.codeId === "string" ? query.codeId : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};

export const parseVerifySubQuery = (query: ParsedUrlQuery) => {
  return {
    orderId:
      query.orderId && typeof query.orderId === "string" ? query.orderId : "",
    razorpay_order_id:
      query.razorpay_order_id && typeof query.razorpay_order_id === "string"
        ? query.razorpay_order_id
        : "",
    razorpay_payment_id:
      query.razorpay_payment_id && typeof query.razorpay_payment_id === "string"
        ? query.razorpay_payment_id
        : "",
    razorpay_signature:
      query.razorpay_signature && typeof query.razorpay_signature === "string"
        ? query.razorpay_signature
        : "",
    appSubId:
      query.appSubId && typeof query.appSubId === "string"
        ? query.appSubId
        : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    companyCode:
      query.companyCode && typeof query.companyCode === "string"
        ? query.companyCode
        : "",
  };
};

export const parseVerifySubQueryV2 = (query: ParsedUrlQuery) => {
  return {
    orderId:
      query.orderId && typeof query.orderId === "string" ? query.orderId : "",
    razorpay_order_id:
      query.razorpay_order_id && typeof query.razorpay_order_id === "string"
        ? query.razorpay_order_id
        : "",
    razorpay_payment_id:
      query.razorpay_payment_id && typeof query.razorpay_payment_id === "string"
        ? query.razorpay_payment_id
        : "",
    razorpay_signature:
      query.razorpay_signature && typeof query.razorpay_signature === "string"
        ? query.razorpay_signature
        : "",
    appSubId:
      query.appSubId && typeof query.appSubId === "string"
        ? query.appSubId
        : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    companyCode:
      query.companyCode && typeof query.companyCode === "string"
        ? query.companyCode
        : "",
    duration:
      query.duration && typeof query.duration === "string"
        ? parseFloat(query.duration)
        : 0,
    sbPlanId:
      query.sbPlanId && typeof query.sbPlanId === "string"
        ? query.sbPlanId
        : "",
  };
};

export const freeTrialQuery = (query: ParsedUrlQuery) => {
  return {
    appSubId:
      query.appSubId && typeof query.appSubId === "string"
        ? query.appSubId
        : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    companyCode:
      query.companyCode && typeof query.companyCode === "string"
        ? query.companyCode
        : "",
    duration:
      query.duration && typeof query.duration === "string"
        ? parseFloat(query.duration)
        : 0,
  };
};
