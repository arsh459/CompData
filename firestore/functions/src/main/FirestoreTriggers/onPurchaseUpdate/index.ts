import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { Activity } from "../../../models/Activity/Activity";
import { MyPurchase } from "../../../models/MyPurchase/MyPurchase";
import { updatePurchaseDebit } from "./updatePurchaseDebit";
// import { updateActivityCredit } from "./updateCredit";
// import { Activity } from "../../../models/Activity/Activity";
// import { updateUserKPIs } from "./updateKPIs";
// import { getUserById } from "../../../models/User/Methods";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";
// import { handleActivityUpdateWrapper } from "./handleActivityUpdate";

export const onPurchaseUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("users/{userId}/myPurchases/{purchaseId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onPurchaseUpdateFunc")
      ) {
        return;
      }

      const userId = context.params.userId;

      //   const user = await getUserById(userId);
      // const after = new Date("Mon Nov 29 2021").getTime();

      const now = change.after.data() as MyPurchase | null;
      const pre = change.before.data() as MyPurchase | null;

      // update credits
      const prevFP = pre?.value ? pre.value : 0;
      const nowFP = now?.value ? now.value : 0;
      await updatePurchaseDebit(userId, prevFP, nowFP);

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
