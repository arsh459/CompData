import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

// sbEvents/eventId/rounds/roundId
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

  dailyFPQuota?: fpObjInterface;
}

//fetch  current month round using where start <= todayUnix && where end > todayUnix
//in userInterface challengeJoined:number
//user?.challengeJoined ? progress >==100 ?"view results"&&show progress : "start challenge" :"join Challenge" && hide progress

//Progress for workout and nutrition use Homescreen My Plan

export type challengeTaskType =
  | "dailyReward"
  | "assignedWorkout"
  | "assignedDiet"
  | "referFriend"
  | "dailySteps"
  | "additionalBadgeIds";

// tasks
// all workout tasks -> user.badgeId
// all diet tasks -> user.nutritionBadgeId
// dailyReward
// specialListOfTasks

// dailyRewards/dailyRewardId
export interface pointsArray {
  day: number; // 0, 1, 2
  fp: number;
  tier: number; //1,2,3,4,5
}
export interface dailyRewardConfiguration {
  id: string;
  ptsArray: pointsArray[];
}

// users/uid/dailyRewards/dailyRewardId
export interface dailyReward {
  date: string;
  id: string;
  dailyRewardId: string;
  unix: number;
  day: number; // 0, 1, 2
  fp: number;
}

export interface BenefitInterface {
  img: AWSMedia | CloudinaryMedia;
  text: string;
}

export interface fpObjInterface {
  [date: string]: number;
}

// sbEvents/eventId/userRanksV2/uid
export interface UserRankV2 {
  uid: string;
  fp: number;
  rank: number;

  // update with cloud function
  name: string;
  lvl: number;
  img?: AWSMedia | CloudinaryMedia;
  lvlBreakUp?: number;

  fpObj?: fpObjInterface;
  // lvlBreakDown?: number;
}
