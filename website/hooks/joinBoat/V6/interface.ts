import { BodyTypesId } from "@constants/Avatar/utils";
import {
  cycleLengthTyps,
  diagnosedPeriodType,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  periodTrackerObjectInterface,
  workoutFrequencyTypes,
  workoutStyleTypes,
} from "@models/User/User";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";

export interface LocalUser {
  uid?: string;
  name?: string;
  gender?: genderType;
  fitnessGoal?: fitnessGoalTypes[];
  diagnosedPeriod?: diagnosedPeriodType;
  age?: number;
  email?: string;
  height?: number;
  weight?: number;
  desiredWeight?: number;
  cycleLength?: cycleLengthTyps;
  pcosSymptoms?: pcosSymptoms[];
  workoutFrequency?: workoutFrequencyTypes;
  workoutStyle?: workoutStyleTypes;
  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;
  difficulty?: difficulty;
  paceOfAchievementInMonth?: number;
  badgeId?: string;
  phone?: string;
  dailyFPTarget?: number;
  onboarded?: boolean;
  periodTrackerObj?: periodTrackerObjectInterface;
  sleepQulity?: number;
}

export type numberFieldKeyType =
  | "age"
  | "height"
  | "weight"
  | "desiredWeight"
  | "cycleLengthAverage"
  | "lastPeriodLength"
  | "sleepQulity";
