import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { parseMotivatorQuery } from "server/motivator/parseQuery";
import { checkExpiry } from "server/motivator/checkExpiry";

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = parseMotivatorQuery(req.query);

    if (query.uid && query.coach) {
      const expiry = await checkExpiry(query.uid);
      const now = Date.now();

      if (expiry < now) {
        // console.log("added motivator");
        const firebase = (await import("@config/adminFire")).default;
        const db = firebase.firestore();

        // update coach
        db.collection("users").doc(query.uid).update({
          motivatedBy: query.coach,
          motivatedOn: Date.now(),
          adSource: query.adSource,
        });
      }
    }

    res.status(200).json({
      status: "success",
    });

    return;
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });

    return;
  }
};

export default withSentry(add);
