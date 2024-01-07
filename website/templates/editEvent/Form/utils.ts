import { formLabelValues } from "@components/drawers/constants";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import { BreadCrumpProps } from "./BreadCrumps/BreadCrump";

export const isProfileLive = (user: UserInterface) => {
  if (
    user.name &&
    // user.bio &&
    user.userKey
    // user.profileImage &&
    // user.coverCloudinary &&
    // user.coverCloudinary.length > 0
  ) {
    return true;
  }

  return false;
};

export const isEventLive = (
  name: string,
  description: string,
  cost: number,
  media: (CloudinaryMedia | AWSMedia)[],
  joinURL: string,
  eventKey: string | undefined
) => {
  if (
    name &&
    eventKey
    // description &&
    // typeof cost === "number" &&
    // media.length > 0 &&
    // joinURL
  ) {
    return true;
  }

  return false;
};

export const getNavLevel = (
  currentVisible: formLabelValues
): BreadCrumpProps | undefined => {
  const crumpHeading = getCrumpHeading(currentVisible);

  if (crumpHeading)
    return {
      heading: crumpHeading,
      next: false,
      onClick: () => {},
    };
};

export const getCrumpHeading = (currentVisible: formLabelValues) => {
  return currentVisible === "name"
    ? "Edit name"
    : currentVisible === "eventType"
    ? "Type of program"
    : currentVisible === "cost"
    ? "Edit cost"
    : currentVisible === "media"
    ? "Edit media"
    : currentVisible === "description"
    ? "Description"
    : currentVisible === "joinURL"
    ? "Join URL"
    : currentVisible === "your-name"
    ? "Your name"
    : currentVisible === "about-me"
    ? "About you"
    : currentVisible === "cover-video"
    ? "Cover Video"
    : currentVisible === "profile-img"
    ? "Profile image"
    : currentVisible === "your-handle"
    ? "Your handle"
    : currentVisible === "social-media-links"
    ? "Social media"
    : currentVisible === "whoIsItFor"
    ? "Target audience"
    : currentVisible === "courseGoal"
    ? "Course Goal"
    : currentVisible === "programDetails"
    ? "Prizes / Rewards"
    : currentVisible === "faq"
    ? "FAQ"
    : currentVisible === "eventKey"
    ? "Add URL"
    : currentVisible === "cohorts"
    ? "Cohorts"
    : currentVisible === "cohortSize"
    ? "Cohort size"
    : currentVisible === "cohortStarts"
    ? "Cohort starts"
    : currentVisible === "registerBy"
    ? "Deadline"
    : currentVisible === "googleTitle"
    ? "SEO Heading"
    : currentVisible === "googleDescription"
    ? "SEO Description"
    : currentVisible === "googleSEOImg"
    ? "SEO Image"
    : currentVisible === "favIconImg"
    ? "Fav Icon"
    : currentVisible === "program"
    ? "Add Program"
    : currentVisible === "cohortJoinURL"
    ? "Join URL"
    : "";
};
