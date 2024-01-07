import { NutritionFacts, SubTask, Task } from "../../../../models/Task/Task";
import {
  getSubtaskById,
  getAllTasksBySubTask,
} from "../../../../models/Task/getUtils";
import {
  getUpdatedKCal,
  getUpdatedMacros,
} from "../reconcileTasks/utils/macroUpdates";
import { updateTasksInDb } from "../reconcileTasks/utils/saveUtils";

export const reconcileNutritionMainOnSub = async (subTaskId: string) => {
  const allNutritionTasks = await getAllTasksBySubTask(subTaskId);
  const updatedTasks: Task[] = [];
  let subtaskObjs: { [id: string]: SubTask | undefined } = {};
  for (const task of allNutritionTasks) {
    if (task.subTasks) {
      let newTask = task;
      let macros: NutritionFacts = {};
      let kcal: number = 0;
      for (const subTask of task.subTasks) {
        const response = await getSubTaskFromObj(
          subtaskObjs,
          subTask.subTaskId,
        );
        if (response.subTask) {
          console.log("subTask:", response.subTask.taskName, subTask.qty);
          subtaskObjs = response.subtaskObjs;
          macros = getUpdatedMacros(
            macros,
            response.subTask,
            "protein",
            subTask.qty ? subTask.qty : 1,
          );
          macros = getUpdatedMacros(
            macros,
            response.subTask,
            "carbs",
            subTask.qty ? subTask.qty : 1,
          );
          macros = getUpdatedMacros(
            macros,
            response.subTask,
            "fats",
            subTask.qty ? subTask.qty : 1,
          );
          macros = getUpdatedMacros(
            macros,
            response.subTask,
            "fibre",
            subTask.qty ? subTask.qty : 1,
          );

          kcal = getUpdatedKCal(
            kcal,
            response.subTask,
            subTask.qty ? subTask.qty : 1,
          );

          // console.log("kcal", kcal);
          // console.log("macros", macros);
        }
      }

      newTask.nutritionFacts = macros;
      newTask.kcal = kcal;
      updatedTasks.push(newTask);
      console.log(
        `${newTask.name} | Protein:${newTask.nutritionFacts?.protein}g | Carbs:${newTask.nutritionFacts?.carbs}g | Fats:${newTask.nutritionFacts?.fats}g | Fiber:${newTask.nutritionFacts?.fibre}g | KCal:${newTask.kcal}KCal`,
      );
    }
  }

  // sum kcal, carbs, protein, fats, fiber
  // update task in db
  await updateTasksInDb(updatedTasks);

  return updatedTasks;
};

const getSubTaskFromObj = async (
  subtaskObjs: { [id: string]: SubTask | undefined } = {},
  subTaskId: string,
) => {
  if (subtaskObjs[subTaskId]) {
    return {
      subTask: subtaskObjs[subTaskId],
      subtaskObjs,
    };
  } else {
    const subTask = await getSubtaskById(subTaskId);
    subtaskObjs[subTaskId] = subTask;
    return {
      subTask,
      subtaskObjs,
    };
  }
};
