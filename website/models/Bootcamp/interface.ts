import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface Bootcamp {
  id: string;
  name: string;
  mainMedia?: AWSMedia | CloudinaryMedia;
  landingMedia?: AWSMedia | CloudinaryMedia;

  creatorId: string;
  length: number;
  start: number;
  includes: bootcampInclusion[];

  // to alot requisite details
  badgeId: string;
  nutritionBadgeId: string;
}

export interface bootcampInclusion {
  text: string;
  img?: AWSMedia | CloudinaryMedia;
  type?: inclusionType;
  link?: string;
  icon?: iconType;
  linkText: string;
}

export type iconType = "workout" | "diet" | "consult" | "live" | "dietConsult";
export type inclusionType = "workout" | "diet" | "whatsApp" | "externalLink";

export const iconList: iconType[] = [
  "consult",
  "diet",
  "live",
  "workout",
  "dietConsult",
];
export const inclusionTypes: inclusionType[] = [
  "diet",
  "whatsApp",
  "workout",
  "externalLink",
];
