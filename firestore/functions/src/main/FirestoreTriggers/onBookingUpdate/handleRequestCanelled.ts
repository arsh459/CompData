import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import {
  getEarningByBookingId,
  createEarning,
} from "../../../models/Earning/Methods";
import { onBookingCancelled } from "../../../models/LeaderBoard/bookingRelated";
import { getInfluencerBookingRequest } from "../../../models/User/influencerBookingRequest";
import * as admin from "firebase-admin";
import { Earning } from "../../../models/Earning/Earning";
import { onInfluencerPurchaseAdminCompleted } from "../utils/sendgrid";
import { getUserById } from "../../../models/User/Methods";
import { createBookingNotification } from "../../../models/Notifications/createNotification";
import { sendNotification } from "../../../models/Notifications/Methods";

export const handleInfluencerBookingCancellation_v2 = async (
  bookingRequestNow: BookingRequestISO,
) => {
  if (bookingRequestNow.storeId) {
    // console.log('storeId', bookingRequestNow.storeId);
    // console.log('requestId', bookingRequestNow.requestId);
    const earning = await getEarningByBookingId(
      bookingRequestNow.requestId,
      bookingRequestNow.storeId,
    );

    if (earning) {
      // console.log('earning', earning);
      await removeBookingEarning(
        bookingRequestNow.storeId,
        earning,
        bookingRequestNow,
      );

      const influencerUser = await getUserById(bookingRequestNow.storeId);

      if (influencerUser) {
        // emails
        await onInfluencerPurchaseAdminCompleted(
          -bookingRequestNow.amount,
          bookingRequestNow.listingName,
          bookingRequestNow.requestId,
          bookingRequestNow.uid,
          bookingRequestNow.name,
          bookingRequestNow.phone,
          bookingRequestNow.storeId,
          influencerUser.name,
          influencerUser.phone,
          influencerUser.email,
          true,
          false,
        );
      }
    }
  }
};

export const removeBookingEarning = async (
  uid: string,
  earning: Earning,
  bookingRequest: BookingRequestISO,
) => {
  const batch = admin.firestore().batch();

  // update values
  batch.update(
    admin.firestore().collection("leaderBoard").doc(`leader-${uid}`),
    {
      earnings2Weeks: admin.firestore.FieldValue.increment(-earning.value),
      earnings1Month: admin.firestore.FieldValue.increment(-earning.value),
      allEarnings: admin.firestore.FieldValue.increment(-earning.value),
    },
  );

  const newEarning = createEarning(
    "LISTING_BOOKING",
    earning.value,
    earning.bookingId,
    "Cancellation request",
    `The booking for ${bookingRequest.listingName} has been cancelled`,
    "DEBIT",
    earning.commissionRate,
    bookingRequest.image,
  );

  batch.set(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("earnings")
      .doc(newEarning.earningId),
    newEarning,
  );

  const notification = createBookingNotification(
    `Amount refunded: ₹${earning.value}`,
    `${bookingRequest.name.trim()} just cancelled ${
      bookingRequest.listingName
    }`,
    "booking",
    bookingRequest.requestId,
    "booking",
    bookingRequest.image,
  );

  batch.set(
    admin
      .firestore()
      .collection(`users`)
      .doc(uid)
      .collection("notifications")
      .doc(),
    notification,
  );

  await batch.commit();
  await sendNotification(uid, notification);
};

export const handleInfluencerBookingCancellation = async (
  bookingRequestNow: BookingRequestISO,
) => {
  if (
    bookingRequestNow.referrerId &&
    bookingRequestNow.storeId &&
    bookingRequestNow.referrerId === bookingRequestNow.storeId
  ) {
    await handleSingleInfluencerBookingCancel(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
  } else if (
    bookingRequestNow.referrerId &&
    bookingRequestNow.storeId &&
    bookingRequestNow.referrerId !== bookingRequestNow.storeId
  ) {
    await handleSingleInfluencerBookingCancel(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
    await handleSingleInfluencerBookingCancel(
      bookingRequestNow.storeId,
      bookingRequestNow,
    );
  } else if (bookingRequestNow.referrerId && !bookingRequestNow.storeId) {
    await handleSingleInfluencerBookingCancel(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
  } else if (!bookingRequestNow.referrerId && bookingRequestNow.storeId) {
    await handleSingleInfluencerBookingCancel(
      bookingRequestNow.storeId,
      bookingRequestNow,
    );
  }
};

const handleSingleInfluencerBookingCancel = async (
  influencerId: string,
  bookingRequestNow: BookingRequestISO,
) => {
  const influencerRequest = await getInfluencerBookingRequest(
    influencerId,
    bookingRequestNow.requestId,
  );

  // if influencer request is present
  if (influencerRequest) {
    await onBookingCancelled(
      influencerId,
      bookingRequestNow.amount,
      influencerRequest.storeVisit,
      influencerRequest.referrerVisit,
      bookingRequestNow.requestId,
    );
  }
};
