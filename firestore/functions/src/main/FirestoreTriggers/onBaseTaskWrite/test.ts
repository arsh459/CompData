import * as functions from "firebase-functions";
import * as cors from "cors";
import { badgeProgressUpdaterV2 } from "./badgeUpdater";
import { getTask } from "../../../models/Task/getUtils";
// import {
//   getWorkoutStream,
//   updateStreamActivityState,
// } from "../../../models/Activity/getUtils";
// import { getTask } from "../../../models/Task/getUtils";
// import { getLiveClass } from "../../../models/Workout/getUtils";
// import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
// import { handleTaskSummary } from "./handleTaskSummary";

const corsHandler = cors({ origin: true });
export const onBaseTaskWriteTestFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    //   .firestore.document("tasks/{taskId}")
    corsHandler(request, response, async () => {
      try {
        const { taskId } = request.body as { taskId: string };
        const taskA = await getTask(taskId);

        //   const taskA = snapshot.after.data() as Task | undefined;
        //   const taskB = snapshot.before.data() as Task | undefined;
        console.log("taskName", taskA?.name);

        if (taskA) await badgeProgressUpdaterV2(taskA);

        return response.status(200).send({ status: "success" });
        // if task exists
        // await handleTaskSummary();
      } catch (error) {
        return response.status(500).send({ status: "error" });
        console.error(error);
      }
    });
  });
