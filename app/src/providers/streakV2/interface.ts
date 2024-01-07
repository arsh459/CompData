export type streakLevelsTypes = 7 | 14 | 21 | 28 | 35 | 42 | 49 | 56 | 63 | 70;
export type streakLabel = "hit" | "miss" | "freeze" | "active" | "activeHit";
export type streakNotification = "hit" | "miss" | "freeze";
export type streakStatusType = "active" | "inactive";
export type powerUpStatusType = "available" | "used" | "expired";
// dec check today fp then
// activeHit -> hit
// active -> miss
export interface streakMapInterface {
  [date: string]: streakLabel;
}

export interface StartStreakParams {
  screenSkips?: number;
}

export interface PendingNotification {
  type: streakNotification;
  maxUnixToShow: number;
}


export type dayStatusType =
  | "isDayBtwStreak"
  | "isStreakStartDay"
  | "isFreeze"
  | "isTargetDay"
  | "active"
  | "activeHit"
  | "miss";
export type PowerUpVariantsType = "freeze";
export interface StreakMonthDayInterface {
  [key: string]: dayStatusType;
}
export interface PowerUpType {
  id: string;
  purchasedOn: number;
  status: powerUpStatusType;
  fpSpent: number;
  type: PowerUpVariantsType;
  usedOn?: number;
}
