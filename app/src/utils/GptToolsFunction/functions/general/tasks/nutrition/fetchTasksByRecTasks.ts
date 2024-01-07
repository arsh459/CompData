import { Task } from "@models/Tasks/Task";
import { TaskRec } from "@models/User/User";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { fetchSubTasksWithTasks } from "../../subTasks/fetchSubTasksWithTasks";

export const fetchTasksbyRecTasks = async (recTasks: TaskRec[]) => {
  if (recTasks) {
    const promises: Promise<
      FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    >[] = [];

    for (const parsedTk of recTasks) {
      const promise = firestore().collection("tasks").doc(parsedTk.id).get();
      promises.push(promise);
    }

    let remoteTasksData: Task[] = [];
    const results = await Promise.all(promises);
    if (!results) {
      return [];
    }

    for (const [index, remTask] of results.entries()) {
      const tk = remTask.data() as Task;
      if (tk) {
        let taskObject: Task = { ...tk };
        let formattedtask: Task = {
          id: taskObject.id,
          createdOn: taskObject.createdOn,
          updatedOn: taskObject.updatedOn,
          ...(taskObject.taskType ? { taskType: taskObject.taskType } : {}),
          ...(taskObject.name ? { name: taskObject.name } : {}),

          ...(taskObject.description
            ? { description: taskObject.description }
            : {}),
          ...(taskObject.mealTypes ? { mealTypes: taskObject.mealTypes } : {}),

          ...(taskObject.ingredients
            ? { ingredients: taskObject.ingredients }
            : {}),
          ...(taskObject.cookingInstruction
            ? { cookingInstruction: taskObject.cookingInstruction }
            : {}),

          ...(taskObject.nutritionFacts
            ? { nutritionFacts: taskObject.nutritionFacts }
            : {}),
          ...(taskObject.kcal ? { kcal: taskObject.kcal } : {}),

          ...(taskObject.dishCategory
            ? { dishCategory: taskObject.dishCategory }
            : {}),
          ...(taskObject.fitPoints ? { fitPoints: taskObject.fitPoints } : {}),

          ...(taskObject.subTasks ? { subTasks: taskObject.subTasks } : {}),
          ...(taskObject.subTaskDetails
            ? { subTaskDetails: taskObject.subTaskDetails }
            : {}),
        };
        if (recTasks[index].overrideMealType) {
          formattedtask.mealTypes = recTasks[index].overrideMealType;
        }
        let tasksWithSubTasks = await fetchSubTasksWithTasks(formattedtask);
        remoteTasksData.push(tasksWithSubTasks);
      }
    }

    return remoteTasksData;
  }
  return [];
};
