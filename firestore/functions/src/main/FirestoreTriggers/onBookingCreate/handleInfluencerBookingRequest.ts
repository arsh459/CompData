import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import {
  addInfluencerBookingRequest,
  createInfluencerBookingRequest,
} from "../../../models/User/influencerBookingRequest";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { onLeadTaken } from "../onLeadWrite/Methods";
import {
  onInfluencerPurchase,
  onInfluencerPurchaseAdmin,
} from "../utils/sendgrid";

export const handleInfluencerBookingRequest_v2 = async (
  bookingRequest: BookingRequestISO,
) => {
  // if booking is from store
  if (bookingRequest.storeId) {
    await onLeadTaken(bookingRequest);

    const storeUser = await getUserById(bookingRequest.storeId);

    // influencer email
    if (storeUser && storeUser.email) {
      await onInfluencerPurchase(
        storeUser.email,
        bookingRequest.amount,
        bookingRequest.listingName,
        storeUser.name,
        0.05,
      );
    }

    if (storeUser) {
      // admin email
      await onInfluencerPurchaseAdmin(
        bookingRequest.amount,
        bookingRequest.listingName,
        bookingRequest.requestId,
        bookingRequest.uid,
        bookingRequest.name,
        bookingRequest.phone,
        storeUser.uid,
        storeUser.name,
        storeUser.phone,
        storeUser.email,
        true,
        false,
      );
    }
  }
};

export const handleInfluencerBookingRequest = async (
  bookingRequest: BookingRequestISO,
) => {
  if (
    bookingRequest.referrerId &&
    bookingRequest.referrerId === bookingRequest.storeId
  ) {
    const referrerUser = await getUserById(bookingRequest.referrerId);
    if (referrerUser)
      await handleSingleInfluencerBookingRequest(
        bookingRequest.referrerId,
        referrerUser,
        bookingRequest,
        0.1,
        true,
        true,
      );
  } else if (
    bookingRequest.referrerId &&
    bookingRequest.storeId &&
    bookingRequest.referrerId !== bookingRequest.storeId
  ) {
    const referrerUser = await getUserById(bookingRequest.referrerId);
    if (referrerUser)
      await handleSingleInfluencerBookingRequest(
        bookingRequest.referrerId,
        referrerUser,
        bookingRequest,
        0.02,
        false,
        true,
      );

    const storeUser = await getUserById(bookingRequest.storeId);
    if (storeUser)
      await handleSingleInfluencerBookingRequest(
        bookingRequest.storeId,
        storeUser,
        bookingRequest,
        0.02,
        true,
        false,
      );
  } else if (bookingRequest.referrerId && !bookingRequest.storeId) {
    const referrerUser = await getUserById(bookingRequest.referrerId);
    if (referrerUser)
      await handleSingleInfluencerBookingRequest(
        bookingRequest.referrerId,
        referrerUser,
        bookingRequest,
        0.02,
        false,
        true,
      );
  } else if (!bookingRequest.referrerId && bookingRequest.storeId) {
    const storeUser = await getUserById(bookingRequest.storeId);

    if (storeUser)
      await handleSingleInfluencerBookingRequest(
        bookingRequest.storeId,
        storeUser,
        bookingRequest,
        0.02,
        true,
        false,
      );
  }
};

const handleSingleInfluencerBookingRequest = async (
  influencerId: string,
  influencerUser: UserInterface,
  bookingRequest: BookingRequestISO,
  commissionRate: number,
  storeVisit: boolean,
  referrerVisit: boolean,
) => {
  const influencerBookingRequest = createInfluencerBookingRequest(
    influencerId,
    bookingRequest,
    commissionRate,
    storeVisit,
    referrerVisit,
  );

  // add influencer batch write
  await addInfluencerBookingRequest(bookingRequest, influencerBookingRequest);

  // influencer email
  if (influencerUser.email) {
    await onInfluencerPurchase(
      influencerUser.email,
      bookingRequest.amount,
      bookingRequest.listingName,
      influencerUser.name,
      commissionRate,
    );
  }

  // admin email
  await onInfluencerPurchaseAdmin(
    bookingRequest.amount,
    bookingRequest.listingName,
    bookingRequest.requestId,
    bookingRequest.uid,
    bookingRequest.name,
    bookingRequest.phone,
    influencerUser.uid,
    influencerUser.name,
    influencerUser.phone,
    influencerUser.email,
    storeVisit,
    referrerVisit,
  );
};
