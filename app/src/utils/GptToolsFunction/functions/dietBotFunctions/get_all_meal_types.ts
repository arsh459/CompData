import { Tool } from "@models/config/Tools";
import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import { getDisplayMealTime } from "@modules/Nutrition/V2/PlanList/scrollTime";
import { useUserStore } from "@providers/user/store/useUserStore";
import { fetchConfigDetails } from "../general/config/fetchConfigDetails";
export interface get_all_meal_types_interface {}

export const get_all_meal_types = async ({}: get_all_meal_types_interface) => {
  let mealTypes: Partial<Record<MealTypes, string>> = {};
  const config = await fetchConfigDetails();
  const userTimings = useUserStore.getState().user?.dietForm?.foodTimings;
  MealTypesArray.map((meal) => {
    mealTypes[meal] = getDisplayMealTime(
      meal,
      config?.mealTimings,
      userTimings,
      config?.mealTypeOrder
    );
  });
  return mealTypes;
};
export const get_all_meal_types_tool: Tool = {
  type: "function",
  function: {
    name: "get_all_meal_types",
    description:
      "This function is used to get all the available meal types and their timings, this will be generally used when you want that user selects from meal type options",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
