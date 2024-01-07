import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
// import { reconcileEarningForUser } from "../../../models/LeaderBoard/reconcile/earningReconcile";
import {
  handleEarningValueUpdate,
  isBookingDifferent,
} from "./handleValueUpdate";

export const onBookingValueUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("bookingRequestsV2/{requestId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onBookingValueUpdateFunc")
      ) {
        return;
      }

      const bookingRequestBefore = change.before.data() as BookingRequestISO;
      const bookingRequestNow = change.after.data() as BookingRequestISO;

      if (
        isBookingDifferent(bookingRequestBefore, bookingRequestNow) &&
        bookingRequestNow.storeId
      ) {
        await handleEarningValueUpdate(bookingRequestNow, bookingRequestBefore);
      }
    } catch (error) {
      console.log("error", error);
    }
  });
