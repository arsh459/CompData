import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import * as ImagePicker from "expo-image-picker";
import crashlytics from "@react-native-firebase/crashlytics";

export const getSignedURL = async (
  fileName: string,
  fileType: string,
  uid: string
) => {
  const response = await fetch("https://socialboat.live/api/aws/s3Sign", {
    method: "post",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      filename: fileName,
      contentType: fileType,
      uid: uid,
    }),
  });

  const data = (await response.json()) as {
    status: string;
    url?: string;
    bucket: string;
    key: string;
  };

  return {
    url: data.url ? data.url : "",
    method: "PUT",
    headers: {
      "Content-Type": fileType ? fileType : "image",
    },
    fields: undefined,
    key: data.key,
    bucket: data.bucket,
  };
};

const getVideoWidthHeightDuration = async (
  file: Blob,
  type: "image/jpg" | "video/mp4"
): Promise<{
  width: number | undefined;
  height: number | undefined;
  duration: number | undefined;
}> => {
  return new Promise((resolve) => {
    if (type === "video/mp4") {
      const url = URL.createObjectURL(file);

      const video = document.createElement("video");
      video.src = url;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
        });
      };
    } else {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: image.width,
          height: image.height,
          duration: undefined,
        });
      };
    }
  });
};

export const getFileWidthHeight = async (
  file: ImagePicker.ImagePickerAsset, // ImagePicker.ImageInfo,
  mediaType: "image/jpg" | "video/mp4"
) => {
  if (file.width && file.height && mediaType === "image/jpg") {
    return {
      width: file.width,
      height: file.height,
      duration: undefined,
    };
  } else if (
    mediaType === "video/mp4" &&
    file.width &&
    file.height &&
    file.duration
  ) {
    return {
      width: file.width,
      height: file.height,
      duration: file.duration,
    };
  }

  const response = await fetch(file.uri);
  const blob = await response.blob();

  return getVideoWidthHeightDuration(blob, mediaType);
};

export const getFileDetails = (
  file: ImagePicker.ImagePickerAsset
): {
  type: "video/mp4" | "image/jpg";
  fileExtension: string;
  fileName: string;
  fileSize: number;
} => {
  const uri = file.uri;
  let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);
  const fileSize = file.fileSize ? file.fileSize : 0;

  const fileName = `${new Date().getTime()}_${uuid()}.${fileExtension}`;

  if (file.type) {
    return {
      type: file.type === "image" ? "image/jpg" : "video/mp4",
      fileExtension,
      fileName,
      fileSize,
    };
  }

  if (
    fileExtension.toLowerCase() === "mp4" ||
    fileExtension.toLowerCase() === "mov" ||
    fileExtension.toLowerCase() === "mkv" ||
    fileExtension.toLowerCase() === "webm" ||
    fileExtension.toLowerCase() === "avi" ||
    fileExtension.toLowerCase() === "wmv" ||
    fileExtension.toLowerCase() === "m4v"
  ) {
    return {
      type: "video/mp4",
      fileExtension,
      fileName,
      fileSize,
    };
  }

  return {
    type: "image/jpg",
    fileExtension,
    fileName,
    fileSize,
  };
};

export const uploadToS3 = async (
  signedURL: string,
  payload: Blob,
  headers: { [key: string]: string }
) => {
  try {
    // const r = await fetch(signedURL, {
    //   method: "PUT",
    //   body: payload,
    //   headers: {
    //     "Content-Type": "image",
    //   },
    // });
    // await fetch(signedURL, {
    //   method: "PUT",
    //   body: payload,
    //   headers: headers,
    // });
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
    return undefined;
  }
};
