import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { SystemKPIs } from "./SystemKPIs";

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

export type taskFrequency = "weekly" | "daily" | "anytime";
export interface Equipment {
  equipmentName: string;
}
export interface Exercise {
  exerciseName: string;
  exerciseMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  isSaved?: boolean;
}

export interface DietCard {
  taskName?: string;
  taskMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  id: string;
}

export type servingType =
  // | "gram"
  // | "ml"
  | "cup"
  | "bowl"
  | "katori"
  | "teaspoon"
  | "tablespoon"
  | "glass"
  | "count"
  | "small-bowl"
  | "large-bowl";

export type weightType = "gram" | "ml";

export type dishCategories = "vegan" | "veg" | "egg" | "non-veg";

export type CookingType = "At_Home" | "At_Restaurant";

export interface SubTask {
  taskName?: string;
  taskMedia?: AWSMedia | CloudinaryMedia;
  fp?: number;
  id: string;

  // Not isExercise
  nutrientValues?: NutritionFacts;
  kcal?: number;
  servingValue?: number; // 200 | 200 | 1 | 2 | 3 | 1 | 2 | 3
  servingType?: servingType; // gram | ml | cup | bowl | katori | teaspoon | tablespoon | number

  // wtType?: weightType;
  // wtValue?: number;
  met?: number;

  isExercise?: boolean;
  qtyStep?: number; // step to increment and decrement

  // Gpt generated nutrition
  gptInfo?: GptSubTask;
  aiSuggest?: AISuggest;
  cookingType?: CookingType;
  gptGeneratedNutrition?: boolean;
}

export interface AISuggest {
  gptSubTaskName: string;
  gptServingValue: number;
  gptServingType: string;
  gramEquivalent: number;
  assumption: string;
  ingridientDetails: IngridientDetails[];
  cookingInstructions: string[];
  cooking_time: number;
  ingrdientQuantities: {
    [ingKey: string]: number | string;
  };
  kcal?: number;
  nutrientValues?: NutritionFacts;
}

export interface IngredientCollection {
  id: string;
  protein: number;
  fats: number;
  carbs: number;
  fiber: number;
  kcal: number;
  name: string;
  quantity: number;
  qtyRequiredForSubTask: number | string;
}

export interface DishStandard {
  standard_quantity: number;
  unit: string;
  gram_equivalent: number;
}

export interface IngridientDetails {
  protein: number;
  fats: number;
  carbs: number;
  fiber: number;
  kcal: number;
  name: string;
  quantity: number;
}

export interface GptSubTask {
  gptSubTaskName: string;
  gptServingValue: number;
  gptServingType: string;
  gramEquivalent: number;
  assumption: string;

  // to save fallback values
  kcal?: number;
  nutrientValues?: NutritionFacts;

  //
  cookingInstructions?: string[];
  cooking_time?: number;
  ingridientDetails?: IngridientDetails[];
  ingrdientQuantities?: {
    [ingKey: string]: number | string;
  };
}

export interface TaskSummary {
  name: string;
  thumbnail: string;
  numTasks: number;
  subheading?: string;

  summaryId: string;
  priority: number;
}
export interface NutritionFacts {
  protein?: number;
  fibre?: number;
  fats?: number;
  carbs?: number;
}
export type MealTypes =
  | "Pre Breakfast"
  | "Post Breakfast"
  | "Breakfast"
  | "Lunch"
  | "Evening Snacks"
  | "Dinner"
  | "Post Dinner";

export const mealTypesArr: MealTypes[] = [
  "Pre Breakfast",
  "Post Breakfast",
  "Breakfast",
  "Lunch",
  "Evening Snacks",
  "Dinner",
  "Post Dinner",
];
export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
}

export interface SubTaskElement {
  subTaskId: string;
  // is not Exersise
  qty?: number;
  // is Exersise
  timeStart?: number;
}

export interface Task {
  id: string;
  createdOn: number;
  updatedOn: number;

  searchable?: boolean;

  // common fields
  taskType?: TaskTypes;
  name?: string;
  description?: string;
  userId?: string;
  isReel?: boolean;

  //gpt Tasks
  baseTaskId?: string;
  gptImageUrl?: string;

  // if isReel is true
  reelMedia?: CloudinaryMedia | AWSMedia;
  reelThumbnail?: CloudinaryMedia | AWSMedia;
  tags?: string[];
  readyIn?: number;
  priority?: number;

  // workout fields.
  avatar?: CloudinaryMedia | AWSMedia;
  lowResMedia?: CloudinaryMedia | AWSMedia;
  previewMedia?: CloudinaryMedia | AWSMedia;
  videoThumbnail?: AWSMedia | CloudinaryMedia;
  videoIntroDur?: number;
  playbackId?: string; // Make Task Streamable
  lowResPlaybackId?: string; // make task streamable
  reelPlaybackId?: string;
  orientation?: "landscape" | "portrait";

  // Nutrition fields
  mealTypes?: MealTypes;
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
  landingPage?: boolean;
  difficultyLevels?: DifficultyLevelsTypes;
  rules?: string;

  // workout | Live fields
  durationMinutes?: number;

  // workout | Nutrition fields
  subTasks?: SubTaskElement[];
  met?: number;

  // automative backend use
  badgeIds?: string[];
  badgeDays?: string[]; // badgeId_day
  badgeDayPriority?: {
    [badgeDay: string]: number;
  };

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
  specialityText?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  category?: string;
  cuisine?: string;
  yields?: string;

  specialityIcon?: CloudinaryMedia | AWSMedia;

  recipeTaskId?: string;

  // for gpt generated tasks and subtasks
  gptGeneratedNutrition?: boolean;
}

export type TaskTypes = "steps" | "workout" | "path" | "live" | "nutrition"; // | 'oath' | "imageUpload" | "audio" | "goalTracking"

export type CollectionTypes = "tasks" | "gptTasks";
export const collectionTypeArr: CollectionTypes[] = ["tasks", "gptTasks"];

export const taskTypeArr: TaskTypes[] = [
  "workout",
  "nutrition",
  "path",
  "live",
];

export type DifficultyLevelsTypes = "easy" | "medium" | "hard";

export interface Coord {
  latitude: number;
  longitude: number;
}

// assign task to game.
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
  // values: KPIValue;
  gameSprintKPIValues?: gameSprintProgress;
  gameSprintKPICount?: gameSprintProgress;
  // numberOfItems: KPIValue;
  uid: string;
  updatedOn: number;
  createdOn: number;
}
