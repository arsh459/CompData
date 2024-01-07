import * as t from 'io-ts';
import {MomentFromString} from '../models/CustomTypes/Date';
import * as moment from 'moment';

// type 
const TripRequest = t.type({
    tripId: t.string,
    tripName: t.string,
    tripImage: t.string,
    circuitId: t.string,
    timeStart: MomentFromString,
    timeEnd: MomentFromString,
    tags: t.array(t.string),
    needCircuit: t.boolean,
    uid: t.string
});

const partialTripProps = t.partial({
    // hotel: t.string,
    hotelId: t.string,
    startLat:  t.number,
    startLng: t.number,
    pax: t.number,
});

export const FinalTrip = t.intersection([TripRequest, partialTripProps]);
export type FinalTripType = t.Type<typeof FinalTrip>


// interface 
export interface TripRequestInterface {
    tripId: string,
    tripName: string,
    tripImage: string, 
    hotelId?: string,
    circuitId: string,
    timeStart: moment.Moment,
    timeEnd: moment.Moment,
    // hotel?: string,
    startLat?: number, // if startLat, startLng are present, then override with this for firstDay
    startLng?: number,
    pax?: number,
    tags: string[],
    needCircuit: boolean,
    uid: string
};