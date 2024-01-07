export type streakLevels = 7 | 14 | 21 | 28 | 35 | 42 | 49 | 56 | 63 | 70;
export type streakLabel = "hit" | "miss" | "freeze" | "active" | "activeHit";
export type streakNotification = "hit" | "miss" | "freeze";
export type streakStatusType = "active" | "inactive";
export interface streakMapInterface {
  [date: string]: streakLabel;
}

export interface PendingNotification {
  type: streakNotification;
  maxUnixToShow: number;
}

export interface StreakDataInterface {
  id: string;
  startedOn: number;
  activeTill: number;
  updatedOn: number;
  targetDays: streakLevels;
  days: number;
  streakMap: streakMapInterface;
  pendingNotification?: PendingNotification;
  streakStatus?: streakStatusType;
  targetFp: number;
  userTimeZone?: string;
  streakMonths?: string[];
  pendingActiveHitView?: boolean;
}
