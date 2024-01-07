// import { PlanType } from "@constants/teams/plans";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { PlanTypes } from "@models/SbPlans/interface";
import { dayTypes } from "@models/slots/Slot";
// import { FAQDATA } from "@templates/joinBoatTemplate/utils";

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
  | "shield_bronze"
  | "beginner"
  | "advance"
  | "intermediate"
  | "agility"
  | "strength_female"
  | "strength_male"
  | "boxing_style"
  | "pecfest_olympics";

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
  // drop parameters

  rounds?: string[];

  baseValue?: number; // base value for badge
  athleteImage?: AWSMedia | CloudinaryMedia;
  courseDecorImage?: AWSMedia | CloudinaryMedia;
  marketingImage?: AWSMedia | CloudinaryMedia;

  brandImage?: AWSMedia | CloudinaryMedia;
  hallOfFamePriority?: number;
  merchendiseValue?: number;

  playersWon?: number;

  // current winner (dynamic)
  winner?: {
    uid: string;
    winnerName: string;
    points: number;
    image?: CloudinaryMedia | AWSMedia;
  };

  tags?: string[];

  workoutLevels?: WorkoutLevel[];
  marketImage?: AWSMedia | CloudinaryMedia;
  isTeamBadge?: boolean;

  unlockFP?: number;
  nbWorkouts?: number; // for workouts counted in badge
  bgImageMale?: AWSMedia | CloudinaryMedia;
  bgImageFemale?: AWSMedia | CloudinaryMedia;
  badgeImage?: AWSMedia | CloudinaryMedia;

  // ui
  sprints?: string[];
  textColor?: string;
  subTextColor?: string;
  bgLinearColors?: string[];
  bgLinearColors2?: string[];

  // badge creator
  creatorIds?: string[];
  primaryCoach?: string;

  // course data
  slug?: string;

  equipmentNeeded?: string[];
  dos?: string[];
  donts?: string[];
  courseGoal?: string;
  weTeach?: TextAndImgType[];
  badgeBGImage?: CloudinaryMedia | AWSMedia;
  planFP?: number;
  difficulty?: DifficultyTypes;
  constraints?: TextAndImgType[];

  tier?: number;
  headingIcon?: CloudinaryMedia | AWSMedia;
  textIcon?: CloudinaryMedia | AWSMedia;
  text?: string;
  youExpect?: TextAndImgType[];
  slotBooked?: number;

  liveBadge?: boolean;
  totalSlots?: number;

  planType?: PlanTypes;

  schedule?: badgeSchedule;
  met?: number;
}

export type badgeSchedule = Partial<Record<dayTypes, string>>; // hh:mm a
export interface CourseReview {
  name: string;
  text: string;
  id: string;
}

export type TextAndImgType = {
  icon: CloudinaryMedia | AWSMedia | undefined;
  text: string;
};

export type DifficultyTypes = "Beginner" | "Intermediate" | "Advance";

export interface WorkoutLevel {
  day: number;
  nbWorkouts: number;
  nbFitpoints: number;
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
