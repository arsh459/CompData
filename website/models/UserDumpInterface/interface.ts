import { genderType } from "@models/User/User";
import { difficulty } from "@templates/joinBoatTemplate/V5/Components/SetPace";

export interface UserDumpInterface {
  uid: string;
  phone: string;
  email: string;
  name: string;
  signedUpTime: string;
  signedInTime: string;
  fpCredit: number;
  fpDebit: number;
  height: number;
  weight: number;
  gender: genderType;
  level: number;
  paceOfAchievementInMonth: number;
  desiredWeight: number;
  fitnessGoal: string;
  fitnessConcerns: string;
  repsCount: number;
  difficulty: difficulty | "";
  hasTeam: boolean;
  games: string;
  dailyFPTarget: number;
  dailyStepTarget?: number;
  dailyKCalTarget?: number;
  badgeId: string;
  currentBodyType: string;
  desiredBodyType: string;
}

export interface PaidDumpInterface {
  uid: string;
  freeTrialEndsOn: string;
  paidPeriodEndsOn: string;
}
