import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Cycle } from "../../../models/User/User";
import { shouldFuncRun } from "./check/shouldFuncRun";
import { updateSymptomsInCycles } from "./main";

export const onCycleUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 360 })
  .firestore.document("users/{userId}/cycles/{cycleId}")
  .onUpdate(async (change, context) => {
    try {
      const uid = context.params.userId;

      const nowCycle = change.after.data() as Cycle;
      const prevCycle = change.before.data() as Cycle;
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onCycleUpdateFunc")) {
        return;
      }

      // cycle date changes
      if (shouldFuncRun(nowCycle, prevCycle)) {
        await updateSymptomsInCycles(uid, nowCycle.id);
      }
    } catch (error) {
      console.error(error);
    }
  });
