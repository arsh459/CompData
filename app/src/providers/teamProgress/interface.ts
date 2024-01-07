import { CoachRank, UserRank } from "@models/Activity/Activity";

export interface TeamProgressInterface {
  userRanks: UserRank[];
  coachRank?: CoachRank;
}

export interface TeamContextProps {
  children: React.ReactNode;
  captainId?: string;
}
