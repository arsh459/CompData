import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export const getHeight = (media: CloudinaryMedia | AWSMedia, width: number) => {
  if (media.height && media.width) {
    return Math.round((media.height * width) / media.width);
  }

  return width;
};

export const getAspectRatioWithNumber = (media: CloudinaryMedia | AWSMedia) => {
  if (!media.height || !media.width) {
    return { arString: "aspect-w-1 aspect-h-1", arNumeric: 1, ar: 1 };
  }

  const ar = media.width / media.height;
  // console.log("ar", ar);

  if (ar <= 0.5) {
    return { arString: `aspect-w-7 aspect-h-16`, arNumeric: 7 / 16, ar };
  }

  if (ar > 0.5 && ar <= 0.57) {
    return { arString: `aspect-w-9 aspect-h-16`, arNumeric: 9 / 16, ar };
  }

  if (ar > 0.57 && ar <= 0.65) {
    return { arString: `aspect-w-3 aspect-h-5`, arNumeric: 3 / 5, ar };
  }

  if (ar > 0.65 && ar <= 0.8) {
    return { arString: `aspect-w-3 aspect-h-4`, arNumeric: 3 / 4, ar };
  }

  if (ar > 0.8 && ar <= 1.2) {
    return { arString: `aspect-w-1 aspect-h-1`, arNumeric: 1, ar };
  }

  if (ar > 1.2 && ar <= 1.49) {
    return { arString: `aspect-w-4 aspect-h-3`, arNumeric: 4 / 3, ar };
  }

  if (ar > 1.49 && ar <= 1.6) {
    return { arString: `aspect-w-3 aspect-h-2`, arNumeric: 3 / 2, ar };
  }

  if (ar > 1.6 && ar <= 2) {
    return { arString: `aspect-w-16 aspect-h-9`, arNumeric: 16 / 9, ar };
  }

  if (ar > 2) {
    return { arString: `aspect-w-16 aspect-h-7`, arNumeric: 16 / 7, ar };
  }

  return { arString: "aspect-w-1 aspect-h-1", arNumeric: 1, ar };
};

export const getAspectRatio = (media: CloudinaryMedia) => {
  const ar = media.width / media.height;

  // console.log("ar", ar);

  if (ar === 1) {
    return `aspect-w-1 aspect-h-1`;
  }

  if (ar >= 0.55 && ar <= 0.57) {
    return `aspect-w-9 aspect-h-16`;
  }

  if (ar >= 0.59 && ar <= 0.61) {
    return `aspect-w-3 aspect-h-5`;
  }

  if (ar >= 0.74 && ar <= 0.76) {
    return `aspect-w-3 aspect-h-4`;
  }

  if (ar >= 1.3 && ar <= 1.4) {
    return `aspect-w-4 aspect-h-3`;
  }

  if (ar >= 1.49 && ar <= 1.52) {
    return `aspect-w-3 aspect-h-2`;
  }

  if (ar >= 1.7 && ar <= 1.82) {
    return `aspect-w-16 aspect-h-9`;
  }

  return "aspect-w-1 aspect-h-1";
};

export const getAspectRatioV2 = (media: CloudinaryMedia) => {
  const ar = media.width / media.height;

  if (ar <= 0.5) {
    return `aspect-w-7 aspect-h-16`;
  }

  if (ar > 0.5 && ar <= 0.57) {
    return `aspect-w-9 aspect-h-16`;
  }

  if (ar > 0.57 && ar <= 0.65) {
    return `aspect-w-3 aspect-h-5`;
  }

  if (ar > 0.65 && ar <= 0.8) {
    return `aspect-w-3 aspect-h-4`;
  }

  if (ar > 0.8 && ar <= 1.2) {
    return `aspect-w-1 aspect-h-1`;
  }

  if (ar > 1.2 && ar <= 1.49) {
    return `aspect-w-4 aspect-h-3`;
  }

  if (ar > 1.49 && ar <= 1.6) {
    return `aspect-w-3 aspect-h-2`;
  }

  if (ar > 1.6 && ar <= 2) {
    return `aspect-w-16 aspect-h-9`;
  }

  if (ar > 2) {
    return `aspect-w-16 aspect-h-7`;
  }

  return "aspect-w-1 aspect-h-1";
};
