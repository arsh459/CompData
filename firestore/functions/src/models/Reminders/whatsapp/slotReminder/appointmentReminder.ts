import {
  nishaUID,
  toChetnaPhone,
  toJaytiPhone,
  toNishaPhone,
  toSauravPhone,
} from "../../../../constants/email/contacts";
import { getUserTimezone } from "../../../../main/Https/taskGenerator/generateReminders";
import { waTemplateNames } from "../../../../main/PubSub/notifications/constants";
import { getAppointmentDoc } from "../../../Appointments/getUtils";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
import { getUserById } from "../../../User/Methods";
import { getFormattedStringForUserV2 } from "./appointmentConfirmation";

export const handleAppointmentReminder_15 = async (appointmentId: string) => {
  const appDoc = await getAppointmentDoc(appointmentId);

  if (appDoc && appDoc.startSlot && appDoc.endSlot) {
    const user = await getUserById(appDoc.patientId);

    const tz = getUserTimezone(user?.recommendationConfig?.timezone?.tzString);

    const timeString = getFormattedStringForUserV2(
      appDoc.startSlot,
      appDoc.endSlot,
      tz,
      // appDoc.rawString,
    );

    // const st = getFormattedDateForUnix(bookingDoc.startUnix, "hh:mmA");

    const templateId: waTemplateNames = "slot_booking_reminder_v2";
    const agentTemplateId: waTemplateNames = "upcoming_reminder_v2";
    if (user?.phone) {
      try {
        await sendHSMV2(user?.phone, templateId, [
          user?.name ? user.name : "there",
          `*${timeString}*`,
        ]);
      } catch (error) {
        console.log("error in sending message");
      }

      // agent message
      if (appDoc.category === "gynaecologist") {
        await sendHSMV2(
          toSauravPhone,
          agentTemplateId,
          [
            user?.name ? user.name : "there",
            `*${timeString}*`,
            user.phone ? user.phone : "phone NA",
          ],
          { "0": [user.uid] },
          [user.name ? user.name : "New User"],
        );
      } else if (appDoc.category === "health_coach") {
        await sendHSMV2(
          toSauravPhone,
          agentTemplateId,
          [
            user?.name ? user.name : "there",
            `*${timeString}*`,
            user.phone ? user.phone : "phone NA",
          ],
          { "0": [user.uid] },
          [user.name ? user.name : "New User"],
        );
      } else if (appDoc.category === "nutrtitionist") {
        await sendHSMV2(
          toJaytiPhone,
          agentTemplateId,
          [
            user?.name ? user.name : "there",
            `*${timeString}*`,
            user.phone ? user.phone : "phone NA",
          ],
          { "0": [user.uid] },
          [user.name ? user.name : "New User"],
        );
      } else if (appDoc.category === "sales") {
        await sendHSMV2(
          appDoc.doctorId === nishaUID ? toNishaPhone : toChetnaPhone,
          agentTemplateId,
          [
            user?.name ? user.name : "there",
            `*${timeString}*`,
            user.phone ? user.phone : "phone NA",
          ],
          { "0": [user.uid] },
          [user.name ? user.name : "New User"],
        );
      }
    }

    return true;
  }

  return false;
};
