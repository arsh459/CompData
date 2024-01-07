import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import {
  handleNotifyAgent,
  // handleNotifyUser,
  removeReminderForAgent,
} from "../onActivityWrite/handleNotify";
import { handleAlgoliaUpdate } from "./handleAlgoliaUpdate";
import { handleNotifyUserTicket } from "./handleNotifyUserTickets";
// import { RahulUID } from "../../../constants/email/contacts";
// import { Activity } from "../../../models/Activity/Activity";
// import { getUserById } from "../../../models/User/Methods";
// import { handleTaskQueue } from "./handleTaskQueue";

// active
export const onActivityTaskQueueEnterFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/activities/{activityId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onActivityTaskQueueEnterFunc",
        )
      ) {
        return;
      }

      // handle notify user
      const now = change.after.data() as Activity;
      const pre = change.before.data() as Activity | undefined;

      // add to algolia
      try {
        await handleAlgoliaUpdate(now);
      } catch (error) {
        console.log("error");
      }

      // Do nothing if steps activity
      if (now.stepsActive) {
        console.log("step activity");
      } else if (
        now.reviewStatus === "PENDING" &&
        pre?.reviewStatus !== "PENDING" &&
        now.id &&
        now.games?.length
      ) {
        await handleNotifyAgent(
          now.games[0],
          now.authorUID,
          now.id,
          "new_activity",
        );
      } else if (
        pre &&
        now &&
        now.id &&
        pre.reviewStatus === "PENDING" &&
        now.reviewStatus !== "PENDING"
      ) {
        await removeReminderForAgent(now.id);
      }

      // notify user is PENDING
      if (now.notifyUser === "PENDING" && now.games?.length && now.id) {
        await handleNotifyUserTicket(now);
        // await handleNotifyUser(now.games[0], now.authorUID, now.id);
      }

      // let agent know on new activity

      // const userId = context.params.userId;
      // const activityId = context.params.activityId;

      //   const user = await getUserById(userId);

      // await handleTaskQueue(userId, activityId, now, pre);

      //   if (user) {
      //   }

      return;
    } catch (error) {
      console.error(error);
    }
  });
