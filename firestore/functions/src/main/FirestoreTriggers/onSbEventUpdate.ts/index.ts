import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { handleChallengeEnd } from "./handleChallengeEnd";
import { handleChildEvents } from "./handleChildEvents";
import { sessionCreate } from "./sessionCreate";
// import { updateEventKey } from "./eventKey";
import { updatePaymentNames } from "./updatePayments";

export const onSbEventUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("sbEvents/{sbEventId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onSbEventUpdateFunc")) {
        return;
      }

      const eventNow = change.after.data() as sbEventInterface;
      const eventPrev = change.before.data() as sbEventInterface;

      // await updateEventKey(eventPrev, eventNow, "sbEvents");
      // await handleChallengeEnd(eventNow, eventPrev);
      await updatePaymentNames(eventPrev, eventNow);
      await sessionCreate(eventNow);
      await handleChildEvents(eventNow);
      return;
    } catch (error) {
      console.log("error", error);
    }
  });
