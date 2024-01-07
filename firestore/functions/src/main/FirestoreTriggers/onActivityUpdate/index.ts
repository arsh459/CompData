import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { getUserById } from "../../../models/User/Methods";
import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";
import { handleActivityUpdateWrapper } from "./handleActivityUpdate";

export const onActivityUpdateFunc_dep = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/activities/{postId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onActivityUpdateFunc")
      ) {
        return;
      }

      const userId = context.params.userId;

      const user = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      const now = change.after.data() as Activity;
      const pre = change.before.data() as Activity;

      // const {
      //   after,
      //   calCriterion,
      //   nbMembers,
      //   calThForStreak,
      //   challengeLength,
      //   streakLengthTh,
      // } = await getEventMetrics(now.eventId);

      if (user) {
        await handleActivityUpdateWrapper(pre, now, user);

        if (
          typeof pre.calories === "number" &&
          typeof now.calories === "number"
        ) {
          await updateTotalCalories(user.uid, pre.calories, now.calories);
        }
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
