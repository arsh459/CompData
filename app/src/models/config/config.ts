import { AutoRoomIDs } from "@models/ChatBot/insights";
import { AchievementPathDataItemTypes } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/interface";
import { MealTypes, servingType } from "@models/Tasks/Task";
import { slotInterventionTypes } from "@models/User/User";
import {
  GPTMessage,
  gptModels,
  GPTVisionMessage,
} from "@models/ChatBot/interface";
import { sbFunctions } from "@utils/GptToolsFunction/fetchFunctionCalls";

export interface NutritionMetric {
  unit: "gram" | "ml";
  value: number;
}

export interface AppConfiguration {
  dailyStepsFrom?: number;
  freezeCost?: number;
  stepTaskId: string;
  dailyRewardId?: string;

  popularSearches: string[];
  freeDays?: number;
  subIdToEntitlementId?: {
    [subscriptionId: string]: string; // entitlementId
  };

  sakhiAIPrompt?: string;
  apiKey: string;

  kpiAwardIds?: Partial<Record<AchievementPathDataItemTypes, string>>;

  // insights prompts
  sakhiInsights?: { [key in AutoRoomIDs]: string };
  nutritionMetrics: Record<servingType, NutritionMetric>;

  mealTimings?: Record<MealTypes, string>;
  mealTypeOrder?: MealTypes[];

  defaultDieticianContact: string;

  // slot booking intervention delay config
  slotInterventionDelay?: Record<slotInterventionTypes, number>;
  tagTypes: string[];

  promptsByVersion?: { [versionId: string]: gptTaskType };
}

export type gptTaskType =
  | "customNutritionTask"
  | "customNutritionTaskV2"
  | "subTaskGeneration"
  | "customRecipeGeneration"
  | "dishNameValidation"
  | "ingredientReplacement"
  | "imageTaskGeneration"
  | "imageItemsGeneration"
  | "imageTaskGenerationV2"
  | "imageItemsGenerationV2"
  | "initialRouterPrompt"
  | "initialRouterPromptV2"
  | "mealLoggingQueryProcessing"
  | "loggingQuantityFinder";

export type tool_choice = "auto" | "none" | sbFunctions;
export type response_format = "json_object";

export interface gptPrompts {
  id: string;
  type: gptTaskType;
  prompt: (GPTMessage | GPTVisionMessage)[];
  model: gptModels;
  temperature: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  isImageArray?: boolean[];
  response_format?: response_format;
  tools?: sbFunctions[];
  tool_choice?: tool_choice;
}
