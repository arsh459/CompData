import type { NextApiRequest, NextApiResponse } from "next";

import { withSentry } from "@sentry/nextjs";
import { parseCreateSubscription } from "@utils/payments/parseSubscriptionAPI";
import { createSubscription } from "@utils/payments/createSubscription";

const createRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { plan_id, start_at, uid, phone, name } = parseCreateSubscription(
        req.query
      );

      // console.log("s", start_at, req.query);

      const razorRes = await createSubscription(
        plan_id,
        start_at,
        uid,
        phone,
        name
      );

      if (razorRes?.short_url) {
        res.status(200).json({
          ...razorRes,
        });

        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(createRequest);
