import { razorInstance } from "./init";
import { RazorpaySubscription } from "./interface";

export const cancelSubscriptionById = async (subscriptionId: string) => {
  return (await razorInstance.subscriptions.cancel(subscriptionId)) as
    | RazorpaySubscription
    | undefined;
};

export const pauseSubscriptionById = async (subscriptionId: string) => {
  return (await razorInstance.subscriptions.pause(subscriptionId)) as
    | RazorpaySubscription
    | undefined;
};

export const resumeSubscriptionById = async (subscriptionId: string) => {
  return (await razorInstance.subscriptions.resume(subscriptionId)) as
    | RazorpaySubscription
    | undefined;
};
