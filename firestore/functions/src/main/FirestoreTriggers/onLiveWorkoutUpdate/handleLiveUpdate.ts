import { updateLiveStreamActivity } from "../../../models/Activity/getUtils";
import { LiveClass } from "../../../models/Workout/Workout";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleNewWorkoutStream } from "../onWorkoutActivityCreate/createActivityFromStream";

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const handleLiveUpdate = async (
  workout: LiveClass,
  nSeconds: number,
  streamNow: WorkoutActivity,
  seriesId: string,
  videoId: string,
  streamId: string,
) => {
  // await sleep(nSeconds * 1000);

  // update calories in activity after nSeconds
  await updateFunc(workout, nSeconds, streamNow, seriesId, videoId, streamId);
};

const updateFunc = async (
  workout: LiveClass,
  nSeconds: number,
  streamNow: WorkoutActivity,
  seriesId: string,
  videoId: string,
  streamId: string,
) => {
  const now = Date.now();

  if (workout.calories && workout.duration) {
    const streamCalories =
      (workout.calories * (nSeconds + streamNow.streamedSeconds)) /
      (workout.duration * 60);

    // console.log("workout.calories", workout.calories);
    // console.log("nSeconds", nSeconds);
    // console.log("workout.duration", workout.duration);
    // console.log("streamCalories", streamCalories);

    if (streamNow.activityId) {
      await updateLiveStreamActivity(
        streamNow.uid,
        streamNow.activityId,
        seriesId,
        videoId,
        streamId,
        "lives",
        streamCalories,
        now,
        nSeconds,
      );
    } else {
      await handleNewWorkoutStream(
        workout,
        streamNow,
        seriesId,
        videoId,
        streamId,
        "live",
        "live",
        "lives",
      );
    }
  }
};
