import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { updateLedger } from "../../../userLedger/updateLedger";
import { onStoreVisitAdminEmail, onStoreVisitEmail } from "../utils/sendgrid";

export const onReferrerUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onReferrerUpdate")) {
        return;
      }

      const userNow = change.after.data() as UserInterface;
      const prevUser = change.before.data() as UserInterface;

      // if a referrerId is present now
      if (
        userNow.referrerId && // a referId must be present
        userNow.referrerId !== prevUser.referrerId && // can not refer someone again
        userNow.referrerId !== userNow.uid // cannot refer myself
      ) {
        await updateLedger(userNow.uid, userNow.referrerId);
        // send email
        const influencerUser = await getUserById(userNow.referrerId);
        if (influencerUser && influencerUser.email) {
          await onStoreVisitEmail(influencerUser.email, influencerUser.name);
        }

        if (influencerUser)
          await onStoreVisitAdminEmail(
            influencerUser.uid,
            userNow.uid,
            influencerUser.name,
            influencerUser.phone,
            influencerUser.email,
            userNow.name,
            userNow.phone,
            userNow.email,
          );
      }
    } catch (error) {
      console.log("error", error);
    }
  });
