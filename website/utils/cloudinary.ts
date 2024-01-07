export const getCloudinaryURLWithParams = (
  url: string,
  width?: number,
  height?: number,
  cropFit?: string,
  fetchFormat?: string,
  qualityFormat?: string,
  gravityFormat?: string,
  aspectRatio?: string,
  imgScaling?: string
) => {
  let returnURL = cloudinary_url;
  if (width) {
    returnURL += `w_${Math.round(width)},`;
  }
  if (aspectRatio) {
    returnURL += `ar_${aspectRatio},`;
  }
  if (!aspectRatio && height) {
    returnURL += `h_${Math.round(height)},`;
  }
  if (cropFit) {
    returnURL += `${cropFit},`;
  }
  if (fetchFormat) {
    returnURL += `${fetchFormat},`;
  }
  if (qualityFormat) {
    returnURL += `${qualityFormat},`;
  }
  if (gravityFormat) {
    returnURL += `${gravityFormat},`;
  }
  const lastElement = returnURL[returnURL.length - 1];
  if (lastElement === ",") {
    return (
      returnURL.substring(0, returnURL.length - 1) +
      "/" +
      encodeURIComponent(url)
    );
  } else {
    return returnURL + encodeURIComponent(url);
  }
};

export const cloud_name = "htt-holidaying-travel-technologies";
export const cloudinary_url = `https://res.cloudinary.com/${cloud_name}/image/fetch/`;
