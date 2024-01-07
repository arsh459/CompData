import type { NextApiRequest, NextApiResponse } from "next";

import { withSentry } from "@sentry/nextjs";
import { parseCreateTeamQuery } from "server/refreshLeaderboard/parseQuery";
import axios from "axios";

const createTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { uid } = parseCreateTeamQuery(req.body);

      //   console.log("uid", uid, `${process.env.BACKEND_URL}/createUserTeam`);

      if (uid) {
        await axios({
          url: `${process.env.BACKEND_URL}/createUserTeam`,
          method: "POST",
          data: {
            uid: uid,
          },
          params: {
            uid: uid,
          },
        });

        // console.log("resp", resp);
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
    console.log("error in server invite");
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(createTeam);
