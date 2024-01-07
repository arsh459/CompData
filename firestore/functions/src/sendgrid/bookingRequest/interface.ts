import * as t from "io-ts";

const StatusType = t.type({
  bookingConfirmed: t.boolean,
  linkSent: t.boolean,
  paymentReceived: t.boolean,
  requestSent: t.boolean,
});

const UpdatedStampsTypePartial = t.partial({
  // hotel: t.string,
  bookingConfirmed: t.string,
  linkSent: t.string,
  paymentReceived: t.string,
  requestSent: t.string,
});

const BookingRequestPartial = t.type({
  requestId: t.string,
  listingType: t.string,
  referrerId: t.string,
});

// type
const BookingRequestMandatory = t.type({
  amount: t.number,
  email: t.string,
  listingId: t.string,
  name: t.string,
  phone: t.string,
  status: StatusType,
  taskId: t.string,
  tripId: t.string,
  uid: t.string,
  updateStamps: UpdatedStampsTypePartial,
});

export const BookingRequest = t.intersection([
  BookingRequestMandatory,
  BookingRequestPartial,
]);

// export type CircuitPacketType = t.Type<typeof CircuitPacket>

// interfaces
export interface BookingRequestInterface {
  requestId: string;
  listingType: string;
  referrerId?: string;
  amount: number;
  email: string;
  listingId: string;
  name: string;
  phone: string;
  status: StatusInterface;
  taskId: string;
  tripId: string;
  uid: string;
  updateStamps: UpdatedStampsInterface;
}

interface StatusInterface {
  bookingConfirmed: boolean;
  linkSent: boolean;
  paymentReceived: boolean;
  requestSent: boolean;
}

interface UpdatedStampsInterface {
  bookingConfirmed?: string;
  linkSent?: string;
  paymentReceived?: string;
  requestSent?: string;
}
