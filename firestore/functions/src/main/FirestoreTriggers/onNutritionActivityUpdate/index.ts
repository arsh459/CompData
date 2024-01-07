import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { userNutritionUpdate } from "./userNutritionUpdate";

// active
export const onNutritionActivityUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .firestore.document("users/{uid}/activities/{activityId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(
          functionEventId,
          "onNutritionActivityUpdateFunc",
        )
      ) {
        return;
      }

      const uid: string = context.params.uid;

      const activity = snapshot.after.data() as Activity;

      if (
        activity.source === "nutrition" &&
        activity.reviewStatus === "REVIEWED"
      ) {
        await userNutritionUpdate(uid, activity.createdOn);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
