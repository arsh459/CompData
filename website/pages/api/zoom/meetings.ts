import type { NextApiRequest, NextApiResponse } from "next";
import { getMeetings } from "@utils/zoom/getMeetings";
import { parseZoomMeetingsQuery } from "@utils/zoom/parseZoomTokenQuery";
import { withSentry } from "@sentry/nextjs";

const meetingsRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { token } = parseZoomMeetingsQuery(req.query);

      if (token) {
        // console.log("token", token);
        const meetingsResponse = await getMeetings(token);

        // console.log("meetingsResponse", meetingsResponse);

        res.status(200).json({
          status: "success",
          ...meetingsResponse,
        });

        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: err });
  }
};

export default withSentry(meetingsRequest);
