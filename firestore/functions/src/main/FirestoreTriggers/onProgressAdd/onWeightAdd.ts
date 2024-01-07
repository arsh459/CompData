import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { dailyWeightObj } from "../../../models/dailyKPIs/interface";
import { trackMetricChange } from "../onUserUpdate/updateFPConv";
import { progressUpdateWrapper } from "../../Https/updateRoadmap/main/progressUpdateWrapper";

export const onWeightAddFunc = functions
  .region("asia-south1")
  // .runWith({ timeoutSeconds: 360 })
  .firestore.document("users/{userId}/dailyWeight/{weightId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onWeightAddFunc")) {
        return;
      }

      const wt = change.after.data() as dailyWeightObj;
      const bf_wt = change.before.data() as dailyWeightObj | undefined;

      const uid = context.params.userId;

      if (wt.weight && wt.weight !== bf_wt?.weight) {
        await trackMetricChange("user_weight_log", uid, {
          value: wt.weight,
        });

        await progressUpdateWrapper(uid);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
