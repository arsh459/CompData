import { MealScreenTypes } from "@screens/MealScreen";
import { NutritionParams } from "@screens/NutritionScreen";
import { go_to_diet_plan_screen_callBack_interface } from "@utils/GptToolsFunction/functions/buttonCalls/go_to_diet_plan_screen";
import { go_to_meal_screen_callBack_interface } from "@utils/GptToolsFunction/functions/buttonCalls/go_to_meal_screen";

export type buttonParams =
  | {
      type: "go_to_meal_screen";
      navigationArguments: MealScreenTypes;
      screenName: "MealScreen";
      text: string;
      callBackType: "go_to_meal_screen";
      callBackParams: go_to_meal_screen_callBack_interface;
    }
  | {
      type: "go_to_diet_plan_screen";
      navigationArguments: NutritionParams;
      screenName: "NutritionScreen";
      text: string;
      callBackType: "go_to_diet_plan_screen";
      callBackParams: go_to_diet_plan_screen_callBack_interface;
    };

export type CallBackTypes = "go_to_meal_screen" | "go_to_diet_plan_screen";
export type CallBackParams =
  | go_to_meal_screen_callBack_interface
  | go_to_diet_plan_screen_callBack_interface;
