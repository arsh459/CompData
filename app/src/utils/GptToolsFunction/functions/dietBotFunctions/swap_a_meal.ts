import { Tool } from "@models/config/Tools";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";
import fetchRecommendationObject from "../general/recommendations/nutrition/fetchRecomendationObject";
import onSwapMeal from "../general/swap/onSwapMeal";

export interface swap_a_meal_interface {
  date: string;
  mealToBeSwapedId: string;
  mealToBeAddedId: string;
}

export const swap_a_meal = async ({
  date,
  mealToBeSwapedId,
  mealToBeAddedId,
}: swap_a_meal_interface) => {
  let status = await getUserDietDetails(date);

  if (!status) {
    const uid = useUserStore.getState().user?.uid;

    if (!uid) {
      return `Some issue in authenticating the user please restart the app and try again`;
    }

    const recomendation = await fetchRecommendationObject(date);
    if (!recomendation) {
      return `No recomendation is available talk to our team`;
    }

    const swapStatus = await onSwapMeal(
      recomendation.tasks,
      mealToBeSwapedId,
      mealToBeAddedId,
      uid,
      recomendation.id
    );

    return swapStatus;
  }

  return status;
};

export const swap_a_meal_tool: Tool = {
  type: "function",
  function: {
    name: "swap_a_meal",
    description:
      "This function is used to swap a meal with another meal.It is only called when two meals have to swaped. You can not change inner details of the meal with this",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user want swap a meal in their diet plan, it is in the format of yyyy-mm-dd, to have the proper processing. For example: 2023-11-01. If it is not provided assume it for today and ask for confirmation from user.",
        },
        mealToBeSwapedId: {
          type: "string",
          description:
            "It is unique id of the meal that needs to be swaped with another meal",
        },
        mealToBeAddedId: {
          type: "string",
          description:
            "It is unique id of the meal that is to added in place of the meal to be swaped",
        },
      },
      required: ["date", "mealToBeSwapedId", "mealToBeAddedId"],
    },
  },
};
