import {setOne} from '../../utils/firestore/fetchOne';
import {firestore} from 'firebase-admin';

export const updateBookingEarnings = async (uid: string, amount: number) => {
  await setOne(
    'leaderBoard',
    `leader-${uid}`,
    {
      uid: uid,
      openBookingRequests: firestore.FieldValue.increment(1),
      openBookingRequestValue: firestore.FieldValue.increment(amount),
    },
    true,
  );
};

export const onBookingComplete = async (
  uid: string,
  amount: number,
  earning: number,
  storeVisit: boolean,
  referrerVisit: boolean,
  bookingRequestId: string,
) => {
  const batch = firestore().batch();
  if (storeVisit && referrerVisit) {
    batch.update(firestore().collection('leaderBoard').doc(`leader-${uid}`), {
      uid: uid,
      openStoreBookingRequests: firestore.FieldValue.increment(-1),
      closedBookingRequests: firestore.FieldValue.increment(1),
      openStoreBookingValue: firestore.FieldValue.increment(-amount),
      closedBookingValue: firestore.FieldValue.increment(amount),
      totalRevenue: firestore.FieldValue.increment(amount),
      totalEarning: firestore.FieldValue.increment(earning),
    });

    batch.update(
      firestore()
        .collection('bookingRequestsV2')
        .doc(bookingRequestId)
        .collection('influencerBookingRequests')
        .doc(uid),
      {
        commissionStatus: 'CONFIRMED',
      },
    );

    await batch.commit();
  } else if ((!storeVisit && referrerVisit) || (storeVisit && !referrerVisit)) {
    batch.update(firestore().collection('leaderBoard').doc(`leader-${uid}`), {
      uid: uid,
      openRoyaltyRequests: firestore.FieldValue.increment(-1),
      closedRoyaltyRequests: firestore.FieldValue.increment(1),
      openRoyaltyValue: firestore.FieldValue.increment(-amount),
      closedRoyaltyValue: firestore.FieldValue.increment(amount),
      totalRevenue: firestore.FieldValue.increment(amount),
      totalEarning: firestore.FieldValue.increment(earning),
    });

    batch.update(
      firestore()
        .collection('bookingRequestsV2')
        .doc(bookingRequestId)
        .collection('influencerBookingRequests')
        .doc(uid),
      {
        commissionStatus: 'CONFIRMED',
      },
    );

    await batch.commit();
  }
};

export const onBookingCancelled = async (
  uid: string,
  amount: number,
  storeVisit: boolean,
  referrerVisit: boolean,
  bookingRequestId: string,
) => {
  const batch = firestore().batch();
  if (storeVisit && referrerVisit) {
    batch.update(firestore().collection('leaderBoard').doc(`leader-${uid}`), {
      uid: uid,
      openStoreBookingRequests: firestore.FieldValue.increment(-1),
      closedBookingRequests: firestore.FieldValue.increment(1),
      openStoreBookingValue: firestore.FieldValue.increment(-amount),
    });

    batch.update(
      firestore()
        .collection('bookingRequestsV2')
        .doc(bookingRequestId)
        .collection('influencerBookingRequests')
        .doc(uid),
      {
        commissionStatus: 'BOOKING_CANCELLED',
      },
    );

    await batch.commit();
  } else if ((!storeVisit && referrerVisit) || (storeVisit && !referrerVisit)) {
    batch.update(firestore().collection('leaderBoard').doc(`leader-${uid}`), {
      uid: uid,
      openRoyaltyRequests: firestore.FieldValue.increment(-1),
      closedRoyaltyRequests: firestore.FieldValue.increment(1),
      openRoyaltyValue: firestore.FieldValue.increment(-amount),
    });

    batch.update(
      firestore()
        .collection('bookingRequestsV2')
        .doc(bookingRequestId)
        .collection('influencerBookingRequests')
        .doc(uid),
      {
        commissionStatus: 'BOOKING_CANCELLED',
      },
    );

    await batch.commit();
  }
};
