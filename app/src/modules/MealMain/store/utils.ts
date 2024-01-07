import { Activity, SubTaskScore } from "@models/Activity/Activity";
import { SubTask, Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { getSelectedActivityV2 } from "@utils/task/taskProgress";
import { SubTaskState } from "./useMealStore";

const dayMS = 24 * 60 * 60 * 1000;

export const getTask = async (taskId: string): Promise<Task | null> => {
  const taskDoc = await firestore().collection("tasks").doc(taskId).get();

  return taskDoc.data() as Task | null;
};

export const getActivity = async (
  uid: string,
  taskId: string,
  selectedUnix: number
): Promise<Activity | null> => {
  const activities = await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("createdOn", ">=", selectedUnix)
    .where("createdOn", "<=", selectedUnix + dayMS)
    .where("taskId", "==", taskId)
    .get();

  if (activities.docs.length) {
    const userRelevantActs: Activity[] = [];
    for (const doc of activities.docs) {
      const remoteDoc = doc.data() as Activity | null;

      if (remoteDoc) {
        userRelevantActs.push(remoteDoc);
      }
    }

    const selectedAct = getSelectedActivityV2(userRelevantActs);

    if (selectedAct) {
      return selectedAct;
    }
  }
  return null;
};

export const getIsLocked = (selectedUnix: number): boolean => {
  const initNowDate = new Date();

  const todayUnix = new Date(
    initNowDate.getFullYear(),
    initNowDate.getMonth(),
    initNowDate.getDate(),
    0,
    0,
    0,
    0
  ).getTime();

  if (selectedUnix >= todayUnix + dayMS) {
    return true;
  }
  return false;
};

export const getSubTasks = async (
  ids: string[]
): Promise<{ [id: string]: SubTask }> => {
  const subTasksPromises = ids.map((id) =>
    firestore().collection("subTasks").doc(id).get()
  );

  const subTasksDocs = await Promise.all(subTasksPromises);

  const subTasks: { [id: string]: SubTask } = {};

  subTasksDocs.forEach((doc) => {
    if (doc.data()) {
      const subTask = doc.data() as SubTask;
      subTasks[subTask.id] = subTask;
    }
  });

  return subTasks;
};

export const getSubTasksState = (
  subTaskQty: SubTaskScore,
  subTasks: { [id: string]: SubTask }
): { subTasksState: { [id: string]: SubTaskState }; localFP: number } => {
  const subTasksState: { [id: string]: SubTaskState } = {};
  let localFP: number = 0;

  Object.keys(subTaskQty).forEach((subTaskId) => {
    const qty = subTaskQty[subTaskId];
    const subTask = subTasks[subTaskId];

    localFP += subTask.fp || 0;

    subTasksState[subTaskId] = {
      subTaskQty: qty,
      subTaskScore: subTask?.fp || 0,
      macros: subTask?.nutrientValues,
      totalKcalConsumed: subTask?.kcal,
    };
  });

  return { subTasksState, localFP };
};

export const calculateTotalNutrition = (remotesubTaskState: {
  [x: string]: SubTaskState;
}) => {
  let kcal: number = 0;
  let carbs: number = 0;
  let protein: number = 0;
  let fats: number = 0;
  let fiber: number = 0;

  for (const key of Object.keys(remotesubTaskState)) {
    const values = remotesubTaskState[key];
    if (values.subTaskQty && values.macros) {
      const macroValues = values.macros;

      carbs += (macroValues.carbs ? macroValues.carbs : 0) * values.subTaskQty;
      protein +=
        (macroValues.protein ? macroValues.protein : 0) * values.subTaskQty;
      fats += (macroValues.fats ? macroValues.fats : 0) * values.subTaskQty;
      fiber += (macroValues.fibre ? macroValues.fibre : 0) * values.subTaskQty;
    }

    if (values.subTaskQty && values.totalKcalConsumed) {
      kcal += values.totalKcalConsumed * values.subTaskQty;
    }
  }

  return {
    kcal,
    carbs,
    protein,
    fats,
    fiber,
  };
};
