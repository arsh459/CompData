import {
  AWSMedia,
  cloudinaryBaseURL,
  CloudinaryMedia,
  cloud_name,
} from "@models/Media/MediaTypeInterface";

export const handleCloudinaryURL = (
  resource_type: "image" | "video",
  path: string,
  transformations: string
) => {
  return `${cloudinaryBaseURL}/${resource_type}/upload/${transformations}/${path}`;
};

export const getCloudinaryImageName = (media: CloudinaryMedia) => {
  const p = media.path.split("/")[0];
  if (p) {
    return p.substring(1, p.length);
  }

  return "";
};

export const isAWSMedia = (
  media: CloudinaryMedia | AWSMedia
): media is AWSMedia => {
  return (media as AWSMedia).mediaType === "aws";
};

export const getPathOfImage = (url: string) => {
  const parts = url.split("https://sbusermedia.s3-accelerate.amazonaws.com/");

  if (parts.length > 1) {
    return parts[1];
  }
  return "";
};

export const getURLToFetch = (
  media: CloudinaryMedia | AWSMedia,
  width: number,
  height: number,
  forceHeight?: boolean
) => {
  // , media.url);
  if (isAWSMedia(media)) {
    if (media.resource_type === "image") {
      // const path = getPathOfImage(media.url);
      const path = media.path;

      if (path) {
        return `https://ik.imagekit.io/socialboat/tr:w-${width},h-${height},c-maintain_ratio,fo-auto,pr-true/${path}`;
      }

      return media.url;
    } else if (media.resource_type === "video") {
      const path = getPathOfImage(media.url);
      if (forceHeight && path) {
        return `https://ik.imagekit.io/socialboat/${path}?tr=f-mp4,w-${width},h-${height}`;
      } else if (media.extension === "mov" || media.extension === "MOV") {
        return `https://ik.imagekit.io/socialboat/${path}?tr=f-mp4,w-${width},h-${height}`;
      } else if (!forceHeight && path) {
        return `https://sbusermedia.s3.ap-south-1.amazonaws.com/${path}`;
      } else {
        return media.url;
      }
    }
  } else {
    if (media.resource_type === "image") {
      return `https://ik.imagekit.io/socialboat/sbcloud/tr:w-${width},h-${height},c-maintain_ratio,fo-auto,pr-true/res/${cloud_name}/${
        media.resource_type
      }/upload/${media.public_id}/${getCloudinaryImageName(media)}.${
        media.format
      }`;
    } else {
      if (media.format === "mp4") {
        return `https://cloudinarysbbackup.s3.ap-south-1.amazonaws.com/res/${cloud_name}/${
          media.resource_type
        }/upload/${media.public_id}/${getCloudinaryImageName(media)}.${
          media.format
        }`;
      } else if (media.resource_type === "video" && forceHeight) {
        return `https://ik.imagekit.io/socialboat/sbcloud/res/${cloud_name}/${
          media.resource_type
        }/upload/${media.public_id}/${getCloudinaryImageName(media)}.${
          media.format
        }?tr=f-mp4,w-${width},h-${height}`;
      } else {
        return `https://ik.imagekit.io/socialboat/sbcloud/res/${cloud_name}/${
          media.resource_type
        }/upload/${media.public_id}/${getCloudinaryImageName(media)}.${
          media.format
        }?tr=f-mp4`;
      }
    }
  }

  return "";
};
