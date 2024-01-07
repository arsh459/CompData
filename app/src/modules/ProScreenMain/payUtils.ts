import RazorpayCheckout from "react-native-razorpay";
import { companyCode, razorpay_key_id_front } from "./GetAccessMain";
import {
  internalAppSignatureVerifyV2,
  internalAppSubscriptionRequestV2,
} from "./GetAccessMain/utils";
import { SbPlans } from "@models/AppSubscription/AppSubscription";
import { UserInterface } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const getCurrency = (user?: UserInterface): "USD" | "INR" => {
  if (user?.recommendationConfig?.timezone?.tzString !== "Asia/Kolkata") {
    return "USD";
  }

  return "INR";
};

export const initiatePayment = async (
  plan: SbPlans,
  onSuccess: () => {},
  onFail: () => {},
  currency: "INR" | "USD",
  userId: string,
  phone: string,
  userName: string,
  offers: string[],
  sbPlanId: string,
  email?: string
) => {
  try {
    const razorOrder = await internalAppSubscriptionRequestV2(
      plan.appSubId,
      currency === "INR" ? plan.cost : plan.usdCost,

      currency,
      userId ? userId : "",
      phone ? phone : "",
      userName ? userName : "",
      offers
    );

    // console.log("razorOrder", razorOrder);

    if (razorOrder && userId) {
      const options = {
        key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
        amount: razorOrder.amount, //.toString(),
        currency: razorOrder.currency,
        name: "SocialBoat",
        order_id: razorOrder.id,
        description: plan?.description || "",
        prefill: {
          email: email,
          contact: phone,
        },
        theme: {
          color: "#FF556C",
        },
      };

      // console.log("options", options);

      const data = await RazorpayCheckout.open(options);
      const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
        data;

      // console.log("data", data);
      await internalAppSignatureVerifyV2(
        plan.appSubId,
        razorOrder.id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        sbPlanId,
        userId,
        plan?.durationInDays || 0,
        companyCode
      );

      weEventTrack("paymentDone", {
        amount: razorOrder.amount, //.toString(),
        currency: razorOrder.currency,
        userId,
      });

      onSuccess();
      // alert(`Success: ${data.razorpay_payment_id}`);
    }
  } catch (error: any) {
    onFail();
    weEventTrack("paymentFailed", {
      error: error.code,
      desc: error.description,
    });
    console.log(`Error: ${error.code} | ${error.description}`);
  }
};
