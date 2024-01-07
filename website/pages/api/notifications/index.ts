import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import axios from "axios";
import { parseNotificationQuery } from "server/parseNotificationQuery/parseQuery";

const sendNotifications = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { templateId, cohortId } = parseNotificationQuery(req.body);

      console.log("templateId", templateId);
      console.log("cohortId", cohortId);

      if (cohortId && templateId) {
        await axios({
          url: `${process.env.BACKEND_URL}/sendOnDemandNotification`,
          method: "POST",
          data: {
            templateId,
            cohortId,
          },
        });
      }

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

export default withSentry(sendNotifications);
