import { updateTaskState } from "./getUtils";
import { Reminder, TaskState } from "./Reminder";

export const handleTaskState = async (
  reminder: Reminder,
  state: boolean,
  successState: TaskState,
  failedState: TaskState,
) => {
  if (state) {
    await updateTaskState(reminder, successState);
  } else {
    await updateTaskState(reminder, failedState);
  }
};
