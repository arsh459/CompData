import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
import { withSentry } from "@sentry/nextjs";
import { PaidDumpInterface } from "@models/UserDumpInterface/interface";

const paidDump = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const response = await axios({
        url: `${process.env.BACKEND_URL}/getPaidUserDump`,
        method: "POST",
      });

      const { data, numResults } = response.data as {
        status: "success";
        numResults: number;
        data: PaidDumpInterface;
      };

      res.status(200).json({
        status: "success",
        data,
        numResults,
      });
      return;

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

export default withSentry(paidDump);
