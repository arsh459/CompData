import { Tool } from "@models/config/Tools";
import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import {
  getNutrientsFromGpt,
  retryCalls,
} from "@modules/AddNewItemLoading/utils/gpt";

import {
  CookingType,
  cookingTypeArr,
} from "@providers/AddNewItem/useAddNewItem";
import { useUserStore } from "@providers/user/store/useUserStore";
import { fetchConfigDetails } from "../general/config/fetchConfigDetails";
import { fetchGptPromptByType } from "../general/config/fetchGptPrompt";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";

export interface create_a_meal_interface {
  date: string;
  mealName: string;
  mealType: MealTypes;
  cookingType: CookingType;
}

export const create_a_meal = async ({
  date,
  mealName,
  mealType,
  cookingType,
}: create_a_meal_interface) => {
  let status = await getUserDietDetails(date);
  if (!status) {
    const config = await fetchConfigDetails();
    const { gptPromptFetched } = await fetchGptPromptByType(
      "customNutritionTask"
    );
    const uid = useUserStore.getState().user?.uid;

    if (!config?.apiKey) {
      return `Some issue in connecting the server please try again`;
    }
    if (!uid) {
      return `Some issue in authenticating the user please restart the app and try again`;
    }

    const data = await retryCalls(async () => {
      return await getNutrientsFromGpt(
        mealName,
        cookingType,
        config?.apiKey,
        uid,
        gptPromptFetched ? gptPromptFetched.type : "na",
        gptPromptFetched?.model ? gptPromptFetched.model : "gpt-4-1106-preview",
        gptPromptFetched,
        mealType
      );
    }, 2);

    if (typeof data === "object") {
      return data;
    } else {
      if (gptPromptFetched && gptPromptFetched.model !== "gpt-4") {
        const dataV2 = await retryCalls(async () => {
          return await getNutrientsFromGpt(
            mealName,
            cookingType,
            config?.apiKey,
            uid,
            gptPromptFetched ? gptPromptFetched.type : "na",
            "gpt-4",
            gptPromptFetched,
            mealType
          );
        }, 2);
        if (typeof dataV2 === "object") {
          return dataV2;
        } else {
          return `Some issue in generating the meal please try again in few minutes`;
        }
      } else {
        return `Some issue in generating the meal please try again in few minutes`;
      }
    }
  }
  return status;
};

export const create_a_meal_tool: Tool = {
  type: "function",
  function: {
    name: "create_a_meal",
    description:
      "This function is used to create any meal and add it to your diet plan on a particular date. It is called when user wants to add a meal into its diet plan or user is try to log something which is not present in its diet plan or user ate something which is not present in their diet plan.This function will return the generated meal and dishes inside that meal. Show the name of meal and dishes to user and ask for their confirmation to add this to diet plan for provided date.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user want to create a meal and add it to its diet plan, it is in the format of yyyy-mm-dd. to have the proper processing. For example: 2023-11-01. If it is not provided ask the user if he/she wants to add it for today.",
        },
        mealName: {
          type: "string",
          description:
            "It is the name of meal you want to create for a particular date",
        },
        mealType: {
          type: "string",
          enum: MealTypesArray,
          description:
            "It is the meal type for which the user is eating that meal.If it is not provided by user then find approprite meal type based on time of day.",
        },
        cookingType: {
          type: "string",
          enum: cookingTypeArr,
          description:
            "It denotes from where user has consumed that meal.If not provided by the user use your intelligence for determining where that will be consumed generally.",
        },
      },
      required: ["date", "mealName", "mealType", "cookingType"],
    },
  },
};
