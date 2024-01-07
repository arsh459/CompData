import {selectedLob} from '../ListingDetail/interface';

export interface BookingRequestISO {
  listingId: string;
  listingName: string;
  listingType: selectedLob;
  variantId: string;
  startDate: string;
  endDate: string;
  unixStart: number;
  unixCreationTime: number;
  amount: number;
  requestId: string;
  qty: number;
  image: string;

  name: string;
  phone: string;
  email: string;

  bookingStatus: bookingStatus;
  referrerId: string;
  storeId?: string;
  uid: string;

  tat: number;
  pax: number;
  inclusions: string[];
  exclusions: string[];
  subcategory: string;
  rating: number;
  num_reviews: number;
  variantPrice: number;
}

export interface BookingSnippet {
  listingId: string;
  listingName: string;
  listingType: selectedLob;
  unixCreationTime: number;

  amount: number;
  startDate: string;
  endDate: string;
  pax: number;
}

export type bookingStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PAID'
  | 'CANCELLED'
  | 'CONFIRMED'
  | 'REFUND_DUE'
  | 'REFUNDED';
