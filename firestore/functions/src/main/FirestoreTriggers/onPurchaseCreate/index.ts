import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { Activity } from "../../../models/Activity/Activity";
import { MyPurchase } from "../../../models/MyPurchase/MyPurchase";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import {
  toSauravPhone,
  toSwapnilPhone,
} from "../../../constants/email/contacts";
import { getUserById } from "../../../models/User/Methods";
import { getPurchaseParams } from "./utils";
import { sleep } from "../onLiveWorkoutUpdate/handleLiveUpdate";

export const onPurchaseCreateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 30 })
  .firestore.document("users/{userId}/myPurchases/{purchaseId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onPurchaseCreateFunc")
      ) {
        return;
      }

      const userId = context.params.userId;

      const now = change.data() as MyPurchase;

      // get user message
      const user = await getUserById(userId);

      if (user) {
        const params = getPurchaseParams(user, now);

        if (user?.phone) {
          await sendHSMV2(user.phone, "shop_alert", params);
          await sleep(1000);
        }

        await sendHSMV2(toSwapnilPhone, "shop_alert", params);
        await sleep(1000);

        await sendHSMV2(toSauravPhone, "shop_alert", params);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
