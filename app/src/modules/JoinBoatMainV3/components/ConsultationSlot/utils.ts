import axios from "axios";
// import { endOfDay, startOfDay } from "date-fns";
import { BACKEND_URL } from "react-native-dotenv";
import { AvailabilityResponse, ZohoSlot } from "./store/interface";
import { CategoryTypes } from "@modules/Appointments/constants";
import crashlytics from "@react-native-firebase/crashlytics";

export const fetchAvailableSlots = async (unixSt: number, unixEn: number) => {
  try {
    const body = {
      start: unixSt,
      end: unixEn, // endOfDay(unix).getTime(),
    };

    const response = await axios({
      url: `${BACKEND_URL}/zohoAvailability`,
      method: "POST",
      params: body,
      data: body,
    });
    if (response.data) {
      return response.data as AvailabilityResponse;
    }
  } catch (error: any) {
    console.error("Error:", error);
    crashlytics().recordError(error);
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
      url: `${BACKEND_URL}/makeBooking`,
      method: "POST",
      params: body,
      data: body,
    });

    if (res.data) {
      return res.data.appointmentId as string;
    }
  } catch (error: any) {
    console.error("Error:", error);
    crashlytics().recordError(error);
  }
};
