import type { NextApiRequest, NextApiResponse } from "next";
import {
  parseResyncQuery,
  terraResyncUserExternalCall,
} from "server/terra/resync";
import { withSentry } from "@sentry/nextjs";

const resyncUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      //   console.log("req", req.query);

      const { uid } = parseResyncQuery(req.query);

      if (uid) {
        const response = await terraResyncUserExternalCall(uid);

        console.log("response", response);

        if (response.status === "success") {
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

export default withSentry(resyncUser);
