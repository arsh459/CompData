import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  //   getAspectRatio,
  getAspectRatioWithNumber,
} from "@templates/community/Program/getAspectRatio";

export const getRoundedString = (
  mediaLength: number,
  index: number,
  rounded?: "none"
) => {
  if (rounded === "none") {
    return "";
  }
  return mediaLength > 3 && index === 0
    ? "rounded-tl-lg rounded-bl-lg"
    : mediaLength > 3 && index === 2
    ? "rounded-tr-lg"
    : mediaLength > 3 && index === 3
    ? "rounded-br-lg"
    : mediaLength === 1
    ? "rounded-lg"
    : mediaLength === 2 && index === 0
    ? "rounded-l-lg"
    : mediaLength === 2 && index === 1
    ? "rounded-r-lg"
    : mediaLength === 3 && index === 0
    ? "rounded-l-lg"
    : mediaLength === 3 && index === 2
    ? "rounded-r-lg"
    : "";
};

export const getAspectRatioForGrid = (
  media: (CloudinaryMedia | AWSMedia)[]
) => {
  if (media.length > 0) {
    return getAspectRatioWithNumber(media[0]);
  }

  return { arString: "aspect-w-1 aspect-h-1", arNumeric: 1, ar: 1 };
};

export const getGridColumns = (mediaLength: number, imgAr: number) => {
  if (imgAr > 3 / 2 && mediaLength >= 5) {
    return mediaLength === 1
      ? "grid-cols-1"
      : mediaLength === 2
      ? "grid-cols-2"
      : mediaLength === 3
      ? "grid-cols-3"
      : mediaLength === 4
      ? "grid-cols-5 grid-rows-2"
      : mediaLength > 4
      ? "grid-cols-4 grid-rows-2"
      : "";
  } else {
    return mediaLength === 1
      ? "grid-cols-1"
      : mediaLength === 2
      ? "grid-cols-2"
      : mediaLength === 3
      ? "grid-cols-3"
      : mediaLength === 4
      ? "grid-cols-5 grid-rows-2"
      : mediaLength > 4
      ? "grid-cols-7 grid-rows-2"
      : "";
  }
};

export const getSpanForElement = (
  totalLength: number,
  index: number,
  arNumeric: number
) => {
  if (arNumeric > 1.5 && totalLength >= 5) {
    if (totalLength >= 5) {
      if (index === 0) {
        return "row-span-2 col-span-2";
      } else {
        return "row-span-1 col-span-1";
      }
    } else if (totalLength <= 3) {
      return "row-span-1 col-span-1";
    } else if (totalLength === 4) {
      if (index <= 2) {
        return "row-span-2 col-span-2";
      } else return "row-span-1 col-span-1";
    }
  } else {
    if (totalLength >= 5) {
      if (index <= 1) {
        return "row-span-2 col-span-2";
      } else if (index === 2) {
        return "row-span-2 col-span-1";
      } else if (index === 4) {
        return "row-span-2 col-span-2";
      }
    } else if (totalLength <= 3) {
      return "row-span-1 col-span-1";
    } else if (totalLength === 4) {
      if (index <= 1) {
        return "row-span-2 col-span-2";
      } else if (index === 2) {
        return "row-span-2 col-span-1";
      } else if (index === 3) {
        return "row-span-2 col-span-1";
      }
    }
  }
};
