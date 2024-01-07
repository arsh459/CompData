import {BookingRequestISO} from '../BookingRequestISO/BookingRequestISO';
import {InfluencerBookingRequest} from './User';
import * as admin from 'firebase-admin';
import {createBookingSnippet} from '../BookingRequestISO/Methods/SnippetUtils';

export const createInfluencerBookingRequest = (
  influencerId: string,
  bookingRequest: BookingRequestISO,
  commissionPercentage: number,
  storeVisit: boolean,
  referrerVisit: boolean,
): InfluencerBookingRequest => {
  return {
    commissionPercentage: commissionPercentage,
    commissionStatus: 'PENDING',
    storeVisit: storeVisit,
    referrerVisit: referrerVisit,
    bookingRequestId: bookingRequest.requestId,
    influencerId: influencerId,
    visitorId: bookingRequest.uid,
    bookingSnippet: createBookingSnippet(bookingRequest),
  };
};

export const getInfluencerBookingRequest = async (
  influencerId: string,
  bookingRequestId: string,
): Promise<InfluencerBookingRequest | undefined> => {
  const remoteRequest = await admin
    .firestore()
    .collection('bookingRequestsV2')
    .doc(bookingRequestId)
    .collection('influencerBookingRequests')
    .doc(influencerId)
    .get();

  if (remoteRequest.exists) {
    return remoteRequest.data() as InfluencerBookingRequest;
  }

  return undefined;
};

export const addInfluencerBookingRequest = async (
  bookingRequest: BookingRequestISO,
  influencerBookingRequest: InfluencerBookingRequest,
) => {
  const batch = admin.firestore().batch();
  // add to batch
  batch.set(
    admin
      .firestore()
      .collection('bookingRequestsV2')
      .doc(influencerBookingRequest.bookingRequestId)
      .collection('influencerBookingRequests')
      .doc(influencerBookingRequest.influencerId),
    influencerBookingRequest,
  );

  if (
    influencerBookingRequest.storeVisit &&
    influencerBookingRequest.referrerVisit
  ) {
    batch.update(
      admin
        .firestore()
        .collection('leaderBoard')
        .doc(`leader-${influencerBookingRequest.influencerId}`),
      {
        uid: influencerBookingRequest.influencerId,
        openStoreBookingRequests: admin.firestore.FieldValue.increment(1),
        openStoreBookingValue: admin.firestore.FieldValue.increment(
          bookingRequest.amount,
        ),
      },
    );
  } else if (
    (influencerBookingRequest.storeVisit &&
      !influencerBookingRequest.referrerVisit) ||
    (!influencerBookingRequest.storeVisit &&
      influencerBookingRequest.referrerVisit)
  ) {
    batch.update(
      admin
        .firestore()
        .collection('leaderBoard')
        .doc(`leader-${influencerBookingRequest.influencerId}`),
      {
        uid: influencerBookingRequest.influencerId,
        openRoyaltyRequests: admin.firestore.FieldValue.increment(1),
        openRoyaltyValue: admin.firestore.FieldValue.increment(
          bookingRequest.amount,
        ),
      },
    );
  }

  await batch.commit();
};
