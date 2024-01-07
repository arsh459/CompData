import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { onErrorEmail } from "../utils/sendgrid";
import { ErrorMessage } from "../../../models/ErrorMessage/interface";

export const onErrorCreateFunc = functions
  .region("asia-south1")
  .firestore.document("errors/{errorId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onErrorCreateFunc")) {
        return;
      }

      const error = change.data() as ErrorMessage;

      // send email
      await onErrorEmail(error);
    } catch (error) {
      console.log("error", error);
    }
  });
