import { GPTMessage, gptModels, roleTypes } from "@models/ChatBot/interface";
import { MealTypes, servingType } from "@models/Tasks/Task";
import { slotInterventionTypes } from "@models/User/User";
import { AchievementPathDataItemTypes } from "@modules/Bookings/AchievementPath/utils/interface";
import { functionList, sbFunctions } from "./Tools";

export interface NutritionMetric {
  unit: "gram" | "ml";
  value: number;
}

export type AutoRoomIDs = "YOGA" | "DIET";

export interface AppConfiguration {
  dailyStepsFrom?: number;

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

  // slot booking intervention delay config
  slotInterventionDelay?: Record<slotInterventionTypes, number>;
}

// gptPrompts

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
  | "mealLoggingQueryProcessing"
  | "loggingQuantityFinder"
  | "initialRouterPromptV2";

export const gptTaskTypeArray: gptTaskType[] = [
  "customNutritionTask",
  "customNutritionTaskV2",
  "subTaskGeneration",
  "dishNameValidation",
  "ingredientReplacement",
  "customRecipeGeneration",
  "imageTaskGeneration",
  "imageItemsGeneration",
  "imageTaskGenerationV2",
  "imageItemsGenerationV2",
  "initialRouterPrompt",
  "mealLoggingQueryProcessing",
  "loggingQuantityFinder",
  "initialRouterPromptV2",
];

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

export const response_format_Array: response_format[] = ["json_object"];

export const tool_choice_Array: tool_choice[] = [
  "auto",
  "none",
  ...functionList,
];

export type ContentInterface =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "image_url";
      image_url: {
        url: string;
      };
    };

export type ContentType = "text" | "image_url";
export const ContentTypeArr: ContentType[] = ["text", "image_url"];

export interface GPTVisionMessage {
  role: roleTypes;
  content: ContentInterface[];
}

export type numericPromptKeys =
  | "temperature"
  | "top_p"
  | "max_tokens"
  | "presence_penalty"
  | "frequency_penalty";

export const gptModelsArray: gptModels[] = [
  "gpt-3.5-turbo",
  "gpt-4",
  "gpt-4-1106-preview",
  "gpt-4-vision-preview",
];

export interface TurboResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: gptModels; // "gpt-4"; //"gpt-3.5-turbo" ,
  usage: GPTUsage;
  choices: GPTChoice[];
}

export interface GPTChoice {
  message: GPTMessage;
  finish_reason: "stop";
  index: number;
}

export interface GPTUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface archiveResponse extends TurboResponse {
  uid: string;
  id: string;
  type: string;
  createdOn: number;
  details: {
    model: gptModels;
    OPENAI_API_KEY: string;
    temperature: number;
    top_p: number;
    max_tokens: number;
    presence_penalty: number;
    frequency_penalty: number;
  };
  initMessage: GPTMessage | GPTVisionMessage;
  errorMessage?: string;
}
