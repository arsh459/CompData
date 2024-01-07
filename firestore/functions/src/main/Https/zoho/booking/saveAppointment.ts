import { format } from "date-fns";
// import {
//   mansiUID,
//   nishaUID,
//   sauravUID,
// } from "../../../../constants/email/contacts";
import { v4 as uuidv4 } from "uuid";
import {
  AppointmentInterface,
  CategoryTypes,
} from "../../../../models/Appointments/interface";
import { zohoBookingSuccessResponse } from "../../../../models/zoho/bookingCall";
import * as admin from "firebase-admin";
import * as moment from "moment-timezone";
import { UserInterface } from "../../../../models/User/User";

// export const getDoctorId = (start: number) => {
//   console.log("start", start);
//   const [hour, _] = convertUnixToIST(start);
//   console.log("hour", hour);
//   if (hour > 16) {
//     return maitreeUID;
//   } else {
//     return monaUID;
//   }
// };

// const getAgentId = (type: CategoryTypes, time: number) => {
//   if (type === "gynaecologist") {
//     return "NA"; // getDoctorId(time);
//   } else if (type === "health_coach") {
//     return sauravUID;
//   } else if (type === "nutrtitionist") {
//     return mansiUID;
//   } else {
//     return nishaUID;
//   }
// };

const getAppointmentData = (resp: zohoBookingSuccessResponse) => {
  if (resp.response?.returnvalue) {
    const st = resp.response.returnvalue.start_time;
    const tz = resp.response.returnvalue.time_zone;

    const momentSt = moment.tz(st, "DD-MMM-YYYY hh:mm:ss", tz);
    const startUnix = momentSt.unix() * 1000;
    // const momentEn = moment.tz(en, "DD-MMM-YYYY hh:mm:ss", tz);

    return {
      startUnix: startUnix,
      endUnix: startUnix + 15 * 60 * 1000,
      lk: resp.response.returnvalue.summary_url
        ? resp.response.returnvalue.summary_url
        : "",
    };
  }
  return {
    startUnix: -1,
    endUnix: -1,
    lk: "",
  };
};

export const updateAppointmentInDb = async (
  user: UserInterface,
  resp: zohoBookingSuccessResponse,
  appType: CategoryTypes,
  agentId: string,
) => {
  const { startUnix, endUnix, lk } = getAppointmentData(resp);

  console.log("startUnix", startUnix);
  console.log("endUnix", endUnix);
  console.log("lk", lk);

  const appId = uuidv4();

  const newAppointment: AppointmentInterface = {
    id: appId,
    name: user.name ? user.name : "",
    patientId: user.uid,
    createdOn: Date.now(),
    chiefComplaints: "",
    category: appType,
    zohoBookingId: resp.response?.returnvalue?.booking_id
      ? resp.response?.returnvalue?.booking_id
      : "",
    zohoStaffId: resp.response?.returnvalue?.staff_id
      ? resp.response?.returnvalue?.staff_id
      : "",
    doctorId: agentId,
    link: lk,
    startSlot: startUnix,
    endSlot: endUnix,
    status: "SCHEDULED",
    rawString: `${format(new Date(startUnix), "eee hh:mm a")}-${format(
      new Date(endUnix),
      "hh:mm a",
    )}`,
  };

  await admin
    .firestore()
    .collection("appointments")
    .doc(appId)
    .set(newAppointment);

  return newAppointment.id;
};
