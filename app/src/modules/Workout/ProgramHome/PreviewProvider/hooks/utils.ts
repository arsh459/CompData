import { Task } from "@models/Tasks/Task";
import { TargetInterface } from "./usePreviewTaskStore";
import { ViewToken } from "react-native";

export const recusiveFunc = (
  arr: Task[],
  i: number,
  n: number
): TargetInterface => {
  const taskId = arr[i] ? arr[i].id : "";
  if (i < n - 1) {
    return { taskId, nextTarget: recusiveFunc(arr, i + 1, n) };
  } else {
    return { taskId };
  }
};

export const getTaskFromViewTocken = (viewableItems: ViewToken[]): Task[] => {
  const targetsTasks: Task[] = [];
  viewableItems.forEach((each) => {
    if (each.isViewable) {
      const task = each.item as Task;
      if (task.previewMedia) {
        targetsTasks.push(task);
      }
    }
  });
  return targetsTasks;
};
