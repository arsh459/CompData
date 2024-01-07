import type { NextApiRequest, NextApiResponse } from "next";
import { saveError } from "@utils/payments/savePayments";
import { withSentry } from "@sentry/nextjs";
import { parseCancelRequest } from "@utils/payments/parseSubscriptionAPI";
import { cancelSubscriptionById } from "@utils/payments/cancelSubscription";

const cancelRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const { subscriptionId } = parseCancelRequest(req.query);

      if (subscriptionId) {
        const sub = await cancelSubscriptionById(subscriptionId);

        res.status(200).json({
          status: "success",
          ...(sub ? { subscription: sub } : {}),
        });
        return;
      } else {
        await saveError("/api/sub/cancel", subscriptionId, "/api/sub/cancel");
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

export default withSentry(cancelRequest);
