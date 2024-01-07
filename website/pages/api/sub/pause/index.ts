import type { NextApiRequest, NextApiResponse } from "next";
import { saveError } from "@utils/payments/savePayments";
import { withSentry } from "@sentry/nextjs";
import { parseCancelRequest } from "@utils/payments/parseSubscriptionAPI";
import { pauseSubscriptionById } from "@utils/payments/cancelSubscription";

const pauseRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const { subscriptionId } = parseCancelRequest(req.query);

      if (subscriptionId) {
        const sub = await pauseSubscriptionById(subscriptionId);

        res.status(200).json({
          status: "success",
          ...(sub ? { subscription: sub } : {}),
        });
        return;
      } else {
        await saveError("/api/sub/pause", subscriptionId, "/api/sub/pause");
      }
    } else {
      await saveError(
        "/api/sub/pause",
        `method: ${req.method}`,
        "/api/sub/pause"
      );
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(pauseRequest);
