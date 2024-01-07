import type { NextApiRequest, NextApiResponse } from "next";
import { getOrderPaymentsFromRazorpay } from "@utils/payments/getEvent";
import { parseAuthQuery } from "@utils/payments/parsePayQuery";
import { saveError, savePayment } from "@utils/payments/savePayments";
import { createSHA } from "@utils/payments/verifySignature";
import { withSentry } from "@sentry/nextjs";

const verifyRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const {
        eventId,
        // eventName,
        // ownerUID,
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        // cohortId,
        sprintId,
        roundId,
        uid,
      } = parseAuthQuery(req.query);

      console.log(
        `eventId:${eventId} | orderId:${orderId} | razorpay_order_id:${razorpay_order_id} | razorpay_payment_id:${razorpay_payment_id} | razorpay_signature:${razorpay_signature} | uid:${uid}`
      );

      if (
        eventId &&
        orderId &&
        razorpay_order_id &&
        razorpay_payment_id &&
        razorpay_signature
      ) {
        // generate SHA
        const shaSignature = createSHA(orderId, razorpay_payment_id);
        if (shaSignature === razorpay_signature) {
          const payment = await getOrderPaymentsFromRazorpay(
            razorpay_payment_id
          );

          console.log("payment", payment);

          await savePayment(
            eventId,
            // eventName,
            // ownerUID,
            payment,
            // orderId,
            // razorpay_signature,
            razorpay_payment_id,
            // cohortId,
            uid,
            sprintId,
            roundId
          );

          res.status(200).json({
            status: "success",
          });
          return;
        }
      } else {
        await saveError(
          "/api/verify",
          `eventId:${eventId} | orderId:${orderId} | razorpay_order_id:${razorpay_order_id} | razorpay_payment_id:${razorpay_payment_id} | razorpay_signature:${razorpay_signature}`,
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

export default withSentry(verifyRequest);
