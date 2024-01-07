import type { NextApiRequest, NextApiResponse } from "next";
import { getOrderPaymentsFromRazorpay } from "@utils/payments/getEvent";
import {
  //   parseAuthQuery,
  //   parseVerifySubQuery,
  parseVerifySubQueryV2,
} from "@utils/payments/parsePayQuery";
import {
  saveError,
  //   savePayment,
  //   saveSubscriptionPayment,
  saveSubscriptionPaymentV2,
} from "@utils/payments/savePayments";
import { createSHA } from "@utils/payments/verifySignature";
import { withSentry } from "@sentry/nextjs";

const verifySubscriptionV2 = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const {
        // eventId,
        // eventName,
        // ownerUID,
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        appSubId,
        companyCode,
        duration,
        sbPlanId,
        // cohortId,
        // sprintId,
        // roundId,
        uid,
      } = parseVerifySubQueryV2(req.query);

      console.log(
        `appSubId:${appSubId} | orderId:${orderId} | razorpay_order_id:${razorpay_order_id} | razorpay_payment_id:${razorpay_payment_id} | razorpay_signature:${razorpay_signature} | uid:${uid}`
      );

      console.log("companyCode", companyCode);
      console.log("orderId", orderId);
      console.log("razorpay_order_id", razorpay_order_id);
      console.log("razorpay_payment_id", razorpay_payment_id);
      console.log("razorpay_signature", razorpay_signature);
      console.log("duration", duration);
      console.log("sbPlanId", sbPlanId);

      if (
        // companyCode &&
        orderId &&
        razorpay_order_id &&
        razorpay_payment_id &&
        razorpay_signature &&
        duration
      ) {
        // generate SHA
        const shaSignature = createSHA(orderId, razorpay_payment_id);

        if (shaSignature === razorpay_signature) {
          const payment = await getOrderPaymentsFromRazorpay(
            razorpay_payment_id
          );

          // console.log("payment", payment);

          await saveSubscriptionPaymentV2(
            appSubId,
            sbPlanId,
            uid,
            companyCode ? companyCode : "",
            duration,
            payment,
            razorpay_payment_id
          );

          res.status(200).json({
            status: "success",
          });
          return;
        }
      } else {
        await saveError(
          "/api/verify",
          `orderId:${orderId} | razorpay_order_id:${razorpay_order_id} | razorpay_payment_id:${razorpay_payment_id} | razorpay_signature:${razorpay_signature}`,
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

export default withSentry(verifySubscriptionV2);
