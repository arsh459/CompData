import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { userFollowup } from "../../../models/User/User";
import { handleFollowupV2 } from "./handleFollowupV2";

export const onFollowupWriteMainFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/followups/{followupId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onFollowupWriteMainFunc")
      ) {
        return;
      }

      // handle notify user
      const now = change.after.data() as userFollowup;
      const pre = change.before.data() as userFollowup | undefined;
      const uid = context.params.userId;

      //   console.log("UID", uid);

      //   if (uid === RahulUID) {
      if (now.followupTime !== pre?.followupTime) {
        await handleFollowupV2(uid);
      }
      //   }

      return;
    } catch (error) {
      console.error(error);
    }
  });
