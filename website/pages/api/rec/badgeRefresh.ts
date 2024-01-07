import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import axios from "axios";
import { parseBadgeReconcileQuery } from "@utils/rec/parseBadgeReconcileQuery";

const badgeRefresh = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const { badgeId, reconcile } = parseBadgeReconcileQuery(req.query);

      // console.log("badgeId", badgeId, reconcile);

      if (badgeId && typeof reconcile === "boolean") {
        await axios({
          url: `${process.env.BACKEND_URL}/updateBadgeLevels`,
          method: "POST",
          data: {
            badgeId,
            reconcile,
          },
          params: {
            badgeId,
            reconcile,
          },
        });

        res.status(200).json({
          status: "success",
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

export default withSentry(badgeRefresh);
