import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getWorkout } from "../../../models/Workout/getUtils";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleStreamUpdate } from "./handleStreamUpdate";

// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onWorkoutActivityUpdateFunc = functions
  .region("asia-south1")
  .firestore.document(
    "workouts/{seriesId}/exercises/{videoId}/streams/{streamId}",
  )
  .onUpdate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onWorkoutActivityUpdateFunc",
        )
      ) {
        return;
      }

      const seriesId: string = context.params.seriesId;
      const videoId: string = context.params.videoId;
      const streamId: string = context.params.streamId;

      const activityNow = snapshot.after.data() as WorkoutActivity;
      const activityPre = snapshot.before.data() as WorkoutActivity;

      if (activityNow.streamedSeconds !== activityPre.streamedSeconds) {
        const workout = await getWorkout(seriesId, videoId);
        if (workout) {
          await handleStreamUpdate(
            workout,
            activityNow,
            seriesId,
            videoId,
            streamId,
          );
        }
      }

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
