import { Reminder, TaskState } from "./Reminder";
import { handleTaskState } from "./taskState";
import { dietFormHandler } from "./whatsapp/dietForm/dietFormHandler";
import { optInHandler } from "./whatsapp/optIn/optInHandler";
import { paymentWAHandler } from "./whatsapp/payment/paymentWAHandler";
import { handleAppointmentConfirmation } from "./whatsapp/slotReminder/appointmentConfirmation";
import { handleAppointmentReminder_15 } from "./whatsapp/slotReminder/appointmentReminder";
import {
  handleSlotReminder,
  handleSlotReminder_15,
} from "./whatsapp/slotReminder/handleSlotReminder";
import { handleTryAgain } from "./whatsapp/workoutFinish/handleTicket";
import { handleWorkoutFinishV2 } from "./whatsapp/workoutFinish/handleWorkoutFinishV2";
import { handleWorkoutReminderNotification } from "./workoutReminder/handleWorkoutReminder";
import { handleSummaryNotification } from "./workoutReminder/summaryMessage";
// import { handleSummaryNotification } from "./workoutReminder/summaryMessage";

export const handleRemindersV2 = async (
  reminders: Reminder[],
  successState: TaskState,
  failedState: TaskState,
) => {
  for (const reminder of reminders) {
    if (reminder.templateId === "opt_in_communications" && reminder.authorId) {
      const state = await optInHandler(reminder.authorId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "appointment_booking_confirmation" &&
      reminder.appointmentId
    ) {
      const state = await handleAppointmentConfirmation(reminder.appointmentId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "appointment_booking_reminder" &&
      reminder.appointmentId
    ) {
      const state = await handleAppointmentReminder_15(reminder.appointmentId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "slot_booking_confirmation" &&
      reminder.slotId
    ) {
      const state = await handleSlotReminder(reminder.id, reminder.slotId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "slot_booking_reminder" &&
      reminder.slotId &&
      reminder.slotBookingId
    ) {
      const state = await handleSlotReminder_15(
        reminder.slotBookingId,
        reminder.slotId,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "game_payment" &&
      reminder.paymentId &&
      reminder.authorId
      // reminder.paymentId
    ) {
      console.log(
        "PAYMENT MESSAGE",
        reminder.authorId,
        reminder.parentId,
        reminder.templateId,
      );
      const state = await paymentWAHandler(
        reminder.id,
        reminder.paymentId,
        reminder.authorId,
        // reminder.paymentId,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (reminder.templateId === "post_reply") {
      await handleTaskState(reminder, true, successState, failedState);
    } else if (reminder.templateId === "post_reply_2") {
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "post_workout_finish" &&
      reminder.parentId &&
      reminder.authorId &&
      reminder.activityId
    ) {
      try {
        const state = await handleWorkoutFinishV2(
          //   reminder.parentId,
          reminder.authorId,
          reminder.activityId,
        );

        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in post_workout_finish notification");
      }
    } else if (
      reminder.templateId === "try_again" &&
      reminder.authorId &&
      reminder.activityId
    ) {
      const state = await handleTryAgain(
        reminder.authorId,
        reminder.activityId,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "workout_reminder_notification" &&
      reminder.authorId &&
      reminder.badgeId &&
      typeof reminder.badgeDay === "number"
    ) {
      const state = await handleWorkoutReminderNotification(
        reminder.authorId,
        reminder.badgeId,
        reminder.badgeDay,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "summary_message" &&
      reminder.authorId &&
      reminder.date
    ) {
      const state = await handleSummaryNotification(
        reminder.authorId,
        reminder.date,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "diet_form_filled" &&
      reminder.authorId
    ) {
      const state = await dietFormHandler(reminder.authorId);
      await handleTaskState(reminder, state, successState, failedState);
    } else {
      // resolve reminder
      await handleTaskState(reminder, true, successState, failedState);
    }
  }
};
