import { Tool } from "@models/config/Tools";
import { useUserStore } from "@providers/user/store/useUserStore";
import {
  // DATE_NOT_AVAILABLE,
  // NUTRITION_BADGE_UNAVAILABLE,
  UID_UNAVAILABLE,
} from "../constants/errorConstants";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";
import { fetchRecommendations } from "../general/recommendations/nutrition/fetchRecommendations";

export interface get_diet_plan_details_interface {
  date: string;
}

export const get_diet_plan_details = async ({ date }: { date: string }) => {
  const user = useUserStore.getState().user;
  if (!user?.uid) return UID_UNAVAILABLE;

  const status = await getUserDietDetails(date);
  console.log("status", status);

  if (!status) {
    if (user?.uid && user?.nutritionBadgeId && date) {
      const data = await fetchRecommendations(
        user.uid,
        user.nutritionBadgeId,
        date
      );
      return data;
    }
  } else {
    return status;
  }
};

export const get_diet_plan_details_tool: Tool = {
  type: "function",
  function: {
    name: "get_diet_plan_details",
    description:
      "This function is used to get diet plan details of the user. Whenever user want to know their diet plan call this function. It will contains a array of meals with all the details regarding that meal. you can provide the user with small description of that meal plan and explore as per user's requirement.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which you want to know diet plans details, it is in the format of yyyy-mm-dd. to have the proper processing. For example: 2023-11-01",
        },
      },
      required: ["date"],
    },
  },
};
