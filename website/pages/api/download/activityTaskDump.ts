import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseTaskQuery } from "server/reconcile/parse";
import { withSentry } from "@sentry/nextjs";

const activityTaskDump = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("here");
    if (req.method === "POST") {
      //   console.log(req.query);
      //   console.log("req", req.body);
      const { taskId } = parseTaskQuery(req.body);

      //   console.log("taskId", taskId);
      //   console.log(`${process.env.BACKEND_URL}/taskUserDetails`);

      if (taskId) {
        const response = await axios({
          url: `${process.env.BACKEND_URL}/taskUserDetails`,
          method: "POST",
          data: {
            taskId,
          },
        });

        // console.log(response.data);

        const { data } = response.data as { data: [] };

        res.status(200).json({
          status: "success",
          data: data,
        });
        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(activityTaskDump);
