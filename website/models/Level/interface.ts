import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface LevelInterface {
  id: string;
  lvlNumber: number;
  title: string;
  description: string;
  howToAchieve?: string;
  earnedImg?: AWSMedia | CloudinaryMedia;
  lockedImg?: AWSMedia | CloudinaryMedia;

  // levelSize?: number; // some levels can have only finite members
  textColor?: string;

  promotionCutoff: number;
  maintainCutoff?: number;

  minFP?: number;
  maxFP?: number;
}
