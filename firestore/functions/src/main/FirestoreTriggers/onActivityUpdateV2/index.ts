import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Activity } from "../../../models/Activity/Activity";
// import { getTask } from "../../../models/Task/getUtils";
import { updateActivityCredit, updateStepsActivity } from "./updateCredit";
// import { Activity } from "../../../models/Activity/Activity";
import { updateUserKPIs } from "./updateKPIs";

// import { getUserById } from "../../../models/User/Methods";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";
// import { handleActivityUpdateWrapper } from "./handleActivityUpdate";

// active
export const onActivityUpdateV2Func = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/activities/{actId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onActivityUpdateV2Func")
      ) {
        return;
      }

      const userId = context.params.userId;

      //   const user = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      const now = change.after.data() as Activity;
      const pre = change.before.data() as Activity | null;

      await updateUserKPIs(userId);

      // update credits
      const prevFP = Math.round((pre?.calories ? pre.calories : 0) / 300);
      const nowFP = Math.round((now?.calories ? now.calories : 0) / 300);
      await updateActivityCredit(userId, prevFP, nowFP);

      if (now.stepsActive && !pre) {
        const nowUnix = Date.now();
        await updateStepsActivity(userId, nowUnix);
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
