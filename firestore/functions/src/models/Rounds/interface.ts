import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

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

  roundKey: string;

  additionalBadgeIds?: string[]; //workout and nutrition from userInterface
  taskOrder: challengeTaskType[];
  fpStrategy?: fpStrategy;

  dailyFPQuota?: fpObjInterface;
}

export type fpStrategy = "totalFP" | "periodFP";
//fetch  current month round using where start <= todayUnix && where end > todayUnix
//in userInterface challengeJoined:number
//user?.challengeJoined ? progress >==100 ?"view results"&&show progress : "start challenge" :"join Challenge" && hide progress

//Progress for workout and nutrition use Homescreen My Plan

export type challengeTaskType =
  | "dailyReward"
  | "assignedWorkout"
  | "assignedDiet"
  | "additionalBadgeIds";

// tasks
// all workout tasks -> user.badgeId
// all diet tasks -> user.nutritionBadgeId
// dailyReward
// specialListOfTasks

// dailyRewards/dailyRewardId
export interface dailyRewardConfiguration {
  id: string;
  ptsArray: [
    {
      day: number; // 0, 1, 2
      fp: number;
    },
  ];
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

// events/sbEventId/levels/levelId/regions/regionId/userRanks/rank
// events/sbEventId/levels/levelId/userRanks/rank
export interface fpObjInterface {
  [date: string]: number;
}

export interface UserRankV2 {
  uid: string;
  fp: number;
  // totalFP: number;
  rank: number;

  // update with cloud function
  name: string;
  tz: string;
  lvl: number;
  img?: AWSMedia | CloudinaryMedia;
  lvlBreakUp?: number;

  fpObj?: fpObjInterface;

  // lvlBreakDown?: number;
}
