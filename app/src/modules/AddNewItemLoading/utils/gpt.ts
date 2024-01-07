import { makeGptNutritionCall } from "@hooks/chatbot/insights/api";
import { GPTMessage, gptModels } from "@models/ChatBot/interface";
import { MealTypes } from "@models/Tasks/Task";
import { CookingType } from "@providers/AddNewItem/useAddNewItem";
// import { validateParsedContent } from "./validation";
import { convertToTaskType } from "./parse";
import * as Sentry from "@sentry/react-native";
import { storeInFireStoreDatabase } from "./saveUtils";
import { gptPrompts } from "@models/config/config";
import { defaultNutritionPromptValue } from "../constants/defaultPrompt";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { validateResponse } from "@modules/ImageCaptureScreen/utils/validate";
import {
  parseResponse,
  validateParsed,
} from "@modules/ImageCaptureScreen/utils/parse";

export interface GptNutrientReceivedData {
  name: string;
  quantity: number;
  unit: string;
  gram_eq: number;
  assumption: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface GptNutrientData {
  Constituent_Name: string;
  Standard_Quantity: number;
  Standard_Quantity_Unit: string;
  Standard_Quantity_gram_Equivalent: number;
  Assumption: string;
  Kilo_Calories_in_Kcal_based_on_first_4_keys: number;
  Protein_in_gm_based_on_first_4_keys: number;
  Carbs_in_gm_based_on_first_4_keys: number;
  Fats_in_gm_based_on_first_4_keys: number;
  Fiber_in_gm_based_on_first_4_keys: number;
}
export interface GptError {
  error: string;
}

export async function getNutrientsFromGpt(
  queryItem: string,
  cookingType: CookingType,
  apiKey: string,
  uid: string,
  promptType: string,
  model?: gptModels,
  promptObj?: gptPrompts,
  mealType?: MealTypes
) {
  const message: GPTMessage = {
    role: "user",
    content: `Meal Name: ${cookingType.split("_")[1]} made, ${queryItem}`,
  };

  const initialPrompts = promptObj?.prompt
    ? promptObj.prompt
    : defaultNutritionPromptValue;

  const gptResponse = await makeGptNutritionCall(
    [...initialPrompts, message],
    model ? model : "gpt-4",
    apiKey,
    promptObj?.temperature,
    promptObj?.top_p,
    promptObj?.max_tokens,
    promptObj?.presence_penalty,
    promptObj?.frequency_penalty,
    uid,
    promptType
  );
  let validatedResponse = validateResponse(gptResponse);
  if (!validatedResponse) {
    return undefined;
  }
  let parsedContent = parseResponse(validatedResponse.choices);
  let ValidatedParsedContent = validateParsed(parsedContent);
  if (!ValidatedParsedContent) {
    return undefined;
  }
  const generateTask = convertToTaskType(
    ValidatedParsedContent,
    uid,
    cookingType,
    mealType
  );
  Sentry.addBreadcrumb({
    category: "gpt",
    level: "info",
    message: `generateTask`,
    data: {
      name: generateTask.taskObj.name,
    },
  });
  const error = await storeInFireStoreDatabase(generateTask);
  Sentry.addBreadcrumb({
    category: "gpt",
    level: "info",
    message: `store in firestore`,
    data: {
      error: error,
    },
  });
  if (error) {
    return undefined;
  }

  return generateTask;
}

export const retryCalls = async <T>(
  callback: () => Promise<T>,
  retries: number
): Promise<T | undefined> => {
  while (retries > 0) {
    try {
      const result: T = await callback();
      // console.log("retries pending", retries - 1);
      if (result) {
        return result;
      }
      weEventTrack("retryFailed", {
        retriesPending: retries - 1,
      });
      retries--;
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      weEventTrack("retryErrorThrow", {
        retriesPending: retries - 1,
      });
      retries--;
    }
  }
  return undefined;
};
