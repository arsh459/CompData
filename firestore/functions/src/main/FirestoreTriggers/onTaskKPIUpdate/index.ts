import * as functions from "firebase-functions";
// import { ALPHABET_GAME, FAT_BURNER_GAME } from "../../../constants/challenge";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { getCurrentMonth } from "../../../models/Activity/handleRanking";
import { getTask } from "../../../models/Task/getUtils";
import { summariseKPIHandler } from "../../Https/summariseKPIs/summariseHandler";

export const onTaskKPIUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("tasks/{taskId}/taskProgress/{uid}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onTaskKPIUpdateFunc")) {
        return;
      }

      const taskId: string = context.params.taskId;
      const uid: string = context.params.uid;

      // whenever task progress update
      // or run cron

      const task = await getTask(taskId);

      if (task && task.games) {
        for (const gameId of task.games) {
          await summariseKPIHandler(uid, gameId);
        }
      }

      return;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
