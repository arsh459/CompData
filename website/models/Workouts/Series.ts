import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

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

// interface GoodForObj {
//   text: string;
//   key: goodForKeys;
// }

// export type goodForKeys =
//   | "athleticism"
//   | "fullBodyEndurance"
//   | "functionalStrength"
//   | "coreConditioning"
//   | "coreStability";
