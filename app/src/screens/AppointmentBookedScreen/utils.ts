import { doctorPermission } from "@hooks/appointment/useAppointmentPermission";
import {
  AppointmentInterface,
  formatUnixTimestampByTime,
} from "@modules/DoctorFormMain/utils";
import { postAppointmentNavigation } from "@screens/BookZohoSlot";

export type appointmentSlotStates = "LIVE" | "PAST" | "UPCOMING" | "UNKNOWN";
export type primaryActions =
  | "NONE"
  | "JOIN_LINK"
  | "DOWNLOAD"
  | "HOME"
  | "BACK"
  | "CONTACT_US"
  | "RESCHEDULE";

const getAppointmentState = (
  appointment?: AppointmentInterface
): appointmentSlotStates => {
  const now = Date.now();
  if (appointment?.startSlot && appointment.endSlot) {
    if (appointment.startSlot < now && appointment.endSlot > now) {
      return "LIVE";
    } else if (appointment.startSlot > now) {
      return "UPCOMING";
    } else {
      return "PAST";
    }
  }

  return "UNKNOWN";
};

const getDoneState = (appointment?: AppointmentInterface): response => {
  return {
    mainText: `Your appointment for ${formatUnixTimestampByTime(
      appointment?.startSlot
    )} was`,
    primaryText: "completed",
    primaryButton: appointment?.prescription ? "Download Prescription" : "",
    primaryAction: appointment?.prescription ? "DOWNLOAD" : "NONE",
  };
};

interface response {
  mainText: string;
  primaryText: string;
  primaryButton: string;
  primaryAction: primaryActions | postAppointmentNavigation;
}

export const handleSlotStrings = (
  appointment?: AppointmentInterface,
  docStatus?: doctorPermission,
  // goBack?: boolean
  navTo?: postAppointmentNavigation
): response => {
  if (appointment?.status === "DONE") {
    return getDoneState(appointment);
  } else if (appointment?.status === "SCHEDULED") {
    const st = getAppointmentState(appointment);
    if (st === "LIVE") {
      return {
        mainText: "Your appointment is blocked",
        primaryText: `for ${formatUnixTimestampByTime(appointment.startSlot)}`,
        primaryButton: appointment.link ? "Join Consultation" : "Contact Us",
        primaryAction: appointment.link ? "JOIN_LINK" : "CONTACT_US",
      };
    } else if (st === "PAST") {
      return getDoneState(appointment);
    } else if (st === "UPCOMING") {
      return {
        mainText: "Your appointment is blocked",
        primaryText: `for ${formatUnixTimestampByTime(appointment.startSlot)}`,
        primaryButton: "Done",
        primaryAction: navTo ? navTo : "BACK", // goBack ? "BACK" : "HOME",
      };
    } else if (docStatus === "ALLOWED") {
      return {
        mainText: `Your appointment for ${formatUnixTimestampByTime(
          appointment.startSlot
        )}`,
        primaryText: "could not be found",
        primaryButton: "Re Schedule Appointment",
        primaryAction: "RESCHEDULE",
      };
    } else {
      return {
        mainText: `Your appointment for ${formatUnixTimestampByTime(
          appointment.startSlot
        )}`,
        primaryText: "could not be found",
        primaryButton: "",
        primaryAction: "NONE",
      };
    }
  } else if (docStatus === "ALLOWED") {
    return {
      mainText: `Your appointment for ${formatUnixTimestampByTime(
        appointment?.startSlot
      )} was`,
      primaryText: "cancelled",
      primaryButton: "Re Schedule Appointment",
      primaryAction: "RESCHEDULE",
    };
  } else {
    return {
      mainText: `Your appointment for ${formatUnixTimestampByTime(
        appointment?.startSlot
      )} was`,
      primaryText: "cancelled",
      primaryButton: "",
      primaryAction: "NONE",
    };
  }
};
