import { razorInstance } from "./init";
import { RazorpaySubscription } from "./interface";

export const createSubscription = async (
  plan_id: string,
  start_at: number,
  uid: string,
  phone: string,
  name: string
) => {
  // console.log("Math.round(start_at / 1000)", Math.round(start_at / 1000));
  return (await razorInstance.subscriptions.create({
    plan_id,
    total_count: 1,
    start_at: Math.round(start_at / 1000),
    customer_notify: 1,
    notes: {
      uid,
      phone,
      name,
    },
  })) as RazorpaySubscription | undefined;
};
