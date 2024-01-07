import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
import { withSentry } from "@sentry/nextjs";
import { parseUserDumpQuery } from "server/removeUser/parseQuery";
import { ExportUserActivityProgressData } from "@models/User/summary";

const activityDump = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { start } = parseUserDumpQuery(req.query);

      if (start) {
        const response = await axios({
          url: `${process.env.BACKEND_URL}/activityProgress`,
          method: "POST",
          data: {
            start,
          },
          params: { start },
        });

        const { data, numResults } = response.data as {
          status: "success";
          numResults: number;
          data: ExportUserActivityProgressData;
        };

        res.status(200).json({
          status: "success",
          data,
          numResults,
        });
        return;
      }

      // console.log("response", response.data);
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(activityDump);
