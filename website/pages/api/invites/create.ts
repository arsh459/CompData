import type { NextApiRequest, NextApiResponse } from "next";
import { parseInviteQuery } from "@utils/invites/parseInviteQuery";
import axios from "axios";
import { withSentry } from "@sentry/nextjs";

const createInviteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "POST") {
      const {
        name,
        phone,
        email,
        inviteCode,
        eventId,
        uid,
        cohortId,
        userUid,
      } = parseInviteQuery(req.query);

      console.log("name", name, phone, email, inviteCode, eventId);

      const response = await axios({
        url: `${process.env.BACKEND_URL}/onFreeUserSignUp`,
        // url: "http://localhost:5001/holidaying-prod/asia-south1/onFreeUserSignUp",
        method: "POST",
        data: {
          name,
          phone,
          email,
          inviteCode,
          eventId,
          uid,
          cohortId,
          userUid,
        },
      });

      // console.log("response", response);

      if (response.data.registrationId) {
        res.status(200).json({
          registrationId: response.data.registrationId,
        });

        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (err) {
    console.log("error in server invite", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(createInviteRequest);
