import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  getWorkoutStream,
  updateStreamActivityState,
} from "../../../models/Activity/getUtils";
import { getLiveClass } from "../../../models/Workout/getUtils";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { handleLiveUpdate, sleep } from "./handleLiveUpdate";
import { handleWorkoutEndMessage } from "./onLiveEndMessage";
import { isStreamLive } from "./utils";

// import { handleView } from "../../../models/Collection/Methods/addView";
// import {addVisitor} from '../../../models/LeaderBoard/Methods';

export const onLiveWorkoutUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .firestore.document("workouts/{seriesId}/lives/{liveId}/streams/{streamId}")
  .onUpdate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onLiveWorkoutUpdateFunc")
      ) {
        return;
      }

      const seriesId: string = context.params.seriesId;
      const liveId: string = context.params.liveId;
      const streamId: string = context.params.streamId;

      const activityNow = snapshot.after.data() as WorkoutActivity;
      const nSeconds: number = 17;
      //   const activityPre = snapshot.before.data() as WorkoutActivity;

      const workout = await getLiveClass(seriesId, liveId);

      if (activityNow.state === "active") {
        await sleep(nSeconds * 1000);

        const actNow = await getWorkoutStream(
          seriesId,
          liveId,
          streamId,
          "lives",
        );
        // console.log("isStreamLive", isStreamLive(workout));
        if (
          workout &&
          isStreamLive(workout, activityNow.streamLastStarted) &&
          actNow?.state === "active"
        ) {
          await handleLiveUpdate(
            workout,
            nSeconds,
            activityNow,
            seriesId,
            liveId,
            streamId,
          );
        } else {
          // close stream
          await updateStreamActivityState(
            seriesId,
            liveId,
            streamId,
            "lives",
            "inactive",
          );

          if (workout) {
            await handleWorkoutEndMessage(
              seriesId,
              workout,
              activityNow,
              0.5,
              streamId,
              liveId,
            );
          }
        }
      }

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });