import {
  AppointmentInterface,
  formatUnixTimestampByTime,
} from "@modules/DoctorFormMain/utils";

export const getPrimarySecondaryText = (appointment?: AppointmentInterface) => {
  if (appointment?.status === "SCHEDULED") {
    return {
      main: "Your appointment is scheduled for",
      primary: formatUnixTimestampByTime(appointment?.startSlot),
    };
  } else if (appointment?.status === "DONE") {
    return {
      main: `Your appointment scheduled for ${formatUnixTimestampByTime(
        appointment?.startSlot
      )} is`,
      primary: "done",
    };
  } else {
    return {
      main: `Your appointment scheduled for ${formatUnixTimestampByTime(
        appointment?.startSlot
      )} is`,
      primary: "cancelled",
    };
  }
};
export const getColorsByAppointmentStatus = (
  appointment?: AppointmentInterface
) => {
  if (!appointment?.status) {
    return {
      textColor: `#FF5190`,
      borderColor: "#FF5190",
      cardColor: "#FDC1DD",
    };
  }
  if (appointment?.status === "SCHEDULED") {
    return {
      textColor: `#51A1FF`,
      borderColor: `#51A1FF`,
      cardColor: "#282A4E",
    };
  } else if (appointment?.status === "DONE") {
    return {
      textColor: "#51FF8C",
      borderColor: "#51FF8C",
      cardColor: "#293B40",
    };
  } else {
    return {
      textColor: `#FF5190`,
      borderColor: "#FF5190",
      cardColor: "#3D2640",
    };
  }
};
