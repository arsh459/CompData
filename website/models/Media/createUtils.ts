import { AWSMedia } from "./cloudinaryUpload";

export const getPathOfImage = (url: string) => {
  const parts = url.split("https://sbusermedia.s3-accelerate.amazonaws.com/");

  if (parts.length > 1) {
    return parts[1];
  }
  return "";
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
  duration?: number
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

export const getWidthHeightAWSMedia = (
  file: any
): {
  width: number | undefined;
  height: number | undefined;
  duration: number | undefined;
} => {
  if (file.meta.width && file.meta.height) {
    return {
      width: file.meta.width,
      height: file.meta.height,
      duration: file.meta.duration,
    };
  }

  return {
    width: undefined,
    height: undefined,
    duration: undefined,
  };
};

export const getMediaType = (type?: string): "image" | "video" => {
  return type && type.includes("image") ? "image" : "video";
};

export const getVideoWidthHeightDuration = async (
  file: Blob,
  type: "image" | "video"
): Promise<{
  width: number | undefined;
  height: number | undefined;
  duration: number | undefined;
}> => {
  return new Promise((resolve) => {
    if (type === "video") {
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
