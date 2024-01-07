import { Tool } from "@models/config/Tools";
import { MealTypes } from "@models/Tasks/Task";
import { scrollTime } from "@modules/Nutrition/V2/PlanList/scrollTime";
import { useUserStore } from "@providers/user/store/useUserStore";
import { fetchConfigDetails } from "../general/config/fetchConfigDetails";

export interface get_meal_type_based_on_time_interface {}

export const get_meal_type_based_on_time =
  async ({}: get_meal_type_based_on_time_interface): Promise<MealTypes> => {
    const config = await fetchConfigDetails();
    const timings = useUserStore.getState().user?.dietForm?.foodTimings;
    if (config?.mealTimings) {
      const resp = scrollTime(
        config?.mealTimings,
        timings,
        config.mealTypeOrder
      );
      if (resp && resp.selectedMealtype) {
        return resp.selectedMealtype;
      }
    }

    return "Breakfast";
  };

export const get_meal_type_based_on_time_tool: Tool = {
  type: "function",
  function: {
    name: "get_meal_type_based_on_time",
    description: "This function is used to get meal type based on current time",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
};
