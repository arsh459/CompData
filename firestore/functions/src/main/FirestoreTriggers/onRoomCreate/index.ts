import * as functions from "firebase-functions";
// import {
// audienceId,
// audienceStatus,
// } from "../../../constants/mailchimp/audienceDetails";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { handleSakhiInteraction } from "../onActivityMain/handleWorkoutFlag";
// import { onStoreVisitAdminEmail, onStoreVisitEmail } from "../utils/sendgrid";

export const onRoomCreateFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/rooms/{roomId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onRoomCreateFunc")) {
        return;
      }

      const uid = context.params.userId;

      await handleSakhiInteraction(uid);
      return;
    } catch (error) {
      console.error(error);
    }
  });
