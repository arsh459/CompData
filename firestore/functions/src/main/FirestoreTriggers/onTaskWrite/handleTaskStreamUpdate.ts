import { updateTaskStreamActivity } from "../../../models/Activity/getUtils";
import { Task } from "../../../models/Task/Task";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleNewTaskStream } from "../onWorkoutActivityCreate/createActivityFromStream";

export const handleTaskStreamUpdate = async (
  task: Task,
  streamNow: WorkoutActivity,
) => {
  if (streamNow.activityId) {
    await updateTaskStreamActivity(
      streamNow.uid,
      streamNow.activityId,
      getStreamedFitPoints(task, streamNow),
      Date.now(),
      streamNow.postRef,
    );
  } else {
    await handleNewTaskStream(task, streamNow);
  }
};

const getStreamedFitPoints = (task: Task, stream: WorkoutActivity) => {
  if (task.fitPoints && task.durationMinutes && stream.streamedSeconds) {
    const fPoints =
      task.fitPoints * (stream.streamedSeconds / (task.durationMinutes * 60));

    return Math.floor(fPoints);
  }

  return 0;
};
