import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getLiveClass } from "../../../models/Workout/getUtils";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleNewWorkoutStream } from "../onWorkoutActivityCreate/createActivityFromStream";
// import { handleNewWorkoutStream } from "./createActivityFromStream";

// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onLiveWorkoutCreateFunc = functions
  .region("asia-south1")
  .firestore.document("workouts/{seriesId}/lives/{liveId}/streams/{streamId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onLiveWorkoutCreateFunc")
      ) {
        return;
      }

      const seriesId: string = context.params.seriesId;
      const liveId: string = context.params.liveId;
      const streamId: string = context.params.streamId;

      const activity = snapshot.data() as WorkoutActivity;
      const remoteWorkout = await getLiveClass(seriesId, liveId);

      if (remoteWorkout) {
        await handleNewWorkoutStream(
          remoteWorkout,
          activity,
          seriesId,
          liveId,
          streamId,
          "live",
          "live",
          "lives",
        );
      }

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
