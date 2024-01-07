import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";

import axios from "axios";
import { parseRecalculateQuery } from "@utils/recalculate/parseQuery";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = parseRecalculateQuery(req.query);

    console.log("recalculating", uid);
    const rep = await axios({
      url: `${process.env.BACKEND_URL}/recalculateRings`,
      method: "POST",
      data: {
        uid,
      },
      params: {
        uid,
      },
    });

    console.log(rep.data);

    res.status(200).json({
      status: "success",
    });
    return;
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(update);
