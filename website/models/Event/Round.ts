import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface ListItemContent {
  image?: AWSMedia | CloudinaryMedia;
  text?: string;
}

// form path -> sbEvents/gameId/rounds/{roundId}
export type challengeTaskType =
  | "dailyReward"
  | "assignedWorkout"
  | "assignedDiet"
  | "additionalBadgeIds";
export interface BenefitInterface {
  img: AWSMedia | CloudinaryMedia;
  text: string;
}
export interface RoundInterface {
  id: string;
  start: number;
  end: number;
  name: string;
  description: string;
  img?: AWSMedia | CloudinaryMedia;
  benefits?: BenefitInterface[];
  awardIds?: string[]; // fetch from awards collection
  steps?: BenefitInterface[];
  shortDescription?: string;
  challengeImg?: AWSMedia | CloudinaryMedia;
  additionalBadgeIds?: string[]; //workout and nutrition from userInterface
  taskOrder: challengeTaskType[];
  roundKey: string;
  reelMedia?: AWSMedia | CloudinaryMedia;
  reelThumbnail?: AWSMedia | CloudinaryMedia;
  playbackId?: string;
  fpTarget: number;

  fpStrategy?: fpStrategy;

  dailyFPQuota?: fpObjInterface;
}

export type fpStrategy = "totalFP" | "periodFP";
export interface fpObjInterface {
  [date: string]: number;
}
