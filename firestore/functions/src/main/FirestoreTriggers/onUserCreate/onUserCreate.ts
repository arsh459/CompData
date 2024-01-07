import * as functions from "firebase-functions";
// import {
// audienceId,
// audienceStatus,
// } from "../../../constants/mailchimp/audienceDetails";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { addUserToList } from "../../../mailchimp";
// import { addEmailStatus } from "../../../models/User/emailSets";
// import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { addInviteURL } from "../../../user/addInviteURL";
import { updateLedger } from "../../../userLedger/updateLedger";
// import { onStoreVisitAdminEmail, onStoreVisitEmail } from "../utils/sendgrid";

export const onUserCreateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onUserCreate")) {
        return;
      }

      const userObj = change.data() as UserInterface;

      // await addEmailStatus(userObj.uid, Date.now(), "unixWelcomeEmail");

      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());

      await addInviteURL(userObj.uid, "influencer", userObj.instagramHandle);
      // await addUserToList(userObj, audienceId, audienceStatus);

      // if the user is referred by someone
      if (userObj.referrerId && userObj.referrerId !== userObj.uid) {
        await updateLedger(userObj.uid, userObj.referrerId);
        // const influencerUser = await getUserById(userObj.referrerId);

        // if (influencerUser && influencerUser.email) {
        //   await onStoreVisitEmail(influencerUser.email, influencerUser.name);
        // }

        // if (influencerUser) {
        //   await onStoreVisitAdminEmail(
        //     influencerUser.uid,
        //     userObj.uid,
        //     influencerUser.name,
        //     influencerUser.phone,
        //     influencerUser.email,
        //     userObj.name,
        //     userObj.phone,
        //     userObj.email,
        //   );
        // }
      }
    } catch (error) {
      console.error(error);
    }
  });
