import type { NextApiRequest, NextApiResponse } from "next";
// import { parseInviteQuery } from "@utils/invites/parseInviteQuery";
import axios from "axios";
import { parseEndLiveQuery } from "server/endLive/parseQuery";
import { withSentry } from "@sentry/nextjs";

export interface paramsForEndLive {
  id: string;
  seriesId: string;
  liveId: string;
  streamId: string;
  workoutType: "lives" | "exercises";
  parentId: string;
  authorId: string;
  communityId: string;
}

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const {
        seriesId,
        streamId,
        liveId,
        authorId,
        workoutType,
        parentId,
        communityId,
      } = parseEndLiveQuery(req.query);

      // console.log(seriesId, "eheheh");
      console.log(
        "seriesId",
        seriesId,
        "streamId",
        streamId,
        "liveId",
        liveId,
        "authorId",
        authorId,
        "workoutType",
        workoutType,
        "parentId",
        parentId,
        "communityId",
        communityId
      );
      //   console.log("name", name, phone, email, inviteCode, eventId);

      const response = await axios({
        url: `${process.env.BACKEND_URL}/handleEventEnd`,
        // url: "http://localhost:5001/holidaying-prod/asia-south1/onFreeUserSignUp",
        method: "POST",
        data: {
          seriesId,
          streamId,
          liveId,
          authorId,
          workoutType,
          parentId,
          communityId,
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

export default withSentry(sendMessage);
