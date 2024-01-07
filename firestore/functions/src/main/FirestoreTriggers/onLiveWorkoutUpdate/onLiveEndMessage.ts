import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getWorkoutSeries } from "../../../models/Workout/getUtils";
import { LiveClass } from "../../../models/Workout/Workout";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";

export const handleWorkoutEndMessage = async (
  seriesId: string,
  workout: LiveClass,
  activity: WorkoutActivity,
  finishTh: number,
  streamId: string,
  liveId: string,
) => {
  if (
    workout.duration &&
    activity.streamedSeconds &&
    activity.streamedSeconds / (workout.duration * 60) >= finishTh
  ) {
    const workoutSeries = await getWorkoutSeries(seriesId);

    if (workoutSeries?.eventIds) {
      for (const evId of workoutSeries?.eventIds) {
        const creatorEvent = await getSbEventById(evId);

        if (creatorEvent?.parentId) {
          const parentEvent = await getSbEventById(creatorEvent?.parentId);

          if (parentEvent?.state === "active") {
            const reminder = createReminder(
              false,
              "post_workout_finish",
              workout.ownerUID,
              undefined,
              evId,
              undefined,
              undefined,
              activity.uid,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              parentEvent.id,
              seriesId,
              streamId,
              "lives",
              liveId,
            );

            await saveReminderInDB(reminder);
          }
        }
      }
    }
  }
};
