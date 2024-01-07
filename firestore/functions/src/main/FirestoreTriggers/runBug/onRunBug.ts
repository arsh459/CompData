import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
import { updateCalories } from "../../../models/Activity/getUtils";
import { getTask } from "../../../models/Task/getUtils";
// import { updateActivityCredit, updateStepsActivity } from "./updateCredit";
// import { Activity } from "../../../models/Activity/Activity";
// import { updateUserKPIs } from "./updateKPIs";
// import { getUserById } from "../../../models/User/Methods";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";
// import { handleActivityUpdateWrapper } from "./handleActivityUpdate";

export const onRunBugFunc_dep = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/activities/{actId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onRunBugFunc")) {
        return;
      }

      const userId = context.params.userId;

      //   const user = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      const now = change.after.data() as Activity;
      //   const pre = change.before.data() as Activity | null;

      if (now.taskId) {
        const tk = await getTask(now.taskId);

        if (
          tk?.taskType === "path" &&
          now.calories &&
          now.calories > 0 &&
          now.calories <= 10 &&
          now.id
        ) {
          await updateCalories(userId, now.id, 300 * now.calories);
        }
      }

      // const {
      //   after,
      //   calCriterion,
      //   nbMembers,
      //   calThForStreak,
      //   challengeLength,
      //   streakLengthTh,
      // } = await getEventMetrics(now.eventId);

      return;
    } catch (error) {
      console.error(error);
    }
  });
