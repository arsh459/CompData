export interface ReferralBookingLedger {
  uid: string;
  phone: string;

  // booking related
  bookingId: string;
  listingName: string;
  bookingValue: number;
  creationTime: number; // unix
  bookingStatus: bookingStatus; //  synced from bookingRequests
  bookingHistory: bookingHistoryInterface[]; // synced from bookingRequests

  // referrer related
  referrerId: string;
  referralType: referralType;
  earningRate: number; // default value
  status: referralStatus; // from dashboard
  referralHistory: referralHistoryInterface[]; // from dashboard
}

export type referralType = "BOOKING" | "ROYALTY";

type bookingStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "CONFIRMED"
  | "REFUND_DUE"
  | "REFUNDED";
interface bookingHistoryInterface {
  status: bookingStatus;
  unixTime: number;
}

type referralStatus = "PENDING" | "VERIFIED" | "CREDITED" | "REJECTED";
interface referralHistoryInterface {
  status: referralStatus;
  unixTime: number;
}
