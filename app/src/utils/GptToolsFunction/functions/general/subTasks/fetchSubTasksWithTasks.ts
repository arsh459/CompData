import { SubTask, Task } from "@models/Tasks/Task";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { fetchConfigDetails } from "../config/fetchConfigDetails";
import { getMetricDetailsForSubTask } from "./getMetricsDetailsForSubTask";

export const fetchSubTasksWithTasks = async (task: Task) => {
  const promises: Promise<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  >[] = [];

  if (!task.subTasks) {
    return task;
  }

  for (const parsedTk of task.subTasks) {
    const promise = firestore()
      .collection("subTasks")
      .doc(parsedTk.subTaskId)
      .get();
    promises.push(promise);
  }

  const results = await Promise.all(promises);
  const config = await fetchConfigDetails();

  let remoteSubTasks: SubTask[] = [];
  results.forEach((remTask, index) => {
    const stk = remTask.data() as SubTask;

    if (stk) {
      const metric = getMetricDetailsForSubTask(stk, config?.nutritionMetrics);

      let qtyInTask =
        (task.subTasks && task.subTasks[index] && task.subTasks[index].qty) ||
        1;
      let servingValue = stk.servingValue || stk.gptInfo?.gptServingValue || 1;
      let servingType =
        stk.servingType || stk.gptInfo?.gptServingType || "piece";
      let { taskMedia, ...formattedSubTask } = stk;

      remoteSubTasks.push({
        ...formattedSubTask,
        recommendedQty: servingValue * qtyInTask,
        unitForRecomendedQuantity: servingType,
        gramEquivalentToRecommendedQty:
          metric && metric.value
            ? metric.value * qtyInTask
            : servingValue * qtyInTask,
        loggingEquivalentToRecommendedQty: qtyInTask,
        qtyStep: stk.qtyStep || 0.5,
      });
    }
  });

  let updatedData: Task = {
    ...task,
    subTaskDetails: remoteSubTasks,
  };

  return updatedData;
};
