import type { NextApiRequest, NextApiResponse } from "next";
import { parseAWSQuery } from "server/awsSign/parseQuery";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { withSentry } from "@sentry/nextjs";

const client = new S3Client({
  region: process.env.S3_AWS_REGION,
  useAccelerateEndpoint: true,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY ? process.env.ACCESS_KEY : "",
    secretAccessKey: process.env.SECRET_KEY ? process.env.SECRET_KEY : "",
  },
});

const s3Sign = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { uid, filename } = parseAWSQuery(req.body);

      const extList = filename.split(".");
      const ext = extList[extList.length - 1];

      const key = `webapp/${uid}/${new Date().getTime()}_${uuidv4()}${
        ext ? `.${ext}` : ""
      }`;

      const command = new PutObjectCommand({
        Bucket: "sbusermedia",
        Key: key,
        Body: "",
      });

      const url = await getSignedUrl(client, command, { expiresIn: 3600 });

      // console.log("url", url);

      res.status(200).json({
        status: "success",
        url: url,
        bucket: "sbusermedia",
        key,
      });

      return;
    }

    res.status(400).json({
      status: "failed",
    });
  } catch (error) {
    console.log("error in server invite", error);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(s3Sign);
