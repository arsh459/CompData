import * as functions from "firebase-functions";
// import { ALPHABET_GAME, FAT_BURNER_GAME } from "../../../constants/challenge";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { getTask } from "../../../models/Task/getUtils";
// import { getCurrentMonth } from "../../../models/Activity/handleRanking";
// import { getTask } from "../../../models/Task/getUtils";
// import { summariseKPIHandler } from "../../Https/summariseKPIs/summariseHandler";
import { userBadgeProg } from "./userBadgeProg";
import { userRecProgress } from "./userRecProgress";

// active
export const onBadgeProgressUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .firestore.document("users/{uid}/activities/{activityId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onBadgeProgressUpdateFunc",
        )
      ) {
        return;
      }

      // const activityId: string = context.params.activityId;
      const uid: string = context.params.uid;

      const activity = snapshot.after.data() as Activity;

      // whenever task progress update
      // or run cron

      // const task = await getTask(taskId);

      // if task has a badgeId && task has games associated
      if (activity && activity.taskId && activity.createdOn) {
        // for (const gameId of task.games) {
        await userBadgeProg(uid, activity);

        const task = await getTask(activity?.taskId);
        if (task?.taskType === "nutrition") {
          await userRecProgress(uid, "nutrition", activity.createdOn);
        } else {
          await userRecProgress(uid, "workout", activity.createdOn);
        }

        // update user badge progress
        //   await summariseKPIHandler(uid, gameId);
        // }
      }

      return;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
