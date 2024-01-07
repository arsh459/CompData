import { BookingRequestInterface } from "../../sendgrid/bookingRequest/interface";
import { ReferralBookingLedger, referralType } from "./ReferralBookingLedger";
import { writeOne } from "../../utils/firestore/fetchOne";
import { BookingRequestISO } from "../BookingRequestISO/BookingRequestISO";

export const createBookingLedgerEntry = (
  bookingRequest: BookingRequestInterface,
  listingName: string,
  referrerId: string,
  refType: referralType,
  earningRate: number
): ReferralBookingLedger => {
  return {
    uid: bookingRequest.uid,
    phone: bookingRequest.phone,

    bookingId: bookingRequest.requestId,
    listingName: listingName,
    bookingValue: bookingRequest.amount,
    creationTime: bookingRequest.updateStamps.requestSent
      ? new Date(bookingRequest.updateStamps.requestSent).getTime()
      : new Date().getTime(),
    bookingStatus: "PENDING",
    bookingHistory: [],

    referrerId: referrerId,
    referralType: refType,
    earningRate: earningRate,
    status: "PENDING",
    referralHistory: [],
  };
};

export const addBookingLedgerEntry = async (
  bookingRequest: BookingRequestInterface,
  listingName: string,
  referrerId: string,
  refType: referralType,
  earningRate: number
) => {
  const ledgerEntry = createBookingLedgerEntry(
    bookingRequest,
    listingName,
    referrerId,
    refType,
    earningRate
  );
  await writeOne(
    "bookingLedger",
    `refer-${bookingRequest.requestId}`,
    ledgerEntry
  );
};

export const createBookingLedgerEntryV2 = (
  bookingRequest: BookingRequestISO,
  refType: referralType,
  earningRate: number
): ReferralBookingLedger => {
  return {
    uid: bookingRequest.uid,
    phone: bookingRequest.phone,

    bookingId: bookingRequest.requestId,
    listingName: bookingRequest.listingName,
    bookingValue: bookingRequest.amount,
    creationTime: bookingRequest.unixCreationTime
      ? bookingRequest.unixCreationTime
      : new Date().getTime(),
    bookingStatus: "PENDING",
    bookingHistory: [],

    referrerId: bookingRequest.referrerId,
    referralType: refType,
    earningRate: earningRate,
    status: "PENDING",
    referralHistory: [],
  };
};

export const addBookingLedgerEntryV2 = async (
  bookingRequest: BookingRequestISO,
  refType: referralType,
  earningRate: number
) => {
  const ledgerEntry = createBookingLedgerEntryV2(
    bookingRequest,
    refType,
    earningRate
  );
  await writeOne(
    "bookingLedger",
    `refer-${bookingRequest.requestId}`,
    ledgerEntry
  );
};
