import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { saveError } from "@utils/payments/savePayments";
import { withSentry } from "@sentry/nextjs";
import { parseTaskGeneratorQuery } from "@utils/generator/parseGeneratorQuery";

const taskGenerator = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`verify Method: ${req.method}`, req.query);
    if (req.method === "POST") {
      const { badgeId, recreate, deletePrevious, type, uid } =
        parseTaskGeneratorQuery(req.query);

      if (
        // companyCode &&
        // badgeId &&
        type &&
        uid
      ) {
        await axios({
          url: `${process.env.BACKEND_URL}/taskGenerator`,
          method: "POST",
          params: {
            uid: uid,
            days: 7,
            startToday: true,
            type,
            ...(recreate ? { recreate: recreate } : {}),
            ...(deletePrevious ? { deletePrevious: deletePrevious } : {}),
            ...(badgeId ? { badgeId } : {}),
          },
          data: {
            uid: uid,
            days: 7,
            startToday: true,
            type,
            ...(recreate ? { recreate: recreate } : {}),
            ...(deletePrevious ? { deletePrevious: deletePrevious } : {}),
            ...(badgeId ? { badgeId } : {}),
          },
        });

        res.status(200).json({
          status: "success",
        });
        return;
      }
    } else {
      await saveError(
        "/api/taskGenerator",
        `method: ${req.method}`,
        "api/taskGenerator"
      );
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(taskGenerator);
