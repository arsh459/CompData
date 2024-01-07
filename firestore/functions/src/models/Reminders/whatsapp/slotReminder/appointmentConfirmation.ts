import {
  maitreeUID,
  monaUID,
  nishaUID,
  toChetnaPhone,
  toJaytiPhone,
  toNishaPhone,
  toSauravPhone,
} from "../../../../constants/email/contacts";
import { getUserTimezone } from "../../../../main/Https/taskGenerator/generateReminders";
import { getFormattedDateForUnixWithTZ } from "../../../../main/PubSub/activityTracker/utils";
import { getAppointmentDoc } from "../../../Appointments/getUtils";
import { AppointmentInterface } from "../../../Appointments/interface";
import { getUserById } from "../../../User/Methods";
import { UserInterface } from "../../../User/User";
import {
  handleGenSlotMessage,
  handleGynaeMessage,
  handleHealthCoachMessage,
  handleNutritionistMessage,
  handleSalesConsultation,
} from "./sendUtils";

export const handleAppointmentConfirmation = async (appointmentId: string) => {
  const appDoc = await getAppointmentDoc(appointmentId);
  if (appDoc && appDoc.startSlot && appDoc.endSlot) {
    const user = await getUserById(appDoc.patientId);
    if (user) {
      const tz = getUserTimezone(
        user?.recommendationConfig?.timezone?.tzString,
      );

      const timeString = getFormattedStringForUserV2(
        appDoc.startSlot,
        appDoc.endSlot,
        tz,
        // appDoc.rawString,
      );

      await sendSlotConfirmationMessage(appDoc, timeString, user);

      return true;
    }
  }

  return false;
};

export const getFormattedStringForUserV2 = (
  stUnix: number,
  enUNix: number,
  tz: string,
  // rawStringForUser?: string,
) => {
  // if (rawStringForUser) {
  //   return rawStringForUser;
  // }

  const st = getFormattedDateForUnixWithTZ(stUnix, tz, "Do MMM hh:mm a");
  const en = getFormattedDateForUnixWithTZ(enUNix, tz, "hh:mm a");

  return `${st}-${en}`;
};

const isAgentDoctor = (appDoc: AppointmentInterface) => {
  if (appDoc.doctorId === monaUID || appDoc.doctorId === maitreeUID) {
    return true;
  }

  return false;
};

const sendSlotConfirmationMessage = async (
  appDoc: AppointmentInterface,
  timeString: string,
  user: UserInterface,
) => {
  if (appDoc.category === "gynaecologist" || isAgentDoctor(appDoc)) {
    const doctor = await getUserById(appDoc.doctorId ? appDoc.doctorId : "");
    await handleGynaeMessage(user, timeString, doctor);
  } else if (appDoc.category === "nutrtitionist" && !user.nutritionBadgeId) {
    await handleNutritionistMessage(user, timeString);
  } else if (
    appDoc.category === "health_coach" &&
    !user.templatesSent?.slot_booking_health_v1
  ) {
    await handleHealthCoachMessage(user, timeString);
  } else if (
    appDoc.category === "nutrtitionist" ||
    appDoc.category === "health_coach"
  ) {
    const doctor = await getUserById(appDoc.doctorId ? appDoc.doctorId : "");
    await handleGenSlotMessage(
      user,
      timeString,
      appDoc.category === "health_coach" ? toSauravPhone : toJaytiPhone,
      appDoc.category === "health_coach" && doctor?.name
        ? `Habit Coach - ${doctor?.name}`
        : `Nutritionist - ${doctor?.name}`,
      // doctor,
    );
  } else {
    await handleSalesConsultation(
      user,
      timeString,
      appDoc.doctorId === nishaUID ? toNishaPhone : toChetnaPhone,
    );
  }
};
