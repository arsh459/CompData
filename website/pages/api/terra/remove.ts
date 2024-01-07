import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteTerraInFirestore,
  parseDeleteQuery,
  terraDeleteUser_external,
} from "server/terra/delete_terra";
import { withSentry } from "@sentry/nextjs";

const remove = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      //   console.log("req", req.query);

      const { user_id, uid } = parseDeleteQuery(req.query);

      if (user_id) {
        const { status } = await terraDeleteUser_external(user_id);
        await deleteTerraInFirestore(uid);

        // console.log("status", status);

        res.status(200).json({
          status: status,
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

export default withSentry(remove);
