import {
  accurateGoal,
  dailyHealthIssues,
  howBusy,
  pastUsedMethod,
} from "@models/User/User";

export interface LocalUser {
  uid?: string;
  name?: string;
  email?: string;
  age?: number;
  weight?: number;
  height?: number;
  phone?: string;
  onboarded?: boolean;
  accurateGoal?: accurateGoal;

  isOkWithPaidPlan?: boolean;
  pastUsedMethod?: pastUsedMethod;
  howBusy?: howBusy;
  dailyHealthIssues?: dailyHealthIssues;
}

export type numberFieldKeyType =
  | "age"
  | "height"
  | "weight"
  | "desiredWeight"
  | "cycleLengthAverage"
  | "lastPeriodLength"
  | "sleepQulity";
