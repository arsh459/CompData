// Write Call back functions for execution here

import { go_to_diet_plan_screen_callBack_interface } from "@utils/GptToolsFunction/functions/buttonCalls/go_to_diet_plan_screen";
import { go_to_meal_screen_callBack_interface } from "@utils/GptToolsFunction/functions/buttonCalls/go_to_meal_screen";

export const mealScreenCallback =
  async ({}: go_to_meal_screen_callBack_interface) => {
    return;
  };

export const nutritionScreenCallback =
  async ({}: go_to_diet_plan_screen_callBack_interface) => {
    return;
  };
