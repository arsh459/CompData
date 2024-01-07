import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getWorkout } from "../../../models/Workout/getUtils";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleNewWorkoutStream } from "./createActivityFromStream";

// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onWorkoutActivityCreateFunc = functions
  .region("asia-south1")
  .firestore.document(
    "workouts/{seriesId}/exercises/{videoId}/streams/{streamId}",
  )
  .onCreate(async (snapshot, context) => {
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

      const activity = snapshot.data() as WorkoutActivity;
      const remoteWorkout = await getWorkout(seriesId, videoId);

      if (remoteWorkout) {
        await handleNewWorkoutStream(
          remoteWorkout,
          activity,
          seriesId,
          videoId,
          streamId,
          "video",
          "ondemandVideo",
          "exercises",
        );
      }

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
