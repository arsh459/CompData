import { TaskRec } from "@models/User/User";
import firestore from "@react-native-firebase/firestore";

const onSwapMeal = async (
  tasks: TaskRec[],
  mealToBeSwapedId: string,
  mealToBeAddedId: string,
  uid: string,
  dayRecommendationId: string
) => {
  try {
    let updatedTasks: TaskRec[] = [];
    let taskRec: TaskRec = {
      id: mealToBeAddedId,
      manual: true,
    };

    let changed: boolean = false;
    for (const task of tasks) {
      if (task.id === mealToBeSwapedId && !changed) {
        updatedTasks.push(taskRec);
        changed = true;
      } else {
        updatedTasks.push(task);
      }
    }

    await firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(dayRecommendationId)
      .update({ tasks: updatedTasks, manual: true });

    return "Meal is swap enjoy";
  } catch (error) {
    console.log("error", error);
    return "Some problem in Server, please try again in some time.";
  }
};

export default onSwapMeal;
