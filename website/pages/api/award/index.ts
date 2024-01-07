import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { wrapApiHandlerWithSentry } from "@sentry/nextjs";
import { parseAwardBadge } from "@utils/awards";

const requestAwardBadge = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { uid, id, start, end } = parseAwardBadge(req.query);

      // console.log({ uid, id, start, end });

      await axios({
        url: `${process.env.BACKEND_URL}/awardBadge`,
        // url: "http://127.0.0.1:5001/holidaying-prod/asia-south1/awardBadge",
        method: "POST",
        data: {
          uid,
          id,
          start,
          end,
        },
      });

      res.status(200).json({
        status: "success",
      });

      return;
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server invite", err);
    res.status(400).json({ error: "error" });
  }
};

export default wrapApiHandlerWithSentry(requestAwardBadge, "");
