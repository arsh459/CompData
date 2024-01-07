import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { SystemKPIs } from "./SystemKPIs";
import { CookingType } from "@providers/AddNewItem/useAddNewItem";
import {
  afternoonSnackIconWhiteFrame20,
  breakFastIconWhiteFrame20,
  dinnerIconWhiteFrame20,
  lunchIconWhiteFrame20,
  postDinnerIconFrame20,
  preBreakfastIconFrame20,
} from "@constants/imageKitURL";

export type taskType = "standard" | "mediaTask";

export type labelType =
  | "cardio"
  | "endurance"
  | "agility"
  | "strength"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "finale"
  | "master";

export const taskLabels: labelType[] = [
  "cardio",
  "endurance",
  "agility",
  "strength",
];
export interface Equipment {
  equipmentName: string;
}
export interface Exercise {
  exerciseName: string;
  exerciseMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  isSaved?: boolean;
}
export type taskFrequency = "weekly" | "daily" | "anytime";

export interface TaskSummary {
  name: string;
  thumbnail: string;
  numTasks: number;
  subheading?: string;
  summaryId: string;
  priority: number;
}

// export type NuritionFacts = Partial<Record<selectedNutriType, number>>;

export interface NutritionFacts {
  protein?: number;
  fibre?: number;
  fats?: number;
  carbs?: number;
}

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
}

export interface DietCard {
  taskName?: string;
  taskMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  isSaved?: boolean;
  id: string;
}

export type MealTypes =
  | "Pre Breakfast"
  | "Breakfast"
  | "Post Breakfast"
  | "Lunch"
  | "Evening Snacks"
  | "Dinner"
  | "Post Dinner";

export const MealTypesArray: MealTypes[] = [
  "Pre Breakfast",
  "Breakfast",
  "Post Breakfast",
  "Lunch",
  "Evening Snacks",
  "Dinner",
  "Post Dinner",
];

export const MealTypeIcon: Record<MealTypes, string> = {
  "Pre Breakfast": preBreakfastIconFrame20,
  Breakfast: breakFastIconWhiteFrame20,
  "Post Breakfast": breakFastIconWhiteFrame20,
  Lunch: lunchIconWhiteFrame20,
  "Evening Snacks": afternoonSnackIconWhiteFrame20,
  Dinner: dinnerIconWhiteFrame20,
  "Post Dinner": postDinnerIconFrame20,
};

export interface SubTaskElement {
  subTaskId: string;
  // is not Exersise
  qty?: number; // recommended qty
  // is Exersise
  timeStart?: number;
}

export type dishCategories = "veg" | "non-veg" | "egg" | "fish";

export interface Task {
  id: string;
  createdOn: number;
  updatedOn: number;

  baseTaskId?: string;
  gptImageUrl?: string;

  // common fields
  taskType?: TaskTypes; // nutrition
  name?: string; // name
  description?: string; // empty
  userId?: string; // empty
  isReel?: boolean; // empty

  // if isReel is true
  reelMedia?: CloudinaryMedia | AWSMedia; // empty
  reelThumbnail?: CloudinaryMedia | AWSMedia; // empty
  tags?: string[]; // empty
  readyIn?: number;
  priority?: number; // depreciated

  // workout fields
  avatar?: CloudinaryMedia | AWSMedia; // empty
  lowResMedia?: CloudinaryMedia | AWSMedia;
  previewMedia?: CloudinaryMedia | AWSMedia;
  videoThumbnail?: AWSMedia | CloudinaryMedia;
  videoIntroDur?: number;
  playbackId?: string; // Make Task Streamable
  lowResPlaybackId?: string; // make task streamable
  reelPlaybackId?: string;
  orientation?: "landscape" | "portrait";

  // Nutrition fields
  mealTypes?: MealTypes; // set as swap meal type
  ingredients?: Ingredient[];
  cookingInstruction?: string[];
  nutritionFacts?: NutritionFacts; // auto calculate from subTasks
  kcal?: number; // auto calculate from subTasks
  dishCategory?: dishCategories;

  // Path fields
  distance?: number; // distance in meters
  path?: Coord[];

  // Live fields
  liveLink?: string;
  liveOn?: number;

  // workout | Path | Live fields
  fitPoints?: number; // for Nutrition sum of subTaskFPs.
  thumbnails?: CloudinaryMedia | AWSMedia;
  equipmentNeeded?: Equipment[];
  freeTask?: boolean;
  preview?: boolean;
  difficultyLevels?: DifficultyLevelsTypes;
  rules?: string;

