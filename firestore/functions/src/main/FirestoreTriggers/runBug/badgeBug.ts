import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { UserInterface } from "../../../models/User/User";
import { badgeAdderFunc } from "../../Https/addBadge/main";
import { sleep } from "../onLiveWorkoutUpdate/handleLiveUpdate";

export const onBadgeBugFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onBadgeBugFunc")) {
        return;
      }

      const now = change.after.data() as UserInterface;

      await sleep(5 * 1000);

      // add badgeId
      if (
        now.difficulty &&
        now.currentBodyType &&
        now.desiredBodyType &&
        !now.badgeId &&
        !now.dailyFPTarget &&
        !now.onboarded
      ) {
        await badgeAdderFunc(now, now.uid, now.difficulty);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
