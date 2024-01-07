import * as crypto from "crypto";
import { rzp_key_secret } from "./init";

export const createSHA = (order_id: string, razorpay_payment_id: string) => {
  const hmac = crypto.createHmac("sha256", rzp_key_secret);

  const data = hmac.update(`${order_id}|${razorpay_payment_id}`);

  const gen_signature = data.digest("hex");

  return gen_signature;
};

export const createSHASubscription = (
  subscriptionId: string,
  razorpay_payment_id: string
) => {
  const hmac = crypto.createHmac("sha256", rzp_key_secret);

  const data = hmac.update(`${razorpay_payment_id}|${subscriptionId}`);

  const gen_signature = data.digest("hex");

  return gen_signature;
};
