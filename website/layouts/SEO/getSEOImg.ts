import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import {
  getURLToFetch,
  // isAWSMedia,
} from "@templates/listing/HeaderImage/utils";

export const getWidthHeight = (media?: CloudinaryMedia | AWSMedia) => {
  if (media && media.width === media.height) {
    return {
      width: 600,
      height: 600,
    };
  } else {
    return {
      width: 600,
      height: 314,
    };
  }
};

// const getAspectRatio = (media: CloudinaryMedia | AWSMedia) => {
//   if (media.width === media.height) {
//     return "w_600,h_600,c_fill,g_auto";
//   } else {
//     return "w_600,h_314,c_fill,g_auto";
//   }
// };

export const getSEOImg = (media: (CloudinaryMedia | AWSMedia)[]) => {
  if (media.length > 0) {
    const med = media[0];

    if (med.width === med.height) {
      return getURLToFetch(med, 600, 600);
    } else {
      return getURLToFetch(med, 600, 314);
    }

    // if (isAWSMedia(med)) {
    //   if (med.resource_type === "image") {
    //     return `${cloudinaryBaseURL}/${
    //       med.resource_type
    //     }/upload/${getAspectRatio(med)}/${med.path}`;
    //   } else {
    //     return `${cloudinaryBaseURL}/${
    //       med.resource_type
    //     }/upload/w_600,h_314,c_fill/${med.path.split(".")[0]}.jpg`;
    //   }
    // } else if (!isAWSMedia(med)) {
    //   if (med.resource_type === "image") {
    //     return `${cloudinaryBaseURL}/${
    //       med.resource_type
    //     }/upload/${getAspectRatio(med)}/${med.path}`;
    //   } else {
    //     return `${cloudinaryBaseURL}/${
    //       med.resource_type
    //     }/upload/w_600,h_314,c_fill/${med.path.split(".")[0]}.jpg`;
    //   }
    // }
  }

  return "";
};

export const getIconImg = (media: CloudinaryMedia | AWSMedia) => {
  return getURLToFetch(media, 50, 50);

  // if (media.resource_type === "image") {
  //   return `${cloudinaryBaseURL}/${media.resource_type}/upload/w_50,h_50,c_fill,g_auto/${media.path}`;
  // } else {
  //   return `${cloudinaryBaseURL}/${
  //     media.resource_type
  //   }/upload/w_50,h_50,c_fill/${media.path.split(".")[0]}.jpg`;
  // }

  // return "";
};
