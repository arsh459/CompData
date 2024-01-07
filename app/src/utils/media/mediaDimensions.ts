import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export const getHeight = (media: CloudinaryMedia | AWSMedia, width: number) => {
  if (media.height && media.width) {
    return Math.round((media.height * width) / media.width);
  }

  return width;
};

export const getWidth = (media: CloudinaryMedia | AWSMedia, height: number) => {
  if (media.height && media.width) {
    return Math.round((media.width * height) / media.height);
  }

  return height;
};

export const getWidthHeightMedia = (
  screenWidth: number,
  screenHeight: number,

  media?: CloudinaryMedia | AWSMedia,
  orientation?: "landscape" | "portrait"
) => {
  if (media && orientation === "landscape") {
    return {
      width: getWidth(media, screenHeight),
      height: screenHeight,
    };
  } else if (media) {
    return {
      width: screenWidth,
      height: getHeight(media, screenWidth),
    };
  }

  return {
    width: screenWidth,
    height: screenHeight,
  };
};
