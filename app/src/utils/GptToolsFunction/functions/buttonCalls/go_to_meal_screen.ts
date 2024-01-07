import { buttonParams } from "@models/ChatBot/chatBotButtonInterface";
import { Tool } from "@models/config/Tools";
import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import { startOfDay, getTime } from "date-fns";

export interface go_to_meal_screen_interface {
  date: string;
  mealId: string;
  mealType: MealTypes;
  mealName: string;
}

export interface go_to_meal_screen_callBack_interface {}

export const go_to_meal_screen = ({
  date,
  mealId,
  mealType,
  mealName,
}: go_to_meal_screen_interface): buttonParams => {
  return {
    type: "go_to_meal_screen",
    navigationArguments: {
      taskId: mealId,
      selectedUnix: getTime(startOfDay(new Date(date))),
      mealType: mealType,
    },
    screenName: "MealScreen",
    text: `Go to ${mealName}`,
    callBackParams: {},
    callBackType: "go_to_meal_screen",
  };
};

export const go_to_meal_screen_tool: Tool = {
  type: "function",
  function: {
    name: "go_to_meal_screen",
    description:
      "This function is used to show a navigation button on screen to navigate the user to meal screen of a particular meal in the diet plan",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which that meal is present in diet plan, It is in yyyy-mm-dd format to have the proper processing. For example: 2023-11-01. If you are not able to get this from previous context ask from the user",
        },
        mealId: {
          type: "string",
          description:
            "It is the unique id of the meal you want the user to navigate to for more information",
        },
        mealType: {
          type: "string",
          enum: MealTypesArray,
          description:
            "This is the meal type of the meal on which you want to show the navigation button",
        },
        mealName: {
          type: "string",
          description:
            "This is the meal name of the meal on which you want to show the navigation button",
        },
      },
      required: ["date", "mealId", "mealType", "mealName"],
    },
  },
};
