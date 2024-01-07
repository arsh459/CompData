import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseReconcileCoachesQuery } from "server/reconcile/parse";
import { withSentry } from "@sentry/nextjs";

const teamDump = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("here");
    if (req.method === "POST") {
      //   console.log(req.query);
      //   console.log("req", req.body);
      const { eventId } = parseReconcileCoachesQuery(req.body);

      //   console.log("eventId", eventId);

      if (eventId) {
        const response = await axios({
          url: `${process.env.BACKEND_URL}/getAllTeamDump`,
          method: "POST",
          data: {
            eventId,
          },
        });

        const { data } = response.data as { data: [] };

        res.status(200).json({
          status: "success",
          data: data,
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

export default withSentry(teamDump);
