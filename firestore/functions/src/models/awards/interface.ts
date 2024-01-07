// import { AchievementPathDataItemTypes, goalActionType } from "../User/User";
// import { goalActionType } from "../User/User";
import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export type badgeGroups = "weeklyProgress" | "NA";

export interface Award {
  id: string;
  // badgeId?: string;
  name?: string;
  img?: AWSMedia | CloudinaryMedia;
  lockedImg?: AWSMedia | CloudinaryMedia;
  description?: string;
  themeColor?: string;
  // tierLower?: number;
  // tierUpper?: number;
  // groupId?: badgeGroups;
  previewBadge?: boolean;

  // dep
  // type?: AchievementPathDataItemTypes;
  // comparisonType?: goalActionType;
  streakLength?: number;

  howToAchieveNavigation?: string;

  // how to achieve this badge
  howToAchieve?: string[];
}

export type awardStatus = "WON" | "TARGET" | "EXPIRED";

export type streakLabel = "MISS" | "PENDING" | "HIT";

export interface achieverProgressItem {
  label: string;
  container: number;
  isBadge?: boolean;
  tickStatus?: streakLabel;
}

export type achieverProgress = Record<number, achieverProgressItem>;

export interface Achiever {
  id: string;
  createdOn: number;
  uid: string;
  awardId: string;

  startTime?: number;
  endTime?: number;

  // containsReport?: boolean; // This flag show weather it contains below data or not
  // workoutRegularity?: number;
  // dietRegularity?: number;
  // stepsRegularity?: number;
  // weightChange?: number;
  // moodChange?: number;

  // moodAverage?: number;
  // energyAverage?: number;
  // energyChange?: number;
  // type?: AchievementPathDataItemTypes;
  // comparisonType?: goalActionType;
  // type?: AchievementPathDataItemTypes;
  // target?: number;
  // countNeeded?: number;
  progress?: achieverProgress; // for streak kind goals
  steps?: number;
  stepSize?: number;
  totalCount?: number;
  mainLabel?: string;

  // for timeline
  unlockOn?: number | null;
  targetMonth?: number;
  priority?: number;
  awardStatus?: awardStatus;

  // title
  title?: string;
  subtitle?: string; // perc value
}
