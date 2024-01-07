import axios from "axios";
import { AvailabilityResponse, ZohoSlot } from "./store/interface";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import {
  slotInterventionInterface,
  slotInterventionTypes,
} from "@models/User/User";
import { db } from "@config/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const fetchAvailableSlots = async (unixSt: number, unixEn: number) => {
  try {
    const body = {
      start: unixSt,
      end: unixEn, // endOfDay(unix).getTime(),
    };

    // console.log("body", body);

    const response = await axios({
      url: `https://asia-south1-holidaying-prod.cloudfunctions.net/zohoAvailability`, // `${process.env.NEXT_PUBLIC_BACKEND_URL}/zohoAvailability`,
      method: "POST",
      params: body,
      data: body,
    });
    if (response.data) {
      return response.data as AvailabilityResponse;
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const makeSlotBooking = async (
  uid: string,
  slot: ZohoSlot,
  appType: CategoryTypes
) => {
  try {
    const body = {
      staffId: slot.staff_id,
      time: slot.timeStart,
      uid,
      appType,
    };

    const res = await axios({
      url: `https://asia-south1-holidaying-prod.cloudfunctions.net/makeBooking`, //`${process.env.NEXT_PUBLIC_BACKEND_URL}/makeBooking`,
      method: "POST",
      params: body,
      data: body,
    });

    if (res.data) {
      return res.data.appointmentId as string;
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const setSltoInterventionObj = async (
  type: slotInterventionTypes | "none",
  uid?: string
) => {
  if (uid) {
    const now = Date.now();

    const appointments = await getDocs(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        where("status", "==", "SCHEDULED"),
        where("startSlot", ">=", Date.now()),
        limit(1)
      )
    );

    const hasApppointment = !!appointments.docs.length;

    const slotIntervention: slotInterventionInterface | "none" =
      hasApppointment || type === "none" ? "none" : { type, lastShown: now };

    await updateDoc(doc(db, "users", uid), { slotIntervention });
    slotIntervention;
  }
};
