// import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleSearchQuery } from "server/search/handleSearchQuery";
// import { parseReconcileCoachesQuery } from "server/reconcile/parse";
import { parseSearchQuery } from "server/search/parseSearchQuery";
import { withSentry } from "@sentry/nextjs";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      // console.log("r", req.query);
      const query = parseSearchQuery(req.query);
      // console.log("query", query);
      const response = await handleSearchQuery(query);
      // console.log("response", response);
      res.status(200).json({
        status: "success",
        hits: response.hits,
        nbPages: response.nbPages,
        nbHits: response.nbHits,
        hitsPerPage: response.hitsPerPage,
      });

      return;
    }

    res.status(400).json({
      status: "failed",
    });

    return;
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });

    return;
  }
};

export default withSentry(search);
