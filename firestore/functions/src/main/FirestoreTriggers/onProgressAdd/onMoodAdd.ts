import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { dailyMoodObj } from "../../../models/dailyKPIs/interface";
import { trackMetricChange } from "../onUserUpdate/updateFPConv";
import { progressUpdateWrapper } from "../../Https/updateRoadmap/main/progressUpdateWrapper";

export const onMoodAddFunc = functions
  .region("asia-south1")
  // .runWith({ timeoutSeconds: 360 })
  .firestore.document("users/{userId}/dailyMood/{moodId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onMoodAddFunc")) {
        return;
      }

      const mood = change.after.data() as dailyMoodObj;
      const bf_mood = change.before.data() as dailyMoodObj | undefined;
      const uid = context.params.userId;

      if (typeof mood.mood === "number" && mood.mood !== bf_mood?.mood) {
        await trackMetricChange("user_mood_log", uid, {
          value: mood.mood,
        });

        await progressUpdateWrapper(uid);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
