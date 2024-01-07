// import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { handleSearchQuery } from "server/search/handleSearchQuery";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
// import { parseSearchQuery } from "server/search/parseSearchQuery";
import { withSentry } from "@sentry/nextjs";
import { parseMuxQuery } from "server/mux/parseQuery";
import axios from "axios";
import { muxStreamCreation } from "@templates/ActivityTemplate/MakeStreamable";

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("r", req.query);
    const query = parseMuxQuery(req.query);

    // console.log("query", query);

    if (query.url) {
      const response = await axios({
        url: "https://api.mux.com/video/v1/assets",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.MUX_ACCESS_TOKEN_ID_PROD}:${process.env.MUX_SECRET_PROD}`
            ).toString("base64"),
        },
        data: {
          input: [
            {
              url: query.url,
            },
          ],
          playback_policy: ["public"],
        },
      });

      const parsedResult = response.data as muxStreamCreation;
      if (
        parsedResult.data?.playback_ids &&
        parsedResult.data.playback_ids.length
      ) {
        const pID = parsedResult.data.playback_ids[0].id;

        res.status(200).json({
          status: "success",
          playbackId: pID,
        });

        return;
      }
    }
    // console.log("query", query);

    res.status(400).json({
      status: "failed",
    });

    return;
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });

    return;
  }
};

export default withSentry(add);
