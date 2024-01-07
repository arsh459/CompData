import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { ActivityTicket } from "../../../models/Activity/Activity";
import { getAllActivityById } from "../../../models/Activity/getUtils";
import {
  //   handleNotifyAgent,
  ticketReminderCreate,
  // handleNotifyUser,
  //   removeReminderForAgent,
} from "../onActivityWrite/handleNotify";

// import { Activity } from "../../../models/Activity/Activity";
// import { getUserById } from "../../../models/User/Methods";
// import { handleTaskQueue } from "./handleTaskQueue";

export const onTicketUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document(
    "users/{userId}/activities/{activityId}/tickets/{ticketId}",
  )
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onTicketUpdateFunc")) {
        return;
      }

      // handle notify user
      const pre = change.before.data() as ActivityTicket | undefined;
      const now = change.after.data() as ActivityTicket;

      const activityId = context.params.activityId;
      const userId = context.params.userId;

      const act = await getAllActivityById(userId, activityId);

      // notify user is PENDING
      if (
        pre &&
        pre.reviewStatus !== "REVIEWED" &&
        now.reviewStatus === "REVIEWED" &&
        act &&
        act.postId &&
        act.taskId &&
        act.games?.length
      ) {
        await ticketReminderCreate(
          act.games[0],
          now.createdBy,
          act.id ? act.id : act.postId,
          act.postId,
          act.taskId,
          "ticket_resolved",
        );
        // await handleNotifyUser(now.games[0], now.authorUID, now.id);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
