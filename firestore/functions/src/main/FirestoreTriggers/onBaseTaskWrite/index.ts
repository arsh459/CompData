import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Task } from "../../../models/Task/Task";
import { badgeProgressUpdaterV2 } from "./badgeUpdater";
// import {
//   getWorkoutStream,
//   updateStreamActivityState,
// } from "../../../models/Activity/getUtils";
// import { getTask } from "../../../models/Task/getUtils";
// import { getLiveClass } from "../../../models/Workout/getUtils";
// import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
// import { handleTaskSummary } from "./handleTaskSummary";

export const onBaseTaskWriteFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 100 })
  .firestore.document("tasks/{taskId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onBaseTaskWriteFunc")) {
        return;
      }

      const taskA = snapshot.after.data() as Task | undefined;
      const taskB = snapshot.before.data() as Task | undefined;

      const bDaysA = taskA?.badgeDays;
      const bDaysB = taskB?.badgeDays;

      let run: boolean = false;
      // const toUpdateDays: number[] = [];

      if (bDaysA && !bDaysB) {
        run = true;
      }

      if (bDaysA && bDaysB) {
        if (bDaysA.length !== bDaysB.length) {
          run = true;
        }

        for (const bDay of bDaysA) {
          if (!bDaysB.includes(bDay)) {
            run = true;
          }
        }
      }

      console.log("RUN VALUE", run);

      if (run && taskA) {
        // change to V2
        await badgeProgressUpdaterV2(taskA);
      }

      return;
      // if task exists
      // await handleTaskSummary();
    } catch (error) {
      console.error(error);
    }
  });
