import type { NextApiRequest, NextApiResponse } from "next";
import {
  parseWidgetQuery,
  terraWidgetExternalCall,
} from "server/terra/widget_server";
import { withSentry } from "@sentry/nextjs";

const widget = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      // console.log("req", req.query);

      const { uid, leaderKey, eventKey, workout } = parseWidgetQuery(req.query);

      if (uid) {
        const { url, sessionId } = await terraWidgetExternalCall(
          uid,
          leaderKey,
          eventKey,
          workout
        );

        // console.log("url", url, sessionId);

        if (url) {
          res.status(200).json({
            status: "success",
            url,
            sessionId,
          });

          return;
        }
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in terra server");
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(widget);
