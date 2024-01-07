import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  deleteReminders,
  getSlotReminderForBookingId,
} from "../../../models/Reminders/createUtils";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { resolveTicket } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
import { SlotBooking } from "../../../models/slots/Slot";
// import { addSlotBooking } from "../onUserUpdate/updateFPConv";
// import { Activity } from "../../../models/Activity/Activity";
// import { dailyStepsHandler } from "./dailyStepsHandler";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { getUserById } from "../../../models/User/Methods";
// import { stepActivityHandler } from "./stepActivityHandler";
// import { updateTotalCalories } from "../onActivityCreate/updateTotalCalories";

export const onSlotBookingWriteFunc = functions
  .region("asia-south1")
  .firestore.document("slots/{slotId}/slotBooking/{slotBookingId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onSlotBookingWriteFunc")
      ) {
        return;
      }

      const sBookingNow = change.after.data() as SlotBooking;
      const sBookingBef = change.before.data() as SlotBooking;
      // const sBookingPrev = change.before.data() as SlotBooking;

      if (sBookingNow.status && sBookingNow.status !== "PENDING") {
        try {
          await resolveTicket(
            sBookingNow.id,
            process.env.PAGER_DUTY_SLOT_BOOKING,
          );
        } catch (error) {
          console.log("Resolution failed");
        }
      }

      // rescheduled or not interested
      if (
        sBookingNow.status === "RESCHEDULED" ||
        sBookingNow.status === "NOT_INTERESTED"
      ) {
        const previousReminders = await getSlotReminderForBookingId(
          sBookingNow.id,
        );
        await deleteReminders(previousReminders);
      }

      if (sBookingNow && !sBookingBef) {
        await mixpanel.track("slot_request_server", {
          distinct_id: sBookingNow.uid,
          source: "v1",
        });

        await mixpanel.people.set(sBookingNow.uid, {
          attempt_slot_booking: new Date(),
        });

        await mixpanel.people.increment(sBookingNow.uid, {
          nb_attempts_slot_bookings: 1,
        });
      }

      if (
        sBookingNow.status === "SCHEDULED" &&
        sBookingBef.status !== "SCHEDULED"
      ) {
        await mixpanel.track("slot_schedule_server", {
          distinct_id: sBookingNow.uid,
          source: "v1",
        });

        await mixpanel.people.increment(sBookingNow.uid, {
          nb_slot_bookings: 1,
        });
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
