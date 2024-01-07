import { Tool } from "@models/config/Tools";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getActivity } from "@modules/MealMain/store/utils";
import { startOfDay, getTime } from "date-fns";
import fetchSubTaskById from "../general/subTasks/fetchSubTaskById";
import { SubTask } from "@models/Tasks/Task";
import { fetchTaskById } from "../general/tasks/nutrition/fetchTaskById";
import { reconcileActivity } from "../general/activity/reconcileActivity";
import { createNutritionActivity } from "../general/activity/createNutritionActivity";
import { isInFuture } from "../general/utilities/date";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";

export interface log_a_meal_in_diet_interface {
  date: string;
  dishName: string;
  dishNameId: string;
  quantity: number;
  wholeMealId: string;
}

export const log_a_meal_in_diet = async ({
  date,
  dishName,
  dishNameId,
  quantity,
  wholeMealId,
}: log_a_meal_in_diet_interface) => {
  let status = await getUserDietDetails(date);

  if (!status) {
    const uid = useUserStore.getState().user?.uid;

    if (isInFuture(date)) {
      return "You can not log any meal in future, you can only log meals for today and past dates";
    }

    if (!uid) {
      return `Some problem in user Authentication, please try again after restarting the app`;
    }
    const activity = await getActivity(
      uid,
      wholeMealId,
      getTime(startOfDay(new Date(date)))
    );

    const task = await fetchTaskById(wholeMealId);

    if (!task) {
      return `Some problem in fetching the meal, please try again in some time`;
    }

    if (!task.subTasks) {
      return `No Sub Meals exists for the meal, please try again in some time`;
    }

    let subTaskArray: SubTask[] = [];
    for (const data of task.subTasks) {
      const subTask = await fetchSubTaskById(data.subTaskId);
      if (subTask) {
        subTaskArray.push(subTask);
      }
    }

    if (activity) {
      let reconcileStatus = await reconcileActivity(
        activity,
        subTaskArray,
        dishNameId,
        quantity
      );
      return reconcileStatus;
    } else {
      let createStatus = await createNutritionActivity(
        subTaskArray,
        dishNameId,
        quantity,
        task,
        date
      );
      return createStatus;
    }
  }

  return status;
};

export const log_a_meal_in_diet_tool: Tool = {
  type: "function",
  function: {
    name: "log_a_meal_in_diet",
    description:
      "This function is used to log any meal on a particular date.It is only called when we have all the details for the logging of any meal. In our diet plan for every meal there are dishes present which can be logged. There are some fields present in that dishes like recommendedQty,unitForRecomendedQuantity, gramEquivalentToRecommendedQty and loggingEquivalentToRecommendedQty which can be used to interact with the user.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user want to know its diet plans details, it is in the format of yyyy-mm-dd. to have the proper processing. For example: 2023-11-01. If it is not provided ask the user if he/she wants to log it for today.",
        },
        dishNameId: {
          type: "string",
          description:
            "It is the unique id present in the dish document fetched by some other tool",
        },
        wholeMealId: {
          type: "string",
          description: "It is main document id in which that dish exists",
        },
        dishName: {
          type: "string",
          description:
            "It is the name of dish if you want to log in for a particular date.",
        },
        quantity: {
          type: "number",
          description:
            "It is the quantity of that dish user wants to log in. It unit must always be in unitForRecomendedQuantity. Generate the value accordingly.",
        },
      },
      required: ["date", "dishName", "quantity", "dishNameId", "wholeMealId"],
    },
  },
};
