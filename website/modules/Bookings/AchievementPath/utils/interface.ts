import { transformationIconTypes } from "@models/User/User";

export type AchievementPathDataItemTypes =
  | transformationIconTypes
  | "customised_plan"
  | "sleep";

export type AchievementPathDataItemStatusType = "DONE" | "PENDING";
export type goalActionType = "increase" | "reduce" | "equate" | "maintain";
export const goalActionTypesArray: goalActionType[] = [
  "increase",
  "reduce",
  "equate",
  "maintain",
];

export type roadmapComparisons = "<=" | ">=";

export interface AchievementPathDataItem {
  icon: string;
  text: string;
  type?: AchievementPathDataItemTypes;

  target?: number; // finalValue 65Kg
  comparisonType?: goalActionType;

  status?: AchievementPathDataItemStatusType;
  countNeeded?: number;
}

export interface TitleInterface {
  icon?: string;
  text: string;

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
