import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export interface WorkoutSeries {
  name: string;
  description: string;
  seriesKey: string;

  thumbnail?: CloudinaryMedia;
  id: string;

  numWorkouts: number;
  numNutrition?: number;
  numLives?: number;
  personalWorkoutPlan?: boolean;
  personalNutritionPlan?: boolean;
  intensity?: "beginner" | "intermediate" | "advanced";
  goodFor?: string;
  equipmentNeeded?: string;
  workoutGoal?: string;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;

  cost: number;
  currency: "₹";
  ownerUID: string;

  eventIds?: string[];
}

export interface Workout {
  id: string;

  name: string;
  description: string;
  media?: CloudinaryMedia;
  videoKey: string;

  type?: "workout";

  calories?: number;
  day?: number;
  equipmentNeeded?: string;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;
  ownerUID: string;

  // automated
  durationInSeconds?: number;

  isFree: boolean;
}

export interface LiveClass {
  id: string;

  name: string;
  description: string;
  media?: CloudinaryMedia;
  type: "live";

  day: number;

  // creation details
  createdOnUnix: number;
  updatedOnUnix: number;

  // cost?: number;
  ownerUID: string;
  link?: string;

  //   ingredients?: string;
  //   steps?: string;
  calories?: number;

  isFree: boolean;

  liveKey: string;

  duration?: number;
  slots?: string[]; // hh:mma string
  days?: number[]; // js days
}
