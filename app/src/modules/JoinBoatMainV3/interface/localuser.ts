import { BodyTypesId } from "@constants/Avatar/utils";
import {
  cycleLengthTyps,
  diagnosedPeriodType,
  difficulty,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  periodTrackerObjectInterface,
  workoutFrequencyTypes,
} from "@models/User/User";

export interface LocalUser {
  uid?: string;
  name?: string;
  gender?: genderType;
  fitnessGoal?: fitnessGoalTypes[];
  diagnosedPeriod?: diagnosedPeriodType;
  age?: number;
  height?: number;
  weight?: number;
  desiredWeight?: number;
  cycleLength?: cycleLengthTyps;
  pcosSymptoms?: pcosSymptoms[];
  workoutFrequency?: workoutFrequencyTypes;
  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;
  difficulty?: difficulty;
  paceOfAchievementInMonth?: number;
  badgeId?: string;
  phone?: string;
  dailyFPTarget?: number;
  onboarded?: boolean;
  periodTrackerObj?: periodTrackerObjectInterface;
  sleepQuality?: number;
}

export type numberFieldKeyType =
  | "age"
  | "height"
  | "weight"
  | "desiredWeight"
  | "cycleLengthAverage"
  | "lastPeriodLength"
  | "sleepQuality";
