import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import {
  mansiUID,
  sauravUID,
  nishaUID,
  maitreeUID,
  monaUID,
} from "@templates/joinBoatTemplate/V6/utils";

export const getAgentIdServer = (type: CategoryTypes, time: number) => {
  if (type === "gynaecologist") {
    return getDoctorIdServer(time);
  } else if (type === "health_coach") {
    return sauravUID;
  } else if (type === "nutrtitionist") {
    return mansiUID;
  } else {
    return nishaUID;
  }
};

export const getDoctorIdServer = (start: number) => {
  console.log("start", start);
  const [hour, _] = convertUnixToISTServer(start);
  console.log("hour", hour);
  if (hour > 16) {
    return maitreeUID;
  } else {
    return monaUID;
  }
};

export function convertUnixToISTServer(unixTimestamp: number) {
  // Convert the Unix timestamp to milliseconds
  let date = new Date(unixTimestamp);

  // Define offset for IST (Indian Standard Time is UTC+5:30)
  let offsetIST = 330; // in minutes
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;

  // Convert the Date object to IST in milliseconds
  let istTime = localTime + localOffset + offsetIST * 60000;

  // Create new Date object for IST
  let istDate = new Date(istTime);

  // Extract hours and minutes as numbers
  let hours = istDate.getHours();
  let minutes = istDate.getMinutes();

  // Return tuple of hours and minutes
  return [hours, minutes];
}
