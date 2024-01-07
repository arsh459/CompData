import { selectedLob } from "../../../models/ListingDetail/interface";

export interface listingLinkRequest {
  listingId: string;
  listingType: selectedLob;
  listingName: string;
  listingDescription: string;
  imageURI: string;
  uid?: string;
  userType?: string;
  variantId?: string;
  qty?: number;
  startDate?: string;
  endDate?: string;
}
