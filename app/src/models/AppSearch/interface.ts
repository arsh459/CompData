import {
  Equipment,
  MealTypes,
  NutritionFacts,
  SubTaskElement,
} from "@models/Tasks/Task";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";

export type algoliaType =
  | "all"
  | "blog"
  | "workout"
  | "recipee"
  | "reel"
  | "nutrition";
export type tagSpelling =
  | "all"
  | "blogs"
  | "workouts"
  | "recipes"
  | "reels"
  | "nutrition";

export const algoliaMatch: Record<algoliaType, tagSpelling> = {
  all: "all",
  blog: "blogs",
  recipee: "recipes",
  reel: "reels",
  workout: "workouts",
  nutrition: "nutrition",
};

export const allAlgoliaTags: Record<algoliaType, boolean> = {
  all: true,
  blog: true,
  workout: true,
  recipee: true,
  reel: true,
  nutrition: false,
};

export interface AlgoliaAppSearch {
  objectID: string;
  taskType: algoliaType;
  tags?: string[];
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
  kcal?: number;
  badgeId?: string;
  subTasks?: SubTaskElement[];
  createdOn?: number;
  updatedOn?: number;
  mediaDuration?: number;
  description?: string;
  difficultyLevels?: DifficultyLevelsTypes;
  mealTypes?: MealTypes;
  freeTask?: boolean;
  liveLink?: string;
  liveOn?: number;
  feature_image?: string;
  published_at?: string;
  reading_time?: number;
  slug?: string;
  nutritionFacts?: NutritionFacts;
}
