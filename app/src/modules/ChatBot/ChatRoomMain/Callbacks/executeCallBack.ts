import { buttonParams } from "@models/ChatBot/chatBotButtonInterface";
// import { ChatMessage } from "@models/ChatBot/interface";
import {
  mealScreenCallback,
  nutritionScreenCallback,
} from "./callBackFunctions";

export const executeCallBack = async (buttonParams?: buttonParams) => {
  if (buttonParams) {
    switch (buttonParams.callBackType) {
      case "go_to_meal_screen":
        return await mealScreenCallback(buttonParams.callBackParams);
      case "go_to_diet_plan_screen":
        return await nutritionScreenCallback(buttonParams.callBackParams);
    }
  }
  return;
};
