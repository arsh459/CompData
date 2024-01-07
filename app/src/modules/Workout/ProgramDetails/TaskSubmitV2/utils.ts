import { AWSMedia } from "@models/Media/MediaTypeInterface";
import {
  ACCESS_KEY,
  BUCKET,
  S3_AWS_REGION,
  SECRET_KEY,
} from "react-native-dotenv";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
// import { Video, getRealPath, getVideoMetaData } from "react-native-compressor";
import { Dispatch, SetStateAction } from "react";
import { RNS3 } from "react-native-upload-aws-s3";
import { createAWSMedia } from "@components/MediaPicker/createUtils";
// import { getSignedURL } from "@components/MediaPicker/utils";
// import Upload from "react-native-background-upload";
import { uploadStatusTypes } from "./GrantedFlow";
import { EventSubscription, Platform } from "react-native";
import { saveError } from "@models/Error/createUtils";
import { Activity } from "@models/Activity/Activity";
import crashlytics from "@react-native-firebase/crashlytics";

export const getFpProgress = (taskFP?: number, act?: Activity) => {
  if (act?.calories && taskFP) {
    const fp = act.calories / 300;
    return fp / taskFP <= 1 ? fp / taskFP : 1;
  } else {
    return 0;
  }
};

export const compressAndUpload = async (
  videoFiles: { uri: string }[],
  uid: string,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  const options = {
    keyPrefix: `webapp/${uid}/`,
    bucket: BUCKET,
    region: S3_AWS_REGION,
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY,
    successActionStatus: 201,
  };
  const type = "video";

  const awsMedias: AWSMedia[] = [];

  const compressedFiles: {
    width: number;
    duration: number;
    height: number;
    extension: string;
    fimeName: string;
    size: number;
    path: string;
  }[] = [];

  let progressBase = videoFiles.length;

  let i: number = 1;
  for (const videoFile of videoFiles) {
    const uri = videoFile.uri;
    let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);

    const fileName = `${new Date().getTime()}_${uuid()}.${fileExtension}`;

    compressedFiles.push({
      width: 0,
      height: 0,
      extension: fileExtension,
      fimeName: fileName,
      size: 0,
      path: uri,
      duration: -1,
    });

    // if (Platform.OS === "android") {

    // } else {
    // try {
    //     // const uriReplace = uri.replace("file:///", "file://");
    //     // const uriPath = await getRealPath(uri, "video");
    //     const result = Video.compress(
    //       uri,
    //       {
    //         compressionMethod: "auto",
    //         // maxSize: 240,
    //         // minimumFileSizeForCompress: 0,
    //       },
    //       (progress) => {
    //         setProgress((i * progress) / progressBase);
    //       }
    //     );

    //     i++;
    //     const realPath = await getRealPath(result, "video");
    //     const metadata2: {
    //       duration?: string;
    //       extension?: string;
    //       height?: string;
    //       width?: string;
    //       size?: string;
    //     } = await getVideoMetaData(realPath);
    //     compressedFiles.push({
    //       width: metadata2.width ? parseInt(metadata2.width) : 0,
    //       height: metadata2.height ? parseInt(metadata2.height) : 0,
    //       extension: metadata2.extension ? metadata2.extension : fileExtension,
    //       fimeName: fileName,
    //       duration: metadata2.duration ? parseInt(metadata2.duration) : 0,
    //       size: metadata2.size ? parseInt(metadata2.size) : 0,
    //       path: realPath,
    //     });
    //   } catch (error: any) {
    //     compressedFiles.push({
    //       width: 0,
    //       height: 0,
    //       extension: fileExtension,
    //       fimeName: fileName,
    //       size: 0,
    //       path: uri,
    //       duration: -1,
    //     });
    //   }
  }

  for (const compFile of compressedFiles) {
    try {
      const response = await RNS3.put(
        {
          uri: compFile.path,
          name: compFile.fimeName,
          type: "video/mp4",
        },
        options
      ).progress((e: { loaded: number; total: number; percent: number }) => {
        setProgress((i * e.percent) / progressBase);
      });

      i++;

      if (
        response.status === 201 &&
        response.body.postResponse.location &&
        response.body.postResponse.key &&
        response.body.postResponse.bucket
      ) {
        const awsMedia = createAWSMedia(
          compFile.fimeName,
          type,
          compFile.width,
          compFile.height,
          compFile.extension,
          compFile.fimeName,
          compFile.size,
          response.body.postResponse.key,
          response.body.postResponse.bucket,
          compFile.fimeName,
          S3_AWS_REGION,
          response.body.postResponse.location,
          compFile.duration
        );

        awsMedias.push(awsMedia);
      } else {
      }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("upload error");
    }
  }

  setProgress(1);

  return awsMedias;
};

