import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { getAllEarningByBookingId } from "../../../models/Earning/Methods";
import * as admin from "firebase-admin";
import { reconcileEarningForUser } from "../../../models/LeaderBoard/reconcile/earningReconcile";
// import * as functions from "firebase-functions";

export const handleEarningValueUpdate = async (
  bookingRequest: BookingRequestISO,
  bookingRequestPrev: BookingRequestISO
) => {
  if (bookingRequest.storeId) {
    const allEarnings = await getAllEarningByBookingId(
      bookingRequest.requestId,
      bookingRequest.storeId
    );

    // functions.logger.log("allEarnings", allEarnings);

    for (const earn of allEarnings) {
      // functions.logger.log("earning", earn);
      await admin
        .firestore()
        .collection("users")
        .doc(bookingRequest.storeId)
        .collection("earnings")
        .doc(earn.earningId)
        .update({
          value: bookingRequest.amount * earn.commissionRate,
          body: `Booking for ${bookingRequest.listingName} made`,
          image: bookingRequest.image,
        });
    }

    if (shouldReconcile(bookingRequestPrev, bookingRequest)) {
      // functions.logger.log("reconciling");
      await reconcileEarningForUser(bookingRequest.storeId);
    }
  }
};

const shouldReconcile = (prev: BookingRequestISO, now: BookingRequestISO) => {
  if (prev.bookingStatus !== now.bookingStatus) {
    return true;
  }

  if (prev.amount !== now.amount) {
    return true;
  }

  return false;
};

export const isBookingDifferent = (
  prev: BookingRequestISO,
  now: BookingRequestISO
): boolean => {
  if (prev.listingId !== now.listingId) {
    return true;
  }

  if (prev.listingName !== now.listingName) {
    return true;
  }

  if (prev.image !== now.image) {
    return true;
  }

  if (prev.amount !== now.amount) {
    return true;
  }

  if (prev.bookingStatus !== now.bookingStatus) {
    return true;
  }

  return false;
};
