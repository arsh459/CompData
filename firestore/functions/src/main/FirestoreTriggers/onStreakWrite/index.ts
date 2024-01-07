import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { StreakDataInterface } from "../../../models/Streak/streakInterface";
import { handleStreakWriteMain } from "./main";

export const onStreakWriteFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/streaks/{streakId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStreakWriteFunc")) {
        return;
      }

      // handle notify user
      const now = change.after.data() as StreakDataInterface;
      const pre = change.before.data() as StreakDataInterface | undefined;
      const uid = context.params.userId;

      // new streak
      //   if (now.sta)
      await handleStreakWriteMain(uid, now, pre);

      /**
       *
       *
       *
       *
       */

      return;
    } catch (error) {
      console.error(error);
    }
  });
