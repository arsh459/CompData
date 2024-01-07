import type { NextApiRequest, NextApiResponse } from "next";
// import { getOrderPaymentsFromRazorpay } from "@utils/payments/getEvent";
import {
  freeTrialQuery,
  //   parseAuthQuery,
  //   parseVerifySubQuery,
  //   parseVerifySubQueryV2,
} from "@utils/payments/parsePayQuery";
import {
  //   saveError,
  //   savePayment,
  //   saveSubscriptionPayment,
  saveSubscriptionPaymentV2,
} from "@utils/payments/savePayments";
// import { createSHA } from "@utils/payments/verifySignature";
import { withSentry } from "@sentry/nextjs";

const freeTrial = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const {
        // eventId,
        // eventName,
        // ownerUID,

        appSubId,
        companyCode,
        duration,
        // cohortId,
        // sprintId,
        // roundId,
        uid,
      } = freeTrialQuery(req.query);

      await saveSubscriptionPaymentV2(appSubId, "", uid, companyCode, duration);

      res.status(200).json({
        status: "success",
      });
      return;
    }
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(freeTrial);
