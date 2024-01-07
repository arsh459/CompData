import type { NextApiRequest, NextApiResponse } from "next";

import { withSentry } from "@sentry/nextjs";
import { parseSubscriptionIds } from "@utils/payments/parseSubscriptionAPI";
import { RazorpaySubscription } from "@utils/payments/interface";
import { getSubscriptionById } from "@utils/payments/getSubscriptionById";

const subRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { razorpayIds } = parseSubscriptionIds(req.query);
      console.log("r", razorpayIds);
      const subscriptions: { [id: string]: RazorpaySubscription } = {};

      for (const id of razorpayIds) {
        const sub = await getSubscriptionById(id);
        if (sub) {
          subscriptions[id] = sub;
        }
      }

      res.status(200).json({
        subscriptions,
      });

      return;
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(subRequest);
