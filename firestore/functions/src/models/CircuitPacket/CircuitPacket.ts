import * as t from 'io-ts';
import {ListingObj, ListingInterface} from '../ListingObj/Listing'

// type 
export const CircuitPacket = t.type({
    // listings: t.array(ListingObj)
    listings: t.record(t.string, ListingObj), // indices of windowId
    circuitId: t.string,
});


// export type CircuitPacketType = t.Type<typeof CircuitPacket>


// interfaces 
export interface CircuitPacketInterface {
    listings: ListingInterface[],
    circuitId: string,
};

export interface InternalCircuitInterface {
    [listingId: string]: ListingInterface,
}
