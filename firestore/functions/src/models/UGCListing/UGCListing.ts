export type ugcListingStatus =
  | "NEW"
  | "WAITING_REVIEW"
  | "IN_REVIEW"
  | "PUBLISHED";

export interface UGCListing {
  listingName: string;
  listingId: string;
  circuitId?: string;
  ugcListingId: string;
  status: ugcListingStatus;
  address?: string;
  url?: string;
  heading?: string;
  description: string;
  images: string[];
  uid: string;
  timeline?: TimelineElement[];
  saved?: boolean;
  rank?: number;

  phone?: string;
  email?: string;
  insiderTips?: string;

  imageURI?: string;
  name?: string;
  tagline?: string;
  verified?: boolean;

  allFollowers?: number;
}

export interface TimelineElement {
  textLabel: string;
  description: string;
  images: string[];
}

export function isUGCListing(input: UGCListing | {}): input is UGCListing {
  return (input as UGCListing).listingName !== undefined;
}
