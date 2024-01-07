import { transformationIconTypes } from "../../utils";

export type AchievementPathDataItemTypes =
  | transformationIconTypes
  | "customised_plan"
  | "sleep"
  | "dietStreak";

export type AchievementPathDataItemStatusType = "DONE" | "PENDING";
export type goalActionType = "increase" | "reduce" | "equate" | "maintain";

export interface AchievementPathDataItem {
  icon: string; // icon
  text: string; // lose 4 kgs
  type?: AchievementPathDataItemTypes;

  // in addBadgeFunc
  target?: number; // finalValue 65Kg
  comparisonType?: goalActionType;

  // delta: number; // delta to achieve
  // backend
  status?: AchievementPathDataItemStatusType;
  countNeeded?: number;
}

export interface TitleInterface {
  icon?: string; // icon
  text: string; // lose 4 kgs

  status?: AchievementPathDataItemStatusType;
}

export interface TimelineInterface extends TitleInterface {
  align?: "start" | "end";
}

export interface AchievementPathData {
  id?: string;
  startTime?: number;
  endTime?: number;
  items?: AchievementPathDataItem[];
  title?: TitleInterface;

  timeline?: TimelineInterface;
}
