// import axios from "axios";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseRefreshQuery } from "server/refresh/parse";

const refreshTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log("r", req.query);
      const { type } = parseRefreshQuery(req.query);
      console.log("query", type);
      if (type) {
        if (type === "task") {
          await axios({
            url: `${process.env.BACKEND_URL}/tasksToAlgolia`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + `${process.env.CALENDLY}`,
            },
          });
        } else if (type === "blog") {
          await axios({
            url: `${process.env.BACKEND_URL}/blogToAlgolia`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + `${process.env.CALENDLY}`,
            },
          });
        }

        // console.log("response", response);
        res.status(200).json({
          status: "success",
        });

        return;
      }
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

export default refreshTasks;
