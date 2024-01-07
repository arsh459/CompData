// import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { handleSearchQuery } from "server/search/handleSearchQuery";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
// import { parseSearchQuery } from "server/search/parseSearchQuery";
import { withSentry } from "@sentry/nextjs";
// import { parseMuxQuery } from "server/mux/parseQuery";
// import axios from "axios";
import { parseMotivatorQuery } from "server/motivator/parseQuery";
// import { GetSubscriber } from "@models/RevenueCat/interface";
// import { getUserAppSubscription } from "@utils/payments/getEvent";
import { checkExpiry } from "server/motivator/checkExpiry";

const check = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("r", req.query);
    const query = parseMotivatorQuery(req.query);

    const now = Date.now();
    // let expiry: number = -1;

    const expiry = await checkExpiry(query.uid);

    res.status(200).json({
      status: "success",
      proStatus: expiry > now ? true : false,
      expiry,
    });

    return;
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });

    return;
  }
};

export default withSentry(check);
