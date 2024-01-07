import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export interface LevelInterface {
  id: string;
  lvlNumber: number;
  title: string;
  description: string;
  howToAchieve: string;
  earnedImg: AWSMedia | CloudinaryMedia;
  lockedImg: AWSMedia | CloudinaryMedia;
  minFP: number;
  maxFP: number;
  levelSize?: number; // some levels can have only finite members
  textColor?: string;
}
