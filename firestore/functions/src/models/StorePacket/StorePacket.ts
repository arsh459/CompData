import { ListingInterface } from "../ListingObj/Listing";

export interface StorePacket {
  listings: ListingPacket;
  circuitIds: CircuitMap;
  uid: string;
}

interface ListingPacket {
  [listingId: string]: ListingInterface;
}

interface CircuitMap {
  [circuitId: string]: boolean;
}
