import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { parseCreateQuery } from "@utils/rec/parseQuery";
import axios from "axios";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const { days, uid, type, recreate } = parseCreateQuery(req.query);

      console.log("req", req.query);
      console.log("recreate", recreate);
      console.log("days", days);
      console.log("uid", uid);
      console.log("type", type);

      if (days && uid) {
        await axios({
          url: `${process.env.BACKEND_URL}/taskGenerator`,
          method: "POST",
          data: {
            days,
            uid,
            startToday: true,
            type,
            recreate,
          },
          params: {
            days,
            uid,
            startToday: true,
            type,
            recreate,
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

export default withSentry(update);
