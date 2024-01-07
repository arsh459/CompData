import * as admin from "firebase-admin";
import { BookingRequestISO } from "../BookingRequestISO";
// import * as functions from "firebase-functions";

export const getUserBookings = async (
  creatorId: string,
  min: number,
  max: number
): Promise<BookingRequestISO[]> => {
  const leads = await admin
    .firestore()
    .collection("bookingRequestsV2")
    .where("storeId", "==", creatorId)
    // .where('createdOn', '>=', min)
    // .where('visitedOn', '<=', max)
    .get();

  // functions.logger.log(leads.docs.length);

  const allLeads: BookingRequestISO[] = [];
  return leads.docs.reduce((acc, item) => {
    // filteration
    if (item.exists) {
      const newBooking = item.data() as BookingRequestISO;

      // functions.logger.log(newBooking.requestId);
      // functions.logger.log(newBooking.unixCreationTime, min, max);

      if (
        newBooking.unixCreationTime >= min &&
        newBooking.unixCreationTime <= max
      ) {
        acc.push(item.data() as BookingRequestISO);
      }
    }

    return acc;
  }, allLeads);
};
