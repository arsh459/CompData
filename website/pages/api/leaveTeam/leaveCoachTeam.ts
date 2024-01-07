import type { NextApiRequest, NextApiResponse } from "next";
// import { parseInviteQuery } from "@utils/invites/parseInviteQuery";
import axios from "axios";
// import { parseEndLiveQuery } from "server/endLive/parseQuery";
import { parseLeaveTeamQuery } from "server/removeUser/parseQuery";
import { withSentry } from "@sentry/nextjs";

const leaveCoachTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { eventId, uid } = parseLeaveTeamQuery(req.query);

      console.log("name", uid, eventId);

      const response = await axios({
        url: `${process.env.BACKEND_URL}/removeUserFromTeam`,
        // url: "http://localhost:5001/holidaying-prod/asia-south1/removeUserFromTeam",
        // url: "http://localhost:5001/holidaying-prod/asia-south1/onFreeUserSignUp",
        method: "POST",
        data: {
          eventId,
          uid,
        },
      });

      console.log("response", response);

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

export default withSentry(leaveCoachTeam);
