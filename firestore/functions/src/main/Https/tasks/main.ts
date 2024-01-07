import * as admin from "firebase-admin";
import { SubTask } from "../../../models/Task/Task";
import { getAppConfiguration } from "../../../models/config/getUtils";

export const mainSubTask = async (isExercise: boolean) => {
  const subTaskDocs = await getSubTasks(isExercise);
  const config = await getAppConfiguration();

  let i: number = 0;
  const subTasks: SubTask[] = [];
  for (const subTaskDoc of subTaskDocs.docs) {
    const subTask = subTaskDoc.data() as SubTask;

    let go: boolean = false;
    if (isExercise && subTask.isExercise) {
      go = true;
    } else if (!isExercise && !subTask.isExercise) {
      go = true;
    }

    if (go) {
      const wt =
        subTask.servingType && config?.nutritionMetrics[subTask.servingType]
          ? `${config?.nutritionMetrics[subTask.servingType].value} ${
              config?.nutritionMetrics[subTask.servingType].unit
            }`
          : `0`;

      console.log(
        `${i} | ${subTask.id} | ${subTask.taskName} | ${subTask.fp} | ${subTask.kcal} | ${subTask.nutrientValues?.carbs} | ${subTask.nutrientValues?.protein} | ${subTask.nutrientValues?.fats} | ${subTask.nutrientValues?.fibre} | ${wt} | ${subTask.servingType} | ${subTask.servingValue} | ${subTask.qtyStep}`,
      );

      subTasks.push(subTask);

      i++;
    }
  }

  return { subTasks };
};

const getSubTasks = async (isExercise: boolean) => {
  if (isExercise) {
    return await admin
      .firestore()
      .collection("subTasks")
      .where("isExercise", "==", true)
      .get();
  } else {
    return await admin.firestore().collection("subTasks").get();
  }
};
