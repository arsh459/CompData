import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { parseUpdateQuery } from "@utils/rec/parseQuery";
import axios from "axios";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`);
    if (req.method === "POST") {
      const { date, uid, type, badgeId } = parseUpdateQuery(req.query);

      if (date && uid) {
        await axios({
          url: `${process.env.BACKEND_URL}/dayTaskGenerator`,
          method: "POST",
          data: {
            uid: uid,
            date,
            type,
            badgeId,
          },
          params: {
            uid: uid,
            date,
            type,
            badgeId,
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
