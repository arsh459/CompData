import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { onBookingComplete } from "../../../models/LeaderBoard/bookingRelated";
import { getInfluencerBookingRequest } from "../../../models/User/influencerBookingRequest";
import { getUserById } from "../../../models/User/Methods";
import * as admin from "firebase-admin";
import { createEarning } from "../../../models/Earning/Methods";

import {
  onInfluencerPurchaseAdminCompleted,
  onInfluencerPurchaseCompleted,
} from "../utils/sendgrid";
import { createBookingNotification } from "../../../models/Notifications/createNotification";
import { sendNotification } from "../../../models/Notifications/Methods";

export const handleInfluencerBookingConfirmation_v2 = async (
  bookingRequestNow: BookingRequestISO,
  commissionPercentage: number,
) => {
  // purchase from store
  if (bookingRequestNow.storeId) {
    await addBookingEarning(
      bookingRequestNow.storeId,
      bookingRequestNow,
      commissionPercentage,
    );

    const influencerUser = await getUserById(bookingRequestNow.storeId);
    // emails
    if (influencerUser)
      await onInfluencerPurchaseAdminCompleted(
        bookingRequestNow.amount,
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

    if (influencerUser && influencerUser.email) {
      await onInfluencerPurchaseCompleted(
        influencerUser.email,
        bookingRequestNow.amount,
        bookingRequestNow.listingName,
        influencerUser.name,
        commissionPercentage,
      );
    }
  }
};

export const addBookingEarning = async (
  uid: string,
  bookingRequest: BookingRequestISO,
  commissionPercentage: number,
) => {
  const batch = admin.firestore().batch();

  // update values
  batch.update(
    admin.firestore().collection("leaderBoard").doc(`leader-${uid}`),
    {
      earnings2Weeks: admin.firestore.FieldValue.increment(
        bookingRequest.amount * commissionPercentage,
      ),
      earnings1Month: admin.firestore.FieldValue.increment(
        bookingRequest.amount * commissionPercentage,
      ),
      allEarnings: admin.firestore.FieldValue.increment(
        bookingRequest.amount * commissionPercentage,
      ),
    },
  );

  const earning = createEarning(
    "LISTING_BOOKING",
    bookingRequest.amount * commissionPercentage,
    bookingRequest.requestId,
    "New booking",
    `Booking for ${bookingRequest.listingName} made`,
    "CREDIT",
    commissionPercentage,
    bookingRequest.image,
  );

  batch.set(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("earnings")
      .doc(earning.earningId),
    earning,
  );

  const notification = createBookingNotification(
    `You earned ₹${Math.round(earning.value)}`,
    `${bookingRequest.name.trim()} just booked ${bookingRequest.listingName}`,
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
      .doc(notification.notificationId),
    notification,
  );

  await batch.commit();
  await sendNotification(uid, notification);
};

export const handleInfluencerBookingConfirmation = async (
  bookingRequestNow: BookingRequestISO,
) => {
  if (
    bookingRequestNow.referrerId &&
    bookingRequestNow.storeId &&
    bookingRequestNow.referrerId === bookingRequestNow.storeId
  ) {
    await handleSingleInfluencerBookingConfirm(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
  } else if (
    bookingRequestNow.referrerId &&
    bookingRequestNow.storeId &&
    bookingRequestNow.referrerId !== bookingRequestNow.storeId
  ) {
    await handleSingleInfluencerBookingConfirm(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
    await handleSingleInfluencerBookingConfirm(
      bookingRequestNow.storeId,
      bookingRequestNow,
    );
  } else if (bookingRequestNow.referrerId && !bookingRequestNow.storeId) {
    await handleSingleInfluencerBookingConfirm(
      bookingRequestNow.referrerId,
      bookingRequestNow,
    );
  } else if (!bookingRequestNow.referrerId && bookingRequestNow.storeId) {
    await handleSingleInfluencerBookingConfirm(
      bookingRequestNow.storeId,
      bookingRequestNow,
    );
  }
};

const handleSingleInfluencerBookingConfirm = async (
  influencerId: string,
  bookingRequestNow: BookingRequestISO,
) => {
  const influencerRequest = await getInfluencerBookingRequest(
    influencerId,
    bookingRequestNow.requestId,
  );

  // if influencer request is present
  if (influencerRequest) {
    const influencerUser = await getUserById(influencerId);

    await onBookingComplete(
      influencerId,
      bookingRequestNow.amount,
      bookingRequestNow.amount * influencerRequest.commissionPercentage,
      influencerRequest.storeVisit,
      influencerRequest.referrerVisit,
      bookingRequestNow.requestId,
    );

    // emails
    if (influencerUser)
      await onInfluencerPurchaseAdminCompleted(
        bookingRequestNow.amount,
        bookingRequestNow.listingName,
        bookingRequestNow.requestId,
        bookingRequestNow.uid,
        bookingRequestNow.name,
        bookingRequestNow.phone,
        influencerId,
        influencerUser.name,
        influencerUser.phone,
        influencerUser.email,
        influencerRequest.storeVisit,
        influencerRequest.referrerVisit,
      );

    if (influencerUser && influencerUser.email) {
      await onInfluencerPurchaseCompleted(
        influencerUser.email,
        bookingRequestNow.amount,
        bookingRequestNow.listingName,
        influencerUser.name,
        influencerRequest.commissionPercentage,
      );
    }
  }
};
