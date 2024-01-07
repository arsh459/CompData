import { linkType } from "./SocialMediaHeaderV1";

export const getLink = (linkText: string | undefined, linkType: linkType) => {
  if (!linkText) {
    return undefined;
  }

  if (linkText.includes("https://")) {
    return linkText;
  } else {
    if (linkType === "instagram") {
      return `https://instagram.com/${linkText}`;
    } else if (linkType === "facebook") {
      return `https://www.facebook.com/${linkText}`;
    } else if (linkType === "youtube") {
      return `https://www.youtube.com/c/${linkText}`;
    } else if (linkType === "linkedIn") {
      return `https://www.linkedin.com/in/${linkText}`;
    } else if (linkType === "website") {
      return linkText;
    }
  }

  return linkText;
};
