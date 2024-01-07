import type { NextApiRequest, NextApiResponse } from "next";

import { withSentry } from "@sentry/nextjs";
import { parseLeaderboardQuery } from "server/refreshLeaderboard/parseQuery";
import axios from "axios";

const refreshLeaderboard = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { gameId } = parseLeaderboardQuery(req.body);

      if (gameId) {
        await axios({
          url: `${process.env.BACKEND_URL}/refreshUserLeaderboardV2`,
          method: "POST",
          data: {
            eventId: gameId,
          },
        });

        // await axios({
        //   url: `${process.env.BACKEND_URL}/refreshCoachLeaderboardV2`,
        //   method: "POST",
        //   data: {
        //     eventId: gameId,
        //   },
        // });
      }

      // console.log("url", url);

      res.status(200).json({
        status: "success",
      });

      return;
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (error) {
    console.log("error in server invite", error);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(refreshLeaderboard);
