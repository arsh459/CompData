// import { createReminder } from "@models/Reminder/createUtils";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  parseVoidQuery,
  // saveReminder_server,
} from "server/whatsapp/parseVoidQuery";
import { withSentry } from "@sentry/nextjs";

const voidWhatsAppReminder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      //   console.log("req", req.query);

      const { streamId, taskId } = parseVoidQuery(req.query);

      if (streamId && taskId) {
        // const reminder = createReminder(
        //   true,
        //   "workout_finish",
        //   undefined,
        //   Date.now(),
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   undefined,
        //   streamId,
        //   taskId,
        //   "task"
        // );

        // await saveReminder_server(reminder);

        res.status(200).json({
          // status: status,
        });

        return;
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

export default withSentry(voidWhatsAppReminder);
