// import { HSMLocalizableParameters } from "messagebird/types";
// import {
//   toSauravPhone,
//   toSwapnilPhone,
// } from "../../../../constants/email/contacts";
// import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
// import { toSauravPhone } from "../../../../constants/email/contacts";
import { getFormattedDateForUnix } from "../../../../main/PubSub/activityTracker/utils";
// import { sendHSM } from "../../../Conversations/sendHSM";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
import { getSlotBooking } from "../../../slots/getUtils";
import { SlotBooking } from "../../../slots/Slot";
import { getUserById } from "../../../User/Methods";
import { notifyAgent_slotBooking } from "../../pagerDuty/notifyAgents_pager";

export const handleSlotReminder_15 = async (
  slotBookingId: string,
  slotId: string,
) => {
  const bookingDoc = await getSlotBooking(slotBookingId, slotId);

  if (bookingDoc) {
    const user = await getUserById(bookingDoc.uid);

    const { usedString } = getFormattedStringForUser(bookingDoc);

    // const st = getFormattedDateForUnix(bookingDoc.startUnix, "hh:mmA");

    if (user?.phone) {
      try {
        await sendHSMV2(user?.phone, "slot_booking_reminder", [
          user?.name ? user.name : "there",
          `*${usedString}*`,
        ]);
      } catch (error) {}
    }

    return true;
  }

  return false;
};

const getFormattedStringForUser = (bookingDoc: SlotBooking) => {
  const st = getFormattedDateForUnix(bookingDoc.startUnix, "hh:mmA ddd MMM DD");
  const en = getFormattedDateForUnix(bookingDoc.endUnix, "hh:mmA ddd MMM DD");

  const rawStringForUser = bookingDoc.rawString;

  let usedString = `${st}`;
  const rawStringFromUserSplit = rawStringForUser.split("-");
  if (rawStringFromUserSplit.length === 2) {
    usedString = rawStringFromUserSplit[0];
    if (rawStringForUser.includes("Evening")) {
      usedString = usedString.trim() + " pm";
    } else {
      usedString = usedString.trim() + " am";
    }
  }

  if (bookingDoc.version === "calendly") {
    return {
      st,
      en,
      usedString: bookingDoc.rawString,
    };
  }

  return { usedString, st, en };
};

export const handleSlotReminder = async (
  slotBookingId: string,
  slotId: string,
): Promise<boolean> => {
  const bookingDoc = await getSlotBooking(slotBookingId, slotId);

  // console.log("booking doc", bookingDoc);

  if (bookingDoc) {
    const user = await getUserById(bookingDoc.uid);

    const { usedString, st, en } = getFormattedStringForUser(bookingDoc);

    const lk = `https://socialboat.live/admin/slotIds/${slotId}/bookings/${slotBookingId}`;

    if (user?.phone) {
      try {
        await sendHSMV2(user?.phone, "slot_booking_sales_v1", [
          user?.name ? user.name : "there",
          `*${usedString}*`,
        ]);
      } catch (error) {
        console.log("error in sending slot message");
      }
    }

    try {
      await notifyAgent_slotBooking(
        bookingDoc,
        `${st}-${en}`,
        user?.name ? user.name : "un named",
        lk,
        user?.phone ? user.phone : "no phone number",
      );
    } catch (error) {
      console.log("error in sending pager", error);
    }

    // try {
    //   await sendHSMV2(
    //     toSauravPhone,
    //     "slot_booking_agent",
    //     [
    //       user?.name ? user.name : "un named",
    //       `${st}-${en}`,
    //       bookingDoc.rawString ? bookingDoc.rawString : "NA",
    //     ],
    //     {
    //       "0": [lk],
    //     },
    //   );
    // } catch (error) {
    //   console.log("error in whatsapp to agent", error);
    // }

    // try {
    //   await sendHSMV2(
    //     toSwapnilPhone,
    //     "slot_booking_agent",
    //     [
    //       user?.name ? user.name : "un named",
    //       `${st}-${en}`,
    //       bookingDoc.rawString ? bookingDoc.rawString : "NA",
    //     ],
    //     {
    //       "0": [lk],
    //     },
    //   );
    // } catch (error) {}

    return true;
  }

  return false;
};
