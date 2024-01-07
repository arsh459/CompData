import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { getUserById } from "../../../models/User/Methods";
// import { handleNotifyUser } from "./handleNotify";
import { handleWriteHelper } from "./handleWriteHelper";

// dep
export const onActivityWriteFunc_dep = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "2GB" })
  .firestore.document("users/{userId}/activities/{activityId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onActivityWriteFunc")) {
        return;
      }

      const userId = context.params.userId;
      const activityId = context.params.activityId;

      const user = await getUserById(userId);

      const now = change.after.data() as Activity;
      const pre = change.before.data() as Activity;

      if (user) {
        await handleWriteHelper(user, now, activityId, pre);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
