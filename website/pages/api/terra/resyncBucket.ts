import type { NextApiRequest, NextApiResponse } from "next";
import { parseResyncQuery, terraResyncExternalCall } from "server/terra/resync";
import { withSentry } from "@sentry/nextjs";

const resyncBucket = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log("req", req.query);

      const { uid, day } = parseResyncQuery(req.query);

      if (uid && day) {
        const response = await terraResyncExternalCall(uid, day);

        // console.log("response", response);

        if (response.status === "success") {
          // console.log("status", status);
          res.status(200).json({
            ...response,
          });

          return;
        } else {
          res.status(400).json({
            status: "failed",
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

export default withSentry(resyncBucket);
