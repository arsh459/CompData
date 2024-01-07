import { Tool } from "@models/config/Tools";
import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import fetchRecommendationObject from "../general/recommendations/nutrition/fetchRecomendationObject";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";

export interface change_meal_type_of_meal_interface {
  date: string;
  mealId: string;
  mealTypeToBeAssigned: MealTypes;
}
export const change_meal_type_of_meal = async ({
  date,
  mealId,
  mealTypeToBeAssigned,
}: change_meal_type_of_meal_interface) => {
  let status = await getUserDietDetails(date);
  if (!status) {
    try {
      const uid = useUserStore.getState().user?.uid;

      if (date && mealId && mealTypeToBeAssigned && uid) {
        const recs = await fetchRecommendationObject(date);
        if (recs && recs.tasks && recs.tasks.length > 0) {
          let flag = false;
          let updatedTasks = recs.tasks.map((taskObj) => {
            if (taskObj.id === mealId) {
              flag = true;
              return {
                ...taskObj,
                overrideMealType: mealTypeToBeAssigned,
              };
            }

            return taskObj;
          });
          if (flag) {
            await firestore()
              .collection("users")
              .doc(uid)
              .collection("dayRecommendations")
              .doc(recs.id)
              .update({ tasks: updatedTasks });

            return "Meal Type of meal has been changed, Enjoy now.";
          } else {
            return "Meal is not present in the diet plan";
          }
        }
      }

      return "meal type is changed, enjoy now.";
    } catch (error) {
      console.log("error in change_meal_type_of_meal", error);
      return "Not able to fetch data, please try again in few minutes";
    }
  }

  return status;
};
export const change_meal_type_of_meal_tool: Tool = {
  type: "function",
  function: {
    name: "change_meal_type_of_meal",
    description:
      "This function is used to change the mealType of any meal in the diet plan for a particular date, It has to be called only when user asks to change the meal type of any meal that is present in the diet plan.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user want to create a mealType of meal in its diet plan, It is in the format of yyyy-mm-dd for the proper processing. For example: 2023-11-01. If it is not provided ask the user if he/she wants to add it for today.",
        },
        mealId: {
          type: "string",
          description:
            "It is unique 36 character length id of the meal for which meal type has to be changed.",
        },
        mealTypeToBeAssigned: {
          type: "string",
          enum: MealTypesArray,
          description:
            "It is the meal type that user wants to be assigned to the particular meal. It can only be one of the available meal types",
        },
      },
      required: ["date", "mealId", "mealTypeToBeAssigned"],
    },
  },
};
