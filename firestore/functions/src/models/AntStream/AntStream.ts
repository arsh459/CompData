import * as admin from "firebase-admin";
import { AWSMedia } from "../sbEvent/CloudinaryMedia";

export interface AntStream {
  uid: string;
  createdOn: number;
  id: string;

  media: AWSMedia[];
}

export const getAntStream = async (id: string) => {
  const resp = await admin.firestore().collection("antStreams").doc(id).get();

  if (resp.exists) {
    const antStream = resp.data() as AntStream;

    return antStream;
  }

  return undefined;
};

export const addMediaToStream = async (id: string, media: AWSMedia) => {
  await admin
    .firestore()
    .collection("antStreams")
    .doc(id)
    .update({ media: admin.firestore.FieldValue.arrayUnion(media) });
};

export const createAWSMedia = (filename: string): AWSMedia => {
  return {
    id: filename,
    resource_type: "video",
    width: 480,
    height: 640,
    duration: 0,
    extension: "mp4",
    filename: `${filename}.mp4`,
    path: `streams/${filename}.mp4`,
    region: "ap-south-1",
    bucketName: "sbusermedia",
    remoteFileName: `${filename}.mp4`,
    mediaType: "aws",
    size: 0,
    url: `https://sbusermedia.s3.ap-south-1.amazonaws.com/streams/${filename}.mp4`,
    uploadedUnix: Date.now(),
  };
};
