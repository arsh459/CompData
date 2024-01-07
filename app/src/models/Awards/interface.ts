import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import {
  AchievementPathDataItemTypes,
  goalActionType,
} from "@modules/JoinBoatMainV3/components/AchievementPath/utils/interface";
import { RouteKeys } from "@routes/MainStack";
import { format, isToday } from "date-fns";

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
  type?: AchievementPathDataItemTypes;
  comparisonType?: goalActionType;

  howToAchieveNavigation?: RouteKeys;

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
  unlockOn?: number | null;
  targetMonth?: number;
  priority?: number;
  awardStatus?: awardStatus;

  // backend
  title?: string;
  subtitle?: string;
}

export const targetMonthFormat = (unix: number): string => {
  return isToday(unix) ? "Today" : format(unix, "MMM yy"); // Ex: 1685618246465 -> "Jun 23"
};
