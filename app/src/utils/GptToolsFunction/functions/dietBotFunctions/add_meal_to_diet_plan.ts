import { Tool } from "@models/config/Tools";
import { dayRecommendation } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { getUserDietDetails } from "../general/generators/getUserDietDetails";

export interface add_meal_to_diet_plan_interface {
  mealId: string;
  date: string;
}
export const add_meal_to_diet_plan = async ({
  mealId,
  date,
}: add_meal_to_diet_plan_interface) => {
  const status = await getUserDietDetails(date);

  if (!status) {
    const uid = useUserStore.getState().user?.uid;
    const nutritionalBadgeId = useUserStore.getState().user?.nutritionBadgeId;
    let recsRef: FirebaseFirestoreTypes.Query;
    try {
      if (nutritionalBadgeId && uid && date) {
        recsRef = firestore()
          .collection("users")
          .doc(uid)
          .collection("dayRecommendations")
          .where("type", "==", "nutrition")
          .where("badgeId", "==", nutritionalBadgeId)
          .where("date", "==", date);

        const docs = await recsRef.get();
        if (docs && docs.docs.length) {
          const recsData = docs.docs.map((eachDoc) => {
            return eachDoc.data() as dayRecommendation;
          });

          await firestore()
            .collection("users")
            .doc(uid)
            .collection("dayRecommendations")
            .doc(recsData[0].id)
            .set({
              ...recsData[0],
              tasks: [...recsData[0].tasks, { id: mealId }],
            });

          return "Meal is added to diet plan please log it";
        }
      }
      return "Badge is not assigned please contact your habit coach";
    } catch (error) {
      return "Server error please try again in some time";
    }
  }

  return status;
};
export const add_meal_to_diet_plan_tool: Tool = {
  type: "function",
  function: {
    name: "add_meal_to_diet_plan",
    description:
      "This function is used to add any meal to diet plan of particular date with help of meal id provided.",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "It is the date on which user want to add that meal to the diet plan, It is in yyyy-mm-dd format to have the proper processing. For example: 2023-11-01. If you are not able to get this from previous context ask from the user",
        },
        mealId: {
          type: "string",
          description:
            "It is the unique id of the meal you want to add in diet plan.",
        },
      },
      required: ["date", "mealId"],
    },
  },
};
