export interface dailyMoodObj {
  date: string;
  id: string;
  unix: number;
  mood?: number;
}
export interface dailyWeightObj {
  date: string;
  id: string;
  unix: number;
  weight?: number;
}

export type energyLevels = 1 | 2 | 3;
export type moodLevels = 1 | 2 | 3 | 4 | 5;
export interface dailyEnergyObj {
  date: string;
  id: string;
  unix: number;
  energy?: number;
}

export interface dailySleepObj {
  date: string;
  id: string;
  unix: number;
  sleepHours?: number;
}

export type ProgressCollectionType =
  | "dailyMood"
  | "dailyEnergy"
  | "dailyWeight";

export const energyStringLiterals: Record<energyLevels, string> = {
  1: "Low",
  2: "Moderate",
  3: "Excellent",
};

export const moodStringLiterals: Record<moodLevels, string> = {
  1: "Sad",
  2: "Bit Low",
  3: "Meh",
  4: "Good",
  5: "Great",
};
