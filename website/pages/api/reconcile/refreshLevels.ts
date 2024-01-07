import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
import { withSentry } from "@sentry/nextjs";

const refreshLevels = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      //   const { eventId } = parseReconcileCoachesQuery(req.query);

      // console.log("eventId", eventId);

      //   if (eventId) {
      await axios({
        url: `${process.env.BACKEND_URL}/refreshUserLevels`,
        method: "POST",
      });

      res.status(200).json({
        status: "success",
      });
      return;
      //   }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(refreshLevels);
