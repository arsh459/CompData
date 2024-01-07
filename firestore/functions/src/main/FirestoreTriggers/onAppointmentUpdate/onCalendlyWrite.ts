import * as functions from "firebase-functions";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { CalendlySession } from "../../../models/Appointments/interface";

export const onCalendlyWriteFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 30 })
  .firestore.document("calendly/{calendlyId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onCalendlyWriteFunc")) {
        return;
      }

      const nowApp = change.after.data() as CalendlySession;
      const preApp = change.before.data() as CalendlySession;

      // track slot request
      if (nowApp && !preApp && nowApp.uid) {
        await mixpanel.track("slot_request_server", {
          distinct_id: nowApp.uid,
        });

        await mixpanel.people.set(nowApp.uid, {
          attempt_slot_booking: new Date(),
        });

        await mixpanel.people.increment(nowApp.uid, {
          nb_attempts_slot_bookings: 1,
        });
      }

      if (nowApp.status === "DONE" && preApp.status !== "DONE") {
        await mixpanel.track("slot_schedule_server", {
          distinct_id: nowApp.uid,
        });

        await mixpanel.people.increment(nowApp.uid, {
          nb_slot_bookings: 1,
        });
      } else if (nowApp.status === "FAILED" && preApp.status !== "FAILED") {
        await mixpanel.track("slot_failed_server", {
          distinct_id: nowApp.uid,
        });

        await mixpanel.people.increment(nowApp.uid, {
          nb_fail_bookings: 1,
        });
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
