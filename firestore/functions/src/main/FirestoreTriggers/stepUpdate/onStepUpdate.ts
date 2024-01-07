import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { Activity } from "../../../models/Activity/Activity";
import { StepsDoc } from "../../../models/StepDoc/StepDoc";
import { dailyStepsHandler } from "./dailyStepsHandler";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { getUserById } from "../../../models/User/Methods";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";

export const onStepUpdateFunc = functions
  .region("asia-south1")
  // .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/steps/{stepDocId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStepUpdateFunc")) {
        return;
      }

      const userId = context.params.userId;

      //   const user = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      // whenever a step doc is updated
      const stepDoc = change.after.data() as StepsDoc;
      const pre = change.before.data() as StepsDoc;

      // const {
      //   after,
      //   calCriterion,
      //   nbMembers,
      //   calThForStreak,
      //   challengeLength,
      //   streakLengthTh,
      // } = await getEventMetrics(now.eventId);
      // console.log("u", userId, stepDoc.steps);

      // new step doc
      if (userId && stepDoc && !pre) {
        await dailyStepsHandler(userId, stepDoc);
      } else if (userId && stepDoc && pre) {
        const nowSteps = stepDoc.steps;
        const preSteps = pre.steps;

        const nowStepsFloor = Math.floor(nowSteps / 1000);
        const preStepsFloor = Math.floor(preSteps / 1000);

        // console.log("nowStepsFloor", userId, nowStepsFloor);
        // console.log("preStepsFloor", userId, preStepsFloor);

        if (nowStepsFloor !== preStepsFloor) {
          await dailyStepsHandler(userId, stepDoc);
        }
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
