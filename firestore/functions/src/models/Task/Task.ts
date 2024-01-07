import { CloudinaryMedia, AWSMedia } from "../sbEvent/CloudinaryMedia";
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
  | "master";

export const taskLabels: labelType[] = [
  "cardio",
  "endurance",
  "agility",
  "strength",
];

export const bgList: { [task in labelType]: string } = {
  strength:
    "strength_l-A8zeubq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651245847266",
  endurance:
    "endurance_2F80WwyhS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651245847268",
  agility:
    "agility_VMcNmj__L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651245847852",
  cardio:
    "cardio_6pabR_vfM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651245847233",
  beginner:
    "Group_283_wH3CRmAFi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654503099868",
  intermediate:
    "Group_284_XLtd4Ym8j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654503099870",
  advanced:
    "Group_286_0D7f8AsVC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654503099869",
  master:
    "Group_285_RH-n0Kc5g.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654503229989",
};

export const headerBgList: { [task in labelType]: string } = {
  strength:
    "Group_97_Z_kUPRR_D.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651242063408",
  endurance:
    "Group_94_lYjJycpm7x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651242063736",
  agility:
    "Group_96_Q2brOmmPK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651242063410",
  cardio:
    "Group_104_1c0ZYUmpp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651242798692",
  beginner:
    "Group_246_lyyxiIw0y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654362067956",
  intermediate:
    "Group_247_ptWqr6JBn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654362067481",
  advanced:
    "Group_249_DgISwH4fk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654362066974",
  master:
    "Group_248_inGO0UJSz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654362066973",
};

export type DifficultyLevelsTypes = "easy" | "mediam" | "hard";

export type NutrientKey = "protein" | "fibre" | "fats" | "carbs";

export interface NutritionFacts {
  protein?: number;
  fibre?: number;
  fats?: number;
  carbs?: number;
}

export interface Exercise {
  exerciseName: string;
  exerciseMedia?: AWSMedia | CloudinaryMedia;
}

export type tagType =
  | "Recipes"
  | "Understand PCOS"
  | "SocialBoat Stories"
  | "Yoga"
  | "Diet Tips"
  | "Skin & hair";

export type TaskTypes = "steps" | "workout" | "path" | "live" | "nutrition"; // | 'oath' | "imageUpload" | "audio" | "goalTracking"

export const servingTypes: servingType[] = [
  "cup",
  "bowl",
  "count",
  "glass",
  "katori",
  "small-bowl",
  // "large-bowl",
  "tablespoon",
  "teaspoon",
];

export type servingType =
  | "cup"
  | "bowl"
  // | "large-bowl"
  | "small-bowl"
  | "katori"
  | "teaspoon"
  | "tablespoon"
  | "glass"
  | "count"; //"gram" | "ml" | "count";

export type weightType = "gram" | "ml";
export interface Equipment {
  equipmentName: string;
}

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
}
export interface SubTask {
  taskName?: string;
  taskMedia?: AWSMedia | CloudinaryMedia;
  fp?: number; // 2FP
  id: string;
  // Not isExercise
  nutrientValues?: NutritionFacts;
  kcal?: number;
  servingValue?: number; // 200 / 200 / 1 | 2 | 3
  servingType?: servingType; // gram | ml | count
  // wtType?: weightType;
  // wtValue?: number;
  isExercise?: boolean;
  gptInfo?: GptSubTask;
  aiSuggest?: AISuggest;
  gptGeneratedNutrition?: boolean;

  // add gram equivalent
  gramEquivalent?: number;
  description?: string;

  qtyStep?: number; // step to increment and decrement
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
}

export interface DishStandard {
  standard_quantity: number;
  unit: string;
  gram_equivalent: number;
}

export interface IngridientDetails {
  protein: number;
  fats: number;
  kcal: number;
  carbs: number;
  fiber: number;
  name: string;
  quantity: number;
}

export interface GptSubTask {
  gptSubTaskName: string;
  gptServingValue: number;
  gptServingType: string;
  gramEquivalent: number;
  assumption: string;
  creatorId: string;

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

export interface SubTaskElement {
  subTaskId: string;
  qty?: number;
}

export interface Task {
  id: string;
  createdOn: number;
  updatedOn: number;

  searchable?: boolean;

  name?: string;
  fitPoints?: number;
  durationMinutes?: number;
  priority?: number;
  type?: taskType;
  startOn?: number | null;
  endOn?: number | null;
  avatar?: CloudinaryMedia | AWSMedia;
  labels?: labelType[];
  // taskLabels?: labelType[];
  thumbnails?: CloudinaryMedia | AWSMedia;
  numClaps?: number;
  userId?: string;
  level?: number;
  rules?: string;
  note?: string;
  description?: string;
  awardLevels?: { text: string; fitPoints: number }[];
  canDoAgain?: number;
  badgeId?: string;
  isReel?: boolean;
  reelMedia?: CloudinaryMedia | AWSMedia;
  reelThumbnail?: CloudinaryMedia | AWSMedia;
  games?: string[];
  programDays?: number[]; // arrayContains === 2
  distance?: number; // distance in meters

  goalKPIs?: GoalKPI[];
  priorityObj?: {
    [day: number]: number;
  };
  stepsToDo?: number;
  taskType?: TaskTypes;
  tags?: tagType[];
  videoThumbnail?: AWSMedia | CloudinaryMedia;
  videoIntroDur?: number;

  freeTask?: boolean;
  orientation?: "landscape" | "portrait";
  difficultyLevels?: DifficultyLevelsTypes;
  previewMedia?: CloudinaryMedia | AWSMedia;
  bgImage?: CloudinaryMedia | AWSMedia;
  liveLink?: string;
  liveOn?: number;
  sectionId?: string;
  nutritionFacts?: NutritionFacts;
  kcal?: number;
  subTasks?: SubTaskElement[];
  exercises?: Exercise[];
  preview?: boolean;
  // associated badges
  badgeIds?: string[];

  ingredients?: Ingredient[];
  cookingInstruction?: string[];
  // day map
  equipmentNeeded?: Equipment[];

  badgeDays?: string[]; // badgeId_day
  badgeDayPriority?: {
    [badgeDay: string]: number;
  };
  mealTypes?: MealTypes;

  specialityText?: string;
  specialityIcon?: CloudinaryMedia | AWSMedia;

  gptImageNutritionMedia?: AWSMedia | CloudinaryMedia;
  recipeTaskId?: string;

  gptUID?: string;
  gptGeneratedNutrition?: boolean;
}
export type MealTypes =
  | "Pre Breakfast"
  | "Breakfast"
  | "Lunch"
  | "Evening Snacks"
  | "Dinner";
export interface GoalKPI {
  targetVal: number; // per task
  // label: string; // per task
  systemKPI: SystemKPIs; // can only have one of these
  // unitLabel: string;

  // iconType: iconGoalType;
}

export type KPIValue = Partial<Record<SystemKPIs, number>>;

// export interface TaskProgress {
//   values: KPIValue;
//   numberOfItems: KPIValue;
//   uid: string;
//   updatedOn: number;
//   createdOn: number;
// }

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

export interface TaskSummary {
  name: string;
  subheading?: string;
  thumbnail: string;
  headerThumbnail: string;
  numTasks: number;

  summaryId: string;
  priority: number;
}
