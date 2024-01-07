import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { setOne } from "../../../utils/firestore/fetchOne";
import { firestore } from "firebase-admin";
import { onBookingRequestEmail } from "../utils/sendgrid";
import { handleInfluencerBookingRequest_v2 } from "./handleInfluencerBookingRequest";

export const onBookingCreateFunc = functions
  .region("asia-south1")
  .firestore.document("bookingRequestsV2/{requestId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onBookingCreate")) {
        return;
      }

      const bookingRequest = change.data() as BookingRequestISO;

      // send email
      await onBookingRequestEmail(bookingRequest);

      // update booking count
      await setOne(
        "users",
        bookingRequest.uid,
        {
          bookings: firestore.FieldValue.increment(1),
        },
        true
      );

      await handleInfluencerBookingRequest_v2(bookingRequest);
    } catch (error) {
      console.log("error", error);
    }
  });
