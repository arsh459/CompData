import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Earning } from "../../../models/Earning/Earning";
// import { reconcileEarningForUser } from "../../../models/LeaderBoard/reconcile/earningReconcile";

export const onEarningUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/earnings/{earnId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onEarningUpdateFunc")) {
        return;
      }

      const userId: string = context.params.userId;
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const earnBefore = change.after.data() as Earning;
      const earnAfter = change.before.data() as Earning;
      if (earnBefore.value !== earnAfter.value && userId) {
        // await reconcileEarningForUser(userId);
      }
    } catch (error) {
      console.error(error);
    }
  });
