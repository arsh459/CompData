import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export type badgeTypes =
  | "rank_1"
  | "rank_2"
  | "rank_3"
  | "monthly_rank_1"
  | "monthly_rank_2"
  | "monthly_rank_3"
  | "tier_1"
  | "tier_2"
  | "monthly_tier_1"
  | "monthly_tier_2"
  | "team_rank_1"
  | "team_rank_24"
  | "team_rank_10"
  | "monthly_team_rank_1"
  | "monthly_team_rank_24"
  | "monthly_team_rank_10"
  | "coach"
  | "monthly_coach"
  | "all_levels"
  | "level_1"
  | "level_2"
  | "level_3"
  | "level_4"
  | "level_5"
  | "spotlight"
  | "goal_complete"
  | "rookie"
  | "independent"
  | "relative"
  | "shield"
  | "shield_gold"
  | "shield_silver"
  | "shield_bronze";

export type frequencyTypes = "daily" | "weekly" | "monthly" | "anytime";

export interface Badge {
  id: string;
  description: string;
  badgeId: badgeTypes;

  prizes: SBPrize[];

  rankStart?: number;
  rankEnd?: number;
  name: string;

  frequency: frequencyTypes;
  priority: number;

  pinned: boolean;

  rounds?: string[];
  baseValue?: number; // base value for badge
  athleteImage?: AWSMedia | CloudinaryMedia;

  brandImage?: AWSMedia | CloudinaryMedia;
  hallOfFamePriority?: number;
  merchendiseValue?: number;

  // current winner (dynamic)
  winner?: {
    uid: string;
    winnerName: string;
    points: number;
    image?: CloudinaryMedia | AWSMedia;
  };

  tags?: string[];

  workoutLevels?: WorkoutLevel[];

  // TO ADD
  tierMap?: { [dayString: string]: number }; // day tiers // day 0 -> tier 0
  nextBadgeId?: string; // if coach is not fixed
  myNextBadgeId?: string; // if coach is fixed

  // to use for badges that everyone follows together
  live?: boolean;
  startLive?: number;
  // to use for badges that everyone follows together
  // TO ADD

  // badge creator
  creatorIds?: string[];
  primaryCoach?: string;

  tierCutoff?: number;

  // course data
  slug?: string;

  bootcampIds?: string[];

  liveBadge?: boolean;
  startDate?: number;
}

export type nutritionFactKeyType =
  | "protein"
  | "carbs"
  | "fats"
  | "fiber"
  | "kcal";

export type badgeNutritionParams = Record<nutritionFactKeyType, number>;

export interface WorkoutLevelWithoutNutrition {
  day: number;
  nbWorkouts: number;
  nbFitpoints: number;
}

export interface WorkoutLevel extends WorkoutLevelWithoutNutrition {
  nutrition?: badgeNutritionParams;
}

export interface WorkoutLevelProgress extends WorkoutLevel {
  nbWorkoutsDone: number;
  nbFPEarnt: number;
}

// sbEvents/{eventID}/badges/{badgeId}/badgeProgress/{uid}
export interface BadgeProgress {
  uid: string;
  currentDay: number;
  progress: WorkoutLevelProgress[];

  // currentTier?: number;
  startUnix?: number; // time user has started doing the badge
}

// prizes/
export interface BadgeAward extends Badge {
  id: string;
  state: "CLAIMED" | "WON";
  createdOn: number;

  // performance stats
  fitPoints?: number;
  nbParticipants?: number;
  rank?: number;

  // team information
  teamId: string;
  teamName?: string;

  // game stats
  gameId: string;
  roundId: string;
  sprintId: string;
}

export interface SBPrize {
  media: CloudinaryMedia | AWSMedia;
  brand: string;
  name: string;
  description: string;
  level?: number;
}
