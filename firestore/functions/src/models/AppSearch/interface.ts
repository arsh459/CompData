import {
  DifficultyLevelsTypes,
  Equipment,
  Ingredient,
  MealTypes,
  NutritionFacts,
  SubTaskElement,
  // TaskTypes,
} from "../Task/Task";
import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";

export type algoliaType = "blog" | "workout" | "recipee" | "reel" | "nutrition";

export interface AlgoliaAppSearch {
  objectID: string;
  taskType: algoliaType;
  tags?: string[];
  mediaDuration?: number;
  name?: string;
  thumbnail?: CloudinaryMedia | AWSMedia;
  isReel?: boolean;
  reelThumbnail?: CloudinaryMedia | AWSMedia;
  userId?: string;
  fitpoints?: number;
  durationMinutes?: number;
  videoThumbnail?: CloudinaryMedia | AWSMedia;
  videoIntroDur?: number;
  equipmentNeeded?: Equipment[];
  ingredients?: Ingredient[];
  kcal?: number;
  badgeId?: string;
  subTasks?: SubTaskElement[];
  createdOn?: number;
  updatedOn?: number;
  description?: string;
  difficultyLevels?: DifficultyLevelsTypes;
  nutritionFacts?: NutritionFacts;
  mealTypes?: MealTypes;
  freeTask?: boolean;
  creatorName?: string;
  liveLink?: string;
  liveOn?: number;
  feature_image?: string;
  published_at?: string;
  reading_time?: number;
  slug?: string;
}
