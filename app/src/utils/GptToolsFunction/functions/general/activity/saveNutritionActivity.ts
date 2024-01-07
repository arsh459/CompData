import { Activity, SubTaskScore } from "@models/Activity/Activity";
import { NutritionFacts } from "@models/Tasks/Task";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";

export const saveNutritionActvity = async (
  macros: NutritionFacts,
  subTaskQty: SubTaskScore,
  subTaskScore: SubTaskScore,
  fps: number,
  totalKcalConsumed: number,
  activity: Activity
) => {
  try {
    const uid = useUserStore.getState().user?.uid;
    if (!uid) {
      return `Some problem in user Authentication, please try again after restarting the app`;
    }
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(activity.id)
      .update({
        calories: fps * 300,
        subTaskScore,
        subTaskQty,
        macros,
        totalKcalConsumed,
      });
    return `logging done`;
  } catch (e) {
    console.log("error", e);
    return `Some problem in updating the activity, please try again after restarting the app`;
  }
};
