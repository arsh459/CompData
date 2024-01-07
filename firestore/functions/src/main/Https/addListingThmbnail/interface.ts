import { selectedLob } from "../../../models/ListingDetail/interface";

export interface listingThumbnailRequest {
  listingId: string;
  listingType: selectedLob;
}
