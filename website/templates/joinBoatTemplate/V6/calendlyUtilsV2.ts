import axios from "axios";
import {
  InternalCalendlyResponse,
  getDoctorId,
  mansiUID,
  nishaUID,
  sauravUID,
} from "./utils";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { format } from "date-fns";

export const internalMeetingDetailsV2 = async (
  link: string,
  uid: string,
  type: CategoryTypes,
  appId: string
) => {
  const uuidList = link.split("https://api.calendly.com/scheduled_events/");

  // console.log("uuid", uuidList);

  if (uuidList.length === 2) {
    const response = await axios({
      url: "/api/calendly/meetingDetailsV2",
      method: "POST",
      params: {
        uid,
        uuid: uuidList[1],
        type,
        appointmentId: appId,
      },
    });

    const respData = response.data as InternalCalendlyResponse;
    return respData;
  }

  return undefined;
};

const getAgentId = (type: CategoryTypes, time: number) => {
  if (type === "gynaecologist") {
    return getDoctorId(time);
  } else if (type === "health_coach") {
    return sauravUID;
  } else if (type === "nutrtitionist") {
    return mansiUID;
  } else {
    return nishaUID;
  }
};

export const updateAppointmentStatus = async (
  id: string,
  type: CategoryTypes,
  calendlyResponse: InternalCalendlyResponse
) => {
  // get doctorId
  // slotStart
  // slotEnd
  // link

  if (
    calendlyResponse.startUnix &&
    calendlyResponse.endUnix &&
    typeof calendlyResponse.link === "string"
  ) {
    const agentId = getAgentId(type, calendlyResponse.startUnix);
    await updateDoc(doc(db, "appointments", id), {
      doctorId: agentId,
      link: calendlyResponse.link,
      startSlot: calendlyResponse.startUnix,
      endSlot: calendlyResponse.endUnix,
      status: "SCHEDULED",
      rawString: `${format(
        new Date(calendlyResponse.startUnix),
        "eee hh:mm a"
      )}-${format(new Date(calendlyResponse.endUnix), "hh:mm a")}`,
    });
  } else {
    await failAppointment(id);
  }

  //   await updateDoc(doc(db, "calendly", id), { status });
};

export const failAppointment = async (id: string) => {
  await updateDoc(doc(db, "appointments", id), { status: "FAILED" });
};
