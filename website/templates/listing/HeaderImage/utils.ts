import {
  AWSMedia,
  cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { getPathOfImage } from "@models/Media/createUtils";
import { cloud_name } from "@utils/cloudinary";

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

export const getURLToFetch = (
  media: CloudinaryMedia | AWSMedia,
  width: number,
  height: number,
  forceHeight?: boolean
) => {
  if (isAWSMedia(media)) {
    if (media.resource_type === "image") {
      const path = getPathOfImage(media.url);
      // console.log("path", path);
      // console.log("path", media.path);
      if (path) {
        // console.log(
        //   `https://ik.imagekit.io/socialboat/tr:w-${width},h-${height},c-maintain_ratio,fo-auto,pr-true/${path}`
        // );
        // console.log(media.url);
        return `https://ik.imagekit.io/socialboat/tr:w-${width},h-${height},c-maintain_ratio,fo-auto,pr-true/${path}`;
      }

      return media.url;
    } else if (media.resource_type === "video") {
      const path = getPathOfImage(media.url);
      if (forceHeight && path) {
        return `https://ik.imagekit.io/socialboat/${path}?tr=f-mp4,w-${width},h-${height}`;
      }
      // else if (media.extension === "mov" || media.extension === "MOV") {
      //   return `https://ik.imagekit.io/socialboat/${path}?tr=f-mp4,w-${width},h-${height}`;
      // }
      else if (!forceHeight && path) {
        return `https://sbusermedia.s3.ap-south-1.amazonaws.com/${path}`;
      } else {
        return media.url;
      }
    }

    // else if (media.resource_type === "video" && forceHeight) {

    //   if (path)
    //   console.log("hi");
    //   return `https://ik.imagekit.io/socialboat/${media.path}?tr=f-mp4,w-${width},h-${height}`;
    // } else if (media.resource_type === "video") {
    //   return `https://sbusermedia.s3.ap-south-1.amazonaws.com/${media.path}`;
    // }
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

      // return `https://ik.imagekit.io/socialboat/sbcloud/res/${cloud_name}/${
      //   media.resource_type
      // }/upload/${media.public_id}/${getCloudinaryImageName(media)}.${
      //   media.format
      // }?tr=f-mp4,w-${width},h-${height}`;
    }
  }

  return "";
};

// https://sbusermedia.s3-accelerate.amazonaws.com/webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222359653_273610131_1003565606901571_2478452115202246367_n%20%282%29.jpeg
// https://ik.imagekit.io/socialboat/tr:w-400,h-300,c-maintain_ratio,fo-auto,pr-true/webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222359653_273610131_1003565606901571_2478452115202246367_n%20%282%29.jpeg
// https://ik.imagekit.io/socialboat/tr:w-400,h-300,c-maintain_ratio,fo-auto,pr-true/webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222439007_273610131_1003565606901571_2478452115202246367_n%20(1).jpeg

// webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222359653_273610131_1003565606901571_2478452115202246367_n%20%282%29.jpeg
// webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222359653_273610131_1003565606901571_2478452115202246367_n%20%282%29.jpeg

// https://sbusermedia.s3.ap-south-1.amazonaws.com/webapp/UwWgWiuvofNY9Cnee5cU0gBOAUq2/1651222439007_273610131_1003565606901571_2478452115202246367_n+(1).jpeg
