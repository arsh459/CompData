import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { handleInfluencerBookingConfirmation_v2 } from "./handleInfluencerBookingUpdate";
import { handleInfluencerBookingCancellation_v2 } from "./handleRequestCanelled";

export const onBookingUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("bookingRequestsV2/{requestId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onBookingUpdateFunc")) {
        return;
      }

      const bookingRequestBefore = change.before.data() as BookingRequestISO;
      const bookingRequestNow = change.after.data() as BookingRequestISO;

      if (
        bookingRequestNow.bookingStatus !==
          bookingRequestBefore.bookingStatus &&
        bookingRequestNow.bookingStatus === "CONFIRMED"
      ) {
        await handleInfluencerBookingConfirmation_v2(bookingRequestNow, 0.05);
      } else if (
        bookingRequestNow.bookingStatus !==
          bookingRequestBefore.bookingStatus &&
        bookingRequestNow.bookingStatus === "CANCELLED"
      ) {
        await handleInfluencerBookingCancellation_v2(bookingRequestNow);
      }
    } catch (error) {
      console.log("error", error);
    }
  });