  // workout | Live fields
  durationMinutes?: number;

  // workout | Nutrition fields
  subTasks?: SubTaskElement[];

  // Not in use
  startOn?: number | null;
  endOn?: number | null;
  numClaps?: number;
  level?: number;
  stepsToDo?: number;
  agilityScore?: number;
  strengthScore?: number;
  cardioScore?: number;
  enduranceScore?: number;
  unlocksAtRank?: number;
  note?: string;
  badgeId?: string;
  sectionId?: string;
  oneTimeOnly?: boolean;
  levelBoosterTask?: boolean;
  onLevelOnly?: boolean;
  finaleTask?: boolean; // speacial label
  gameTask?: boolean; // can do as per frequency.
  canCheckIn?: boolean;
  exercises?: Exercise[];
  labels?: labelType[];
  awardLevels?: { text: string; fitPoints: number }[];
  taskFrequency?: taskFrequency;
  games?: string[];
  type?: taskType;
  parentTaskIds?: string[];
  programDays?: number[]; // arrayContains === 2
  goalKPIs?: GoalKPI[];
  priorityObj?: {
    [day: number]: number;
  };
  bgImage?: CloudinaryMedia | AWSMedia;
  dietCards?: DietCard[];
  badgeIds?: string[];
  badgeDays?: string[]; // badgeId_day
  badgeDayPriority?: {
    [badgeDay: string]: number;
  };
  specialityText?: string;
  specialityIcon?: CloudinaryMedia | AWSMedia;

  recipeTaskId?: string;
  isCustom?: boolean;
  deepLink?: string;

  gptGeneratedNutrition?: boolean;

  // for diet bot only no need to insert any value here just for making fetching easier.
  subTaskDetails?: SubTask[];
}

export type servingType =
  | "cup"
  | "bowl"
  | "katori"
  | "teaspoon"
  | "tablespoon"
  | "glass"
  | "count";

export type weightType = "gram" | "ml";

export type TaskTypes =
  | "steps"
  | "workout"
  | "path"
  | "live"
  | "nutrition"
  | "reels"; // | 'oath' | "imageUpload" | "audio" | "goalTracking"

export interface Coord {
  latitude: number;
  longitude: number;
}

export interface SubTask {
  taskName?: string;
  taskMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  id: string;

  // Not isExercise
  nutrientValues?: NutritionFacts;
  kcal?: number;
  servingValue?: number; // 200 / 200 / 1 | 2 | 3
  servingType?: servingType; // gram | ml | count

  isExercise?: boolean;

  // for gpt generated SubTasks
  gptInfo?: GptSubTask;
  cookingType?: CookingType;

  // wtType?: weightType;
  // wtValue?: number;

  gptGeneratedNutrition?: boolean;
  qtyStep?: number; // step to increment and decrement

  // Just for diet bot purpose only no need to insert an value here
  recommendedQty?: number;
  unitForRecomendedQuantity?: string;
  gramEquivalentToRecommendedQty?: number;
  loggingEquivalentToRecommendedQty?: number;
  loggingQuantityMultiple?: number;
}

interface GptSubTask {
  gptSubTaskName: string;
  creatorId: string;
  gptServingValue: number;
  gptServingType: string;
  gramEquivalent: number;
  assumption: string;

  // to save fallback values
  kcal?: number;
  nutrientValues?: NutritionFacts;
}
// assign task to game
// task has KPIs, for each task you can see progress
// each game can have gameTasks
// from gameTasks, we can identify SystemKPIs for game
// KPIs summarised for each game
// UserRank {} // {kpi: value}
export interface GoalKPI {
  targetVal: number; // per task
  // label: string; // per task
  systemKPI: SystemKPIs; // can only have one of these
  // unitLabel: string;

  // iconType: iconGoalType;
}

export type KPIValue = Partial<Record<SystemKPIs, number>>;
export interface gameSprintProgress {
  [gameId: string]: {
    [sprintId: string]: KPIValue;
  };
}

export interface TaskProgress {
  values: KPIValue;
  // numberOfItems: KPIValue;
  gameSprintKPIValues?: gameSprintProgress;
  gameSprintKPICount?: gameSprintProgress;
  uid: string;
  updatedOn: number;
  createdOn: number;
}
