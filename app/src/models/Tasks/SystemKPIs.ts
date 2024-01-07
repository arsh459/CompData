export type SystemKPIs =
  | "running_pace"
  | "running_distance"
  | "num_characters"
  | "num_words"
  | "num_sentences"
  | "fit_points"
  | "nb_workouts"
  | "user_level"
  | "streak"
  | "game_test";

export const systemKPIList: SystemKPIs[] = [
  "running_pace",
  "running_distance",
  "num_characters",
  "num_sentences",
  "num_words",
  "fit_points",
  "nb_workouts",
  "user_level",
  "streak",
  "game_test",
];

export type iconGoalType =
  | "time"
  | "pace"
  | "distance"
  | "weight"
  | "reps"
  | "characters"
  | "words"
  | "sentencesphy"
  | "fitpoint"
  | "level"
  | "task";

export interface SystemKPIConfig {
  icon: iconGoalType; // set once
  unit: string; // set once
  label: string;
  strategy: goalResolutionStrategy;
}

export type goalResolutionStrategy = "max" | "min" | "avg" | "sum";
export const strategies: goalResolutionStrategy[] = [
  "max",
  "min",
  "avg",
  "sum",
];

export const goalIcons: iconGoalType[] = [
  "distance",
  "time",
  "reps",
  "weight",
  "pace",
];

export type KPIConfigType = Partial<Record<SystemKPIs, SystemKPIConfig>>;

export const KPIConfig: KPIConfigType = {
  running_pace: {
    icon: "pace",
    unit: "min/km",
    strategy: "min",
    label: "Pace",
  },
  running_distance: {
    icon: "distance",
    unit: "kms",
    strategy: "max",
    label: "distance",
  },
  streak: {
    icon: "pace",
    unit: "days",
    strategy: "max",
    label: "days",
  },
  game_test: {
    icon: "reps",
    unit: "Game Test",
    strategy: "max",
    label: "Game Test",
  },
  num_characters: {
    icon: "characters",
    unit: "chars",
    strategy: "sum",
    label: "Chars",
  },
  num_sentences: {
    icon: "sentencesphy",
    unit: "sentences",
    strategy: "sum",
    label: "Sentences",
  },
  num_words: {
    icon: "words",
    unit: "words",
    strategy: "sum",
    label: "Words",
  },
  fit_points: {
    icon: "fitpoint",
    unit: "FPs",
    strategy: "sum",
    label: "FitPoints",
  },
  nb_workouts: {
    icon: "task",
    unit: "workouts",
    strategy: "sum",
    label: "Workouts",
  },
  user_level: {
    icon: "level",
    unit: "level",
    strategy: "max",
    label: "Level",
  },
};
