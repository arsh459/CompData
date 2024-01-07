import type { NextApiRequest, NextApiResponse } from "next";
import { parseViewQuery } from "@utils/views/parseViewQuery";
import { withSentry } from "@sentry/nextjs";

const addViewRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { eventId, ownerUID } = parseViewQuery(req.query);

      if (eventId && ownerUID) {
        const firebase = (await import("@config/adminFire")).default;
        const db = firebase.firestore();
        // await db
        //   .collection("sbEvents")
        //   .doc(eventId)
        //   .update({
        //     views: firebase.firestore.FieldValue.increment(1),
        //   });

        await db
          .collection("users")
          .doc(ownerUID)
          .update({
            sbViews: firebase.firestore.FieldValue.increment(1),
          });

        res.status(200).json({
          status: "success",
        });

        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: err });
  }
};

export default withSentry(addViewRequest);
