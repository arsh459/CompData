import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { AchievementPathDataItemTypes } from "@modules/Bookings/AchievementPath/utils/interface";
import { format } from "date-fns";

export type badgeGroups = "weeklyProgress" | "NA";
export const badgeGroupsList: badgeGroups[] = ["weeklyProgress", "NA"];

export interface Award {
  id: string;
  // badgeId?: string;
  name?: string;
  img?: AWSMedia | CloudinaryMedia;
  lockedImg?: AWSMedia | CloudinaryMedia;
  description?: string;
  themeColor?: string;
  tierLower?: number;
  tierUpper?: number;
  groupId?: badgeGroups;
  previewBadge?: boolean;
  type?: AchievementPathDataItemTypes;

  // how to achieve this badge
  howToAchieve?: string[];
}

export type awardStatus = "WON" | "TARGET" | "EXPIRED";
export const awardStatusList: awardStatus[] = ["WON", "TARGET", "EXPIRED"];

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
  containsReport?: boolean; // This flag show weather it contains below data or not
  startTime?: number;
  endTime?: number;
  // workoutRegularity?: number;
  // dietRegularity?: number;
  // stepsRegularity?: number;
  // weightChange?: number;
  // moodChange?: number;

  // moodAverage?: number;
  // energyAverage?: number;
  // energyChange?: number;

  progress?: achieverProgress; // for streak kind goals
  steps?: number;
  stepSize?: number;
  totalCount?: number;
  mainLabel?: string;

  // for timeline
  unlockOn?: number;
  targetMonth?: number;
  priority?: number;
  awardStatus?: awardStatus;

  // backend
  title?: string;
  subtitle?: string;
}

export const targetMonthFormat = (unix: number): string => {
  return format(unix, "MMM yy"); // Ex: 1685618246465 -> "Jun 23"
};
