import {BookingRequestISO, BookingSnippet} from '../BookingRequestISO';

export const createBookingSnippet = (
  booking: BookingRequestISO,
): BookingSnippet => {
  return {
    listingId: booking.listingId,
    listingName: booking.listingName,
    listingType: booking.listingType,
    unixCreationTime: booking.unixCreationTime,

    amount: booking.amount,
    startDate: booking.startDate,
    endDate: booking.endDate,
    pax: booking.pax,
  };
};
