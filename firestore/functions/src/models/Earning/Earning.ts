export interface Earning {
  createdOn: number;
  earningType: "VIEW" | "LISTING_BOOKING" | "TRIP_BOOKING";
  value: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED";
  action: "CREDIT" | "DEBIT";
  image?: string;
  bookingId: string;
  title: string;
  body: string;
  earningId: string;
  commissionRate: number;
}
