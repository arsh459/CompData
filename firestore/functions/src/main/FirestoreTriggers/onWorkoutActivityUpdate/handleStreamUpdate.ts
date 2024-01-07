import { updateStreamActivity } from "../../../models/Activity/getUtils";
import { Workout } from "../../../models/Workout/Workout";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import {
  getStreamedCalories,
  handleNewWorkoutStream,
} from "../onWorkoutActivityCreate/createActivityFromStream";

export const handleStreamUpdate = async (
  workout: Workout,
  streamNow: WorkoutActivity,
  seriesId: string,
  videoId: string,
  streamId: string,
) => {
  const nowCals = getStreamedCalories(workout, streamNow.streamedSeconds);

  if (streamNow.activityId) {
    await updateStreamActivity(
      streamNow.uid,
      streamNow.activityId,
      nowCals,
      streamNow.updatedOn,
    );
  } else {
    await handleNewWorkoutStream(
      workout,
      streamNow,
      seriesId,
      videoId,
      streamId,
      "video",
      "ondemandVideo",
      "exercises",
    );
  }
};
