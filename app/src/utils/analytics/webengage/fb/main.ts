import { DeviceStoreData } from "@providers/device/useDeviceStore";
import { STANDARD_FB_EVENTS } from "./interface";
import { AppEventsLogger, AEMReporterIOS } from "react-native-fbsdk-next";
import { createConversionAPIData } from "./create";
import { makeConversionCall } from "./makeConversionCall";
import { flushMixpanel, weEventTrack } from "../userLog";

export const createFBRequest = async (
  event: STANDARD_FB_EVENTS,
  uid: string,
  date: string,
  data: DeviceStoreData,
  appointmentId?: string,
  value?: number,
  currency?: "INR" | "USD"
) => {
  // to ensure data is up to date in Mixpanel
  flushMixpanel();
  console.log("logging FB", event, data, uid);
  // return;
  // console.log("data flushed");

  if (event === "CompleteRegistration") {
    const eventId = `${uid}-${date}`;

    await markFBEvent("CompleteRegistration", eventId);

    const requestData = createConversionAPIData(
      "CompleteRegistration",
      eventId,
      uid,
      data
    );
    await makeConversionCall(requestData);
  } else if (event === "Schedule" && appointmentId) {
    const eventId = appointmentId;

    await markFBEvent("Schedule", eventId);

    const requestData = createConversionAPIData("Schedule", eventId, uid, data);
    await makeConversionCall(requestData);
  } else if (event === "Lead") {
    const eventId = `${uid}-${date}`;

    await markFBEvent("Lead", eventId);

    const requestData = createConversionAPIData("Lead", eventId, uid, data);
    await makeConversionCall(requestData);
  } else if (event === "InitiateCheckout") {
    const eventId = `${uid}-${Date.now()}`;

    await markFBEvent("InitiateCheckout", eventId, value, currency);

    const requestData = createConversionAPIData(
      "InitiateCheckout",
      eventId,
      uid,
      data,
      currency,
      value
    );
    await makeConversionCall(requestData);
  } else if (event === "Purchase") {
    const eventId = `${uid}-${Date.now()}`;

    await markFBEvent("Purchase", eventId, value, currency);

    const requestData = createConversionAPIData(
      "Purchase",
      eventId,
      uid,
      data,
      currency,
      value
    );
    await makeConversionCall(requestData);
  }
};

const markFBEvent = async (
  event: STANDARD_FB_EVENTS,
  eventId: string,
  value?: number,
  currency?: "INR" | "USD"
) => {
  try {
    AppEventsLogger.logEvent(event, {
      [`_eventId`]: eventId,
      [`_eventID`]: eventId,
      eventID: eventId,
      eventId: eventId,
      ...(value ? { value } : {}),
      ...(currency ? { currency } : {}),
    });
    AEMReporterIOS.logAEMEvent(
      event,
      value ? value : 0,
      currency ? currency : undefined,
      {
        [`_eventID`]: eventId,
        [`_eventId`]: eventId,
        eventID: eventId,
        eventId: eventId,
      }
    );

    weEventTrack(`fb_${event}`, {
      event,
      eventId,
      ...(value ? { value } : {}),
      ...(currency ? { currency } : {}),
    });
  } catch (error) {
    weEventTrack(`fbFail_${event}`, {
      event,
      eventId,
      ...(value ? { value } : {}),
      ...(currency ? { currency } : {}),
    });
  }
};
