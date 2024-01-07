import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { goalObj } from "../../../models/User/User";
import { onDailyGoalUpdateMain } from "./main";

export const onDailyGoalUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/dailyGoals/{goalId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onDailyGoalUpdateFunc")
      ) {
        return;
      }

      // handle notify user
      const now = change.after.data() as goalObj;
      const pre = change.before.data() as goalObj | undefined;
      const uid = context.params.userId;

      await onDailyGoalUpdateMain(uid, now, pre);

      return;
    } catch (error) {
      console.error(error);
    }
  });
