import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { parsePhoneQuery } from "server/checkPhone/parseQuery";

const checkPhone = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { phone } = parsePhoneQuery(req.body);

      if (phone) {
        const firebase = (await import("@config/adminFire")).default;

        const user = await firebase.auth().getUserByPhoneNumber(phone);

        if (user) {
          res.status(200).json({
            user: user.uid,
            status: "success",
          });

          return;
        } else {
          res.status(200).json({
            status: "success",
          });

          return;
        }
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (error) {
    console.log("error in user checking", error);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(checkPhone);
