import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { leaderboardQueueHandler } from "./main";
import { markTaskFailed } from "../../../models/LeaderboardUpdateTask/create";
import { LeaderboardUpdateTask } from "../../../models/LeaderboardUpdateTask/LeaderboardUpdateTask";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import { toRahulPhone } from "../../../constants/email/contacts";

// dep
export const onLeaderboardUpdateTaskCreateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 360 })
  .firestore.document("taskQueue/{taskQueueId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      console.log("leaderboardUPDATE", functionEventId);
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onLeaderboardUpdateTaskCreateFunc",
        )
      ) {
        return;
      }

      const now = change.data() as LeaderboardUpdateTask;

      try {
        await leaderboardQueueHandler();
      } catch (e) {
        console.log("ERROR", e);
        const taskQueueId = context.params.taskQueueId;
        await sendHSMV2(toRahulPhone, "new_tech_issue", [
          `taskQueue:${taskQueueId}`,
        ]);
        await markTaskFailed(now.id);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
