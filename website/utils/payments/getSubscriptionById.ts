import { razorInstance } from "./init";
import { RazorpaySubscription } from "./interface";

export const getSubscriptionById = async (subscriptionId: string) => {
  return (await razorInstance.subscriptions.fetch(subscriptionId)) as
    | RazorpaySubscription
    | undefined;
};
