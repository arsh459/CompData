// import axios from "axios";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCalendlyQuery } from "server/calendly/parse";
import { v4 as uuidv4 } from "uuid";

interface CalendlyResponse {
  resource: {
    created_at: string;
    end_time: string;
    start_time: string;
    name?: string;
    status: "active" | "cancelled";
    location?: {
      location?: string;
      join_url: string;
      status: string;
      type: "google_conference";
    };
  };
}

const meetingDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log("r", req.query);
      const { uuid, uid, type } = parseCalendlyQuery(req.query);
      console.log("query", uuid, uid, type);
      if (uuid) {
        let defaultToken = process.env.CALENDLY;
        if (type === "gynaecologist") {
          defaultToken = process.env.CALENDLY_DOC;
        } else if (type === "nutrtitionist") {
          defaultToken = process.env.CALENDLY_DIET;
        } else if (type === "health_coach") {
          defaultToken = process.env.CALENDLY_HEALTH;
        }

        const response = await axios({
          url: `https://api.calendly.com/scheduled_events/${uuid}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${defaultToken}`,
          },
          data: {
            uuid: uuid,
          },
        });

        const axiosResp = response.data as CalendlyResponse;

        console.log("axiosResp", axiosResp);

        const CALENDLY_SLOT_ID = "Qeu0JIuGyJ75gRy0ocme";

        const st = new Date(axiosResp.resource.start_time);
        const en = new Date(axiosResp.resource.end_time);

        console.log("start", axiosResp.resource.start_time, st);
        console.log("end", axiosResp.resource.end_time, en);

        // console.log("response", response);
        res.status(200).json({
          status: "success",

          id: uuidv4(),
          uid,
          slotId: CALENDLY_SLOT_ID,

          startUnix: st.getTime(),
          endUnix: en.getTime(),
          link: axiosResp.resource.location?.join_url
            ? axiosResp.resource.location?.join_url
            : "",
          phone: axiosResp.resource.location?.location
            ? axiosResp.resource.location?.location
            : "",
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

export default meetingDetails;
