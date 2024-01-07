// import { handleSearchQuery } from "@util/algolia/handleSearchQuery";
// import { parseQuery } from "@util/algolia/parse";
import { parseZoomRefreshTokenQuery } from "@utils/zoom/parseZoomTokenQuery";
import { refreshZoomAccessToken } from "@utils/zoom/zoomToken";
import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
// import { parseZoomRefreshTokenQuery } from "./utils/parseZoomTokenQuery";
// import { refreshZoomAccessToken } from "./utils/zoomToken";

const refreshTokenRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      const token = parseZoomRefreshTokenQuery(req.query);

      //   console.log("token to refresh", token);

      if (token) {
        const response = await refreshZoomAccessToken(token);

        // console.log("response", response);

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
    console.log("error in refreshing", err);
    res.status(400).json({ error: err });
  }
};

export default withSentry(refreshTokenRequest);
