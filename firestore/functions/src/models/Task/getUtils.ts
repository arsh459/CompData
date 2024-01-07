import * as admin from "firebase-admin";
import { SubTask, Task, TaskProgress, TaskSummary, TaskTypes } from "./Task";

export const getTaskByBadgeDay = async (badgeId: string, day: number) => {
  const taskDocs = await admin
    .firestore()
    .collection("tasks")
    .where("badgeDays", "array-contains", `${badgeId}_${day}`)
    .get();

  const taskList: Task[] = [];
  for (const task of taskDocs.docs) {
    taskList.push(task.data() as Task);
  }

  return taskList;
};

export const getSubtaskById = async (id: string) => {
  const taskDocs = await admin.firestore().collection("subTasks").doc(id).get();

  if (taskDocs.data()) {
    return taskDocs.data() as SubTask;
  }

  return undefined;
};

export const getTaskBySchedule = async (
  badgeId: string,
  start: number,
  end: number,
) => {
  try {
    const taskDocs = await admin
      .firestore()
      .collection("tasks")
      .where("liveOn", ">=", start)
      .where("liveOn", "<=", end)
      .get();

    const taskList: Task[] = [];
    for (const task of taskDocs.docs) {
      taskList.push(task.data() as Task);
    }

    return taskList;
  } catch (error) {
    console.log("error", error);
  }

  return [];
};

export const getTask = async (id: string) => {
  try {
    const stream = await admin.firestore().collection("tasks").doc(id).get();

    if (stream.exists) {
      // console.log("TASK READ", 1);
      return stream.data() as Task;
    }
  } catch (error) {
    console.log("error", error);
  }

  return undefined;
};

export const getAllTasks = async () => {
  const tasks = await admin.firestore().collection("tasks").get();

  const tks: Task[] = [];
  for (const tk of tasks.docs) {
    tks.push(tk.data() as Task);
  }

  return tks;
};

export const getAllTasksByType = async (type: TaskTypes) => {
  const tasks = await admin
    .firestore()
    .collection("tasks")
    .where("taskType", "==", type)
    .get();

  const tks: Task[] = [];
  for (const tk of tasks.docs) {
    tks.push(tk.data() as Task);
  }

  return tks;
};

export const getAllGameTasks = async (gameId: string) => {
  const tasks = await admin
    .firestore()
    .collection("tasks")
    .where("gameTask", "==", true)
    .where("games", "array-contains", gameId)
    .get();

  const tks: Task[] = [];
  for (const tk of tasks.docs) {
    tks.push(tk.data() as Task);
  }

  return tks;
};
export const getAllTasksBySubTask = async (subTaskId: string) => {
  const tasks = await admin
    .firestore()
    .collection("tasks")
    .where("subTasks", "array-contains", { id: subTaskId })
    .get();

  const tks: Task[] = [];
  for (const tk of tasks.docs) {
    tks.push(tk.data() as Task);
  }

  return tks;
};

export const getTaskProgress = async (uid: string, taskId: string) => {
  const prog = await admin
    .firestore()
    .collection("tasks")
    .doc(taskId)
    .collection("taskProgress")
    .doc(uid)
    .get();

  if (prog.exists) {
    return prog.data() as TaskProgress;
  }

  return undefined;
};

export const saveTaskSummaries = async (
  gameId: string,
  taskSummaries: TaskSummary[],
) => {
  for (const summary of taskSummaries) {
    const prevSummary = await admin
      .firestore()
      .collection("taskGames")
      .doc(gameId)
      .collection("summaries")
      .where("name", "==", summary.name)
      .get();

    // console.log("hi", gameId, summary.name, prevSummary.docs.length);

    if (prevSummary.docs.length) {
      const prev = prevSummary.docs[0].data() as TaskSummary;

      await admin
        .firestore()
        .collection("taskGames")
        .doc(gameId)
        .collection("summaries")
        .doc(prev.summaryId)
        .set({
          ...summary,
          summaryId: prev.summaryId,
        });
    } else {
      await admin
        .firestore()
        .collection("taskGames")
        .doc(gameId)
        .collection("summaries")
        .doc(summary.summaryId)
        .set(summary);
    }
  }
};
