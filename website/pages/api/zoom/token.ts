// import { handleSearchQuery } from "@util/algolia/handleSearchQuery";
// import { parseQuery } from "@util/algolia/parse";
import { parseZoomTokenQuery } from "@utils/zoom/parseZoomTokenQuery";
import { requestZoomAccessToken } from "@utils/zoom/zoomToken";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
// import { withSentry } from "@sentry/nextjs";
// import { parseZoomTokenQuery } from "./utils/parseZoomTokenQuery";
// import { requestZoomAccessToken } from "./utils/zoomToken";

const tokenRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const zoomCode = parseZoomTokenQuery(req.query);

      if (zoomCode) {
        // console.log("zoom", zoomCode);
        const response = await requestZoomAccessToken(zoomCode);

        // console.log(response);

        if (response) {
          res.status(200).json({
            status: "success",
            ...response,
          });

          return;
        }
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export default withSentry(tokenRequest);
