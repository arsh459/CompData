import type { NextApiRequest, NextApiResponse } from "next";
import { getOrderPaymentsFromRazorpay } from "@utils/payments/getEvent";
import { saveError, saveSubscription } from "@utils/payments/savePayments";
import { createSHASubscription } from "@utils/payments/verifySignature";
import { withSentry } from "@sentry/nextjs";
import { parseSubVerify } from "@utils/payments/parseSubscriptionAPI";

const verifySubRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const {
        // orderId,
        // razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        uid,
        subscriptionId,
        planId,
      } = parseSubVerify(req.query);

      // console.log("orderId", orderId);
      // console.log("razorpay_order_id", razorpay_order_id);
      // console.log("razorpay_payment_id", razorpay_payment_id);
      // console.log("razorpay_signature", razorpay_signature);
      // console.log("uid", uid);
      // console.log("subscriptionId", subscriptionId);
      // console.log("planId", planId);
      // console.log("query", req.query);

      if (
        subscriptionId &&
        // orderId &&
        // razorpay_order_id &&
        razorpay_payment_id &&
        razorpay_signature
      ) {
        // generate SHA
        const shaSignature = createSHASubscription(
          subscriptionId,
          razorpay_payment_id
        );

        console.log("shaSignature", shaSignature);
        if (shaSignature === razorpay_signature) {
          const payment = await getOrderPaymentsFromRazorpay(
            razorpay_payment_id
          );

          console.log("payment", payment);

          await saveSubscription(
            payment,
            razorpay_payment_id,
            uid,
            subscriptionId,
            planId
          );

          res.status(200).json({
            status: "success",
          });
          return;
        }
      } else {
        await saveError(
          "/api/verify",
          `eventId:${planId} | razorpay_payment_id:${razorpay_payment_id} | razorpay_signature:${razorpay_signature}`,
          "api/verify"
        );
      }
    } else {
      await saveError("/api/verify", `method: ${req.method}`, "api/verify");
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(verifySubRequest);
