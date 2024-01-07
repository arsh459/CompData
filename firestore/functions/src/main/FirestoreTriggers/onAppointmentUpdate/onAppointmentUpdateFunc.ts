import * as functions from "firebase-functions";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import * as admin from "firebase-admin";
import { AppointmentInterface } from "../../../models/Appointments/interface";
import {
  createReminder,
  deleteReminders,
  getSlotReminderForBookingId,
  saveReminderInDB,
} from "../../../models/Reminders/createUtils";
import { runInventorySync } from "./inventorySync";

export const onAppointmentUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 30 })
  .firestore.document("appointments/{appointmentId}")
  .onWrite(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onAppointmentUpdateFunc")
      ) {
        return;
      }

      const nowApp = change.after.data() as AppointmentInterface;
      const preApp = change.before.data() as AppointmentInterface | undefined;

      // update doctor
      if (
        nowApp.status === "SCHEDULED" &&
        !preApp?.doctorId &&
        nowApp.doctorId &&
        nowApp.patientId
      ) {
        await admin
          .firestore()
          .collection("users")
          .doc(nowApp.patientId)
          .update({
            doctorIds: admin.firestore.FieldValue.arrayUnion(nowApp.doctorId),
          });
      }

      // just got scheduled
      if (
        nowApp.status === "SCHEDULED" &&
        nowApp.startSlot &&
        !preApp?.status
      ) {
        await saveReminderInDB(
          createReminder(
            true,
            "appointment_booking_confirmation",
            undefined,
            Date.now(),
            undefined,
            undefined,
            undefined,
            nowApp.patientId,
            undefined,
            nowApp.id,
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
            nowApp.id,
          ),
        );

        const now = Date.now();
        const timeDiffInMinutes = (nowApp.startSlot - now) / (1000 * 60);
        if (timeDiffInMinutes > 60) {
          await saveReminderInDB(
            createReminder(
              true,
              "appointment_booking_reminder",
              undefined,
              nowApp.startSlot - 10 * 60 * 1000,
              undefined,
              undefined,
              undefined,
              nowApp.patientId,
              undefined,
              `rem-${nowApp.id}`,
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
              nowApp.id,
            ),
          );
        }
      } else if (
        nowApp.status === "CANCELLED" &&
        preApp?.status !== "CANCELLED"
      ) {
        const previousReminders = await getSlotReminderForBookingId(nowApp.id);
        await deleteReminders(previousReminders);
      }

      if (nowApp.patientId) {
        await runInventorySync(nowApp.patientId);
      }

      if (nowApp && !preApp) {
        await mixpanel.track("slot_request_server", {
          distinct_id: nowApp.patientId,
          source: "v2",
        });

        await mixpanel.people.set(nowApp.patientId, {
          attempt_slot_booking: new Date(),
        });

        await mixpanel.people.increment(nowApp.patientId, {
          nb_attempts_slot_bookings: 1,
        });
      }

      if (nowApp.status === "SCHEDULED" && preApp?.status !== "SCHEDULED") {
        await mixpanel.track("slot_schedule_server", {
          distinct_id: nowApp.patientId,
          source: "v2",
        });

        await mixpanel.people.increment(nowApp.patientId, {
          nb_slot_bookings: 1,
        });
      } else if (
        nowApp.status === "CANCELLED" &&
        preApp?.status !== "CANCELLED"
      ) {
        await mixpanel.track("slot_cancelled_server", {
          distinct_id: nowApp.patientId,
          source: "v2",
        });
      } else if (nowApp.status === "FAILED" && preApp?.status !== "FAILED") {
        await mixpanel.track("slot_failed_server", {
          distinct_id: nowApp.patientId,
          source: "v2",
        });

        await mixpanel.people.increment(nowApp.patientId, {
          nb_fail_bookings: 1,
        });
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
