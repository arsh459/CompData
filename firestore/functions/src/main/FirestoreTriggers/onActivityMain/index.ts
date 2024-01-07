import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { mainFunc } from "./main";

export const onActivityMainFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/activities/{postId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onActivityMainFunc")) {
        return;
      }

      // handle notify user
      const now = change.after.data() as Activity;
      const pre = change.before.data() as Activity | undefined;
      const uid = context.params.userId;

      //   console.log("UID", uid);

      //   if (uid === RahulUID) {
      await mainFunc(uid, now, pre);
      //   }

      return;
    } catch (error) {
      console.error(error);
    }
  });
