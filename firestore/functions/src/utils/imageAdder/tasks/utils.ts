// import axios from "axios";
import * as admin from "firebase-admin";
import { AWSMedia } from "../../../models/sbEvent/CloudinaryMedia";
import { v4 as uuidv4 } from "uuid";
import * as AWS from "aws-sdk";
import { makeDaliRequest } from "../../../main/Https/chat/handleGPTQuery";
const BUCKET_NAME = process.env.BUCKET;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const S3_AWS_REGION = process.env.S3_AWS_REGION;

// interface imageData {
//   created: Date;
//   data: { b64_json: string }[];
// }

export const updateTaskThumbnail = async (id: string, thumbnail: AWSMedia) => {
  try {
    const taskDoc = await admin.firestore().collection("tasks").doc(id).update({
      thumbnails: thumbnail,
    });

    if (!taskDoc) {
      return undefined;
    }

    return true;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const generateGptImage = async (query: string) => {
  const response = await makeDaliRequest(
    query,
    "sb-backend",
    "512x512",
    "b64_json",
  );

  // let imageGenerated = await axios.post(
  //   "https://api.openai.com/v1/images/generations",
  //   {
  //     prompt: query,
  //     n: 1,
  //     size: "512x512",
  //     response_format: "b64_json",
  //   },
  //   {
  //     headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  //   },
  // );
  if (response.length && response[0].b64_json) {
    // data.data

    // const data: imageData = data;

    console.log("IAMGE GENERATED with OPENAI");

    let uploadedData = await handleImageUpload(
      // data,
      response[0].b64_json,
      query,
    );

    console.log("uploaded to aws", uploadedData?.url);

    return uploadedData ? uploadedData : undefined;
  }

  return undefined;
};

const handleImageUpload = async (
  // data: imageData,
  url: string,
  query: string,
) => {
  try {
    const id = uuidv4();
    const s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    });
    const type = "image/jpg";
    if (BUCKET_NAME && S3_AWS_REGION) {
      const uploadedImage = await s3
        .upload({
          Bucket: `${BUCKET_NAME}/webapp/${id}`,
          Key: `${query.split(" ").join("_")}.png`,
          Body: Buffer.from(
            url.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          ),
          ContentType: type,
        })
        .promise();

      const fileName = `${new Date().getTime()}_${id}.png`;
      const width = 512;
      const height = 512;
      const fileExtension = "png";
      // const fileSize = 512 * 512;
      const duration = undefined;
      const awsMedia = createAWSMedia(
        fileName,
        type === "image/jpg" ? "image" : "video",
        width,
        height,
        fileExtension,
        fileName,
        -1,
        uploadedImage.Key,
        BUCKET_NAME,
        fileName,
        S3_AWS_REGION,
        uploadedImage.Location,
        duration,
      );
      return awsMedia;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const createAWSMedia = (
  id: string,
  resource_type: "image" | "video",
  width: number | undefined,
  height: number | undefined,
  extension: string,
  filename: string,
  size: number,
  path: string,
  bucketName: string,
  remoteFileName: string,
  region: string,
  url?: string,
  duration?: number,
): AWSMedia => {
  return {
    id,
    resource_type,
    mediaType: "aws",
    extension,
    size,
    filename,
    bucketName,
    region,
    remoteFileName,
    path,
    ...(duration ? { duration: duration } : {}),
    ...(width ? { width: width } : {}),
    ...(height ? { height: height } : {}),
    url: url ? url : `https://${bucketName}.s3.${region}.amazonaws.com/${path}`,
    uploadedUnix: Date.now(),
  };
};
