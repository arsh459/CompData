import type { NextApiRequest, NextApiResponse } from "next";
import {
  addUsersToEvent,
  parseInviteEventQuery,
} from "@utils/invites/parseInviteQuery";
import { withSentry } from "@sentry/nextjs";

const inviteToTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log("req", req.query);
      const { eventId, uids, action, communityId } = parseInviteEventQuery(
        req.query
      );

      // console.log("eventId", eventId, uids);
      await addUsersToEvent(
        communityId,
        eventId,
        uids,
        action === "add" ? "add" : "invite"
      );

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

export default withSentry(inviteToTeam);
