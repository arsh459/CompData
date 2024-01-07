import { Task } from "@models/Tasks/Task";

export const getStepsConversion = (task?: Task) => {
  if (task?.stepsToDo && task?.fitPoints) {
    return {
      steps: task.stepsToDo,
      fp: task.fitPoints,
    };
  }

  return {
    steps: 1000,
    fp: 1,
  };
};
