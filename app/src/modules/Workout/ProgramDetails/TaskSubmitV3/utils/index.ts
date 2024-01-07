import { Task } from "@models/Tasks/Task";

// event object
export const eventObj = (task?: Task) => {
  return {
    taskId: task ? task.id : "no_taskId",
    taskName: task?.name ? task.name : "no_taskName",
    fps: task?.fitPoints ? task.fitPoints : -1,
    duration: task?.durationMinutes ? task.durationMinutes : -1,
    isPro: !task?.freeTask ? 1 : 0,
  };
};