export const backgroundUpload = async (
  videoFiles: { uri: string }[],
  uid: string,
  setProgress: Dispatch<SetStateAction<{ [uploadId: string]: number }>>,
  setUploadStatus: Dispatch<
    SetStateAction<{ [upliadId: string]: uploadStatusTypes } | undefined>
  >,
  onUploadFinish: (media: AWSMedia) => Promise<void>,
  catchListeners: Dispatch<SetStateAction<EventSubscription[]>>
) => {
  // const type = "video";

  const awsMedias: AWSMedia[] = [];

  const compressedFiles: {
    width: number;
    duration: number;
    height: number;
    extension: string;
    fimeName: string;
    size: number;
    path: string;
  }[] = [];

  // let progressBase = videoFiles.length * 100;

  // let i: number = 1;
  for (const videoFile of videoFiles) {
    const uri = videoFile.uri;

    let uriFormat = uri;
    if (Platform.OS === "android") {
      uriFormat = uri.replace("file://", "");
    }

    let fileExtension = uriFormat.substr(uriFormat.lastIndexOf(".") + 1);

    const fileName = `${new Date().getTime()}_${uuid()}.${fileExtension}`;

    compressedFiles.push({
      // path: videoFile.uri,

      path: uriFormat,

      width: 0,
      height: 0,
      extension: fileExtension,
      fimeName: fileName,
      size: 0,

      duration: -1,
    });
  }

  const uploadPromises: Promise<void>[] = [];
  for (const compFile of compressedFiles) {
    console.log("comp file", compFile.path);
    try {
      // const signedResponse = await getSignedURL(
      //   compFile.fimeName,
      //   "video/mp4",
      //   uid
      // const response = Upload.startUpload({
      //   url: signedResponse.url,
      //   path: compFile.path,
      //   method: "PUT",
      //   type: "raw",
      //   // maxRetries: 2,
      //   headers: {
      //     "content-type": "video/mp4",
      //     // accept: "application/json",
      //   },
      // })
      //   .then((uploadId) => {
      //     const uploadListener = Upload.addListener(
      //       "progress",
      //       uploadId,
      //       (data) => {
      //         const prog = data.progress;
      //         setUploadStatus((p) => {
      //           return {
      //             ...p,
      //             [uploadId]: "UPLOADING",
      //           };
      //         });
      //         setProgress((p) => {
      //           return {
      //             ...p,
      //             [uploadId]: prog,
      //           };
      //         });
      //       }
      //     );
      //     const errorListener = Upload.addListener(
      //       "error",
      //       uploadId,
      //       (error) => {
      //         saveError(uid, error, "Background upload", "TaskSubmitV2");
      //         setUploadStatus((p) => {
      //           return {
      //             ...p,
      //             [uploadId]: "FAILED",
      //           };
      //         });
      //       }
      //     );
      //     // Upload.addListener("cancelled", uploadId, (data) => {
      //     // });
      //     const compListener = Upload.addListener(
      //       "completed",
      //       uploadId,
      //       async () => {
      //         const awsMedia = createAWSMedia(
      //           compFile.fimeName,
      //           type,
      //           compFile.width,
      //           compFile.height,
      //           compFile.extension,
      //           compFile.fimeName,
      //           compFile.size,
      //           signedResponse.key,
      //           signedResponse.bucket,
      //           compFile.fimeName,
      //           S3_AWS_REGION,
      //           undefined,
      //           compFile.duration
      //         );
      //         await onUploadFinish(awsMedia);
      //         setUploadStatus((p) => {
      //           return {
      //             ...p,
      //             [uploadId]: "SUCCESS",
      //           };
      //         });
      //       }
      //     );
      //     catchListeners([uploadListener, errorListener, compListener]);
      //   })
      //   .catch((err) => {
      //   });
      // uploadPromises.push(response);
      // i++;
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("upload error", error);

      saveError(uid, error, "Background upload", "TaskSubmitV2");
    }
  }

  await Promise.all(uploadPromises);

  // setProgress(1);

  return awsMedias;
};
