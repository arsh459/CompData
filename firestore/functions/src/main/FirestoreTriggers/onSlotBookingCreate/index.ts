import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import {
  createReminder,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { SlotBooking } from "../../../models/slots/Slot";

export const onSlotBookingCreateFunc = functions
  .region("asia-south1")
  .firestore.document("slots/{slotId}/slotBooking/{slotBookingId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onSlotBookingWriteFunc")
      ) {
        return;
      }

      const sBooking = change.data() as SlotBooking;
      // const sBookingPrev = change.before.data() as SlotBooking;
      const sId = context.params.slotId;

      if (sBooking) {
        await saveReminderInDB(
          createReminder(
            true,
            "slot_booking_confirmation",
            undefined,
            Date.now(),
            undefined,
            undefined,
            undefined,
            sBooking.uid,
            undefined,
            sBooking.id,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            sId,
          ),
        );

        // add reminder if needed
        const now = Date.now();
        const timeDiffInMinutes = (sBooking.startUnix - now) / (1000 * 60);
        if (timeDiffInMinutes > 60) {
          await saveReminderInDB(
            createReminder(
              true,
              "slot_booking_reminder",
              undefined,
              sBooking.startUnix - 10 * 60 * 1000,
              undefined,
              undefined,
              undefined,
              sBooking.uid,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              sId,
              sBooking.id,
            ),
          );
        }

        // update if slot booked
        // if (!sBookingPrev) {
        // await addSlotBooking(sBooking.uid);
        // }
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
