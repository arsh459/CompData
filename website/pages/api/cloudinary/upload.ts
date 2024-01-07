import type { NextApiRequest, NextApiResponse } from "next";
import * as cloudinary from "cloudinary";
// import { parseInviteQuery } from "@utils/invites/parseInviteQuery";
// import axios from "axios";
// import { parseEndLiveQuery } from "server/endLive/parseQuery";
import { withSentry } from "@sentry/nextjs";
import { parseCloudinaryQuery } from "server/cloudinary/parseCloudinaryQuery";

cloudinary.v2.config({
  cloud_name: "htt-holidaying-travel-technologies",
  api_key: "564613616665361",
  api_secret: "process.env.CLOUDINARY_SECRET_KEY",
});

// export interface CloudinaryParams {
//   img?: string;
//   // postId?: string;
//   // eventId?: string;
// }

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { img } = parseCloudinaryQuery(req.body);

      //   console.log(req.body);
      //   console.log("img", img);

      if (img) {
        const clousinaryResponse = await cloudinary.v2.uploader.upload(img);

        // console.log("cloudinary response", clousinaryResponse);
        // const response = await axios({
        //   url: `${process.env.BACKEND_URL}/handleEventEnd`,
        //   // url: "http://localhost:5001/holidaying-prod/asia-south1/onFreeUserSignUp",
        //   method: "POST",
        //   data: {
        //     seriesId,
        //     streamId,
        //     liveId,
        //     authorId,
        //     workoutType,
        //     parentId,
        //     communityId,
        //   },
        // });

        // console.log("response", response);

        res.status(200).json({
          status: "success",
          media: clousinaryResponse,
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

export default withSentry(upload);
