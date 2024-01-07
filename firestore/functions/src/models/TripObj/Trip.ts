import * as t from 'io-ts';
import {MomentFromString} from '../../models/CustomTypes/Date';
import * as moment from 'moment';


const operatingWindow = t.type({
    windowId: t.string,
    timeStart: MomentFromString,
    timeEnd: MomentFromString,
})

export const statusDict = t.type({
    requestSent: t.boolean,
    linkSent: t.boolean,
    paymentReceived: t.boolean,
    bookingConfirmed: t.boolean,
})


export const tripElement = t.type({
    timeStart: MomentFromString,
    windowId: t.string,
    timeEnd: MomentFromString,
    listingId: t.string,
    variantId: t.string,
    taskId: t.string,
    qty: t.number,
    status: statusDict,
});

const state_tripStart = t.type({
    lat: t.number,
    lng: t.number,
})

const tripState = t.type({
    starts: t.record(t.string, state_tripStart),
})

// type 
const TripMandatory = t.type({
    tripId: t.string,
    // circuitName: t.string,
    operatingWindows: t.record(t.string, operatingWindow),
    tripName: t.string,
    tripImage: t.string, 
    circuitId: t.string,
    timeStart: MomentFromString,
    timeEnd: MomentFromString,
    tags: t.array(t.string),
    uid: t.string,
    tripState: tripState,
    trip: t.record(t.string, t.array(tripElement)), // indices of windowId
});

const tripPartial = t.partial({
    // hotel: t.string,
    // startLat:  t.number,
    // startLng: t.number,
    sharedWith: t.array(t.string),
    inviteURL: t.string,
    saved: t.boolean,
    hotelId: t.string,
    pax: t.number,
});

export const TripObj = t.intersection([TripMandatory, tripPartial]);
export type TripObjType = t.Type<typeof TripObj>



// interfaces 
export interface TripObjInterface {
    tripId: string,
    tripName: string,
    tripImage: string, 
    operatingWindows: {[windowId: string]: OperatingWindow}, // dictionary of operating windows 
    hotelId?: string,
    circuitId: string,
    timeStart: moment.Moment,
    timeEnd: moment.Moment,
    pax?: number,
    saved?: boolean,
    sharedWith?: string[];
    inviteURL?: string;
    tags: string[],
    uid: string,
    tripState: TripState,
    trip: {[windowId: string]: TripElementInterface[]}, // dictionary of records with indices of operatingWindows
};

export interface TripElementInterface {
    windowId: string,
    timeStart: moment.Moment,
    timeEnd: moment.Moment,
    listingId: string,
    variantId: string,
    taskId: string,
    qty: number,
    status: statusDictInterface,
}

export interface TripElementISOInterface {
    windowId: string,
    timeStart: string,
    timeEnd: string,
    listingId: string,
    variantId: string,
    taskId: string,
    qty: number,
    status: statusDictInterface,
}

export interface OperatingWindow {
    windowId: string,
    timeStart: moment.Moment,
    timeEnd: moment.Moment,
}

export interface OperatingWindowISO {
    windowId: string,
    timeStart: string,
    timeEnd: string,
}

export interface statusDictInterface {
    requestSent: boolean,
    linkSent: boolean,
    paymentReceived: boolean,
    bookingConfirmed: boolean,
}

export interface TripState {
    starts: {[windowId: string] : State_TripStart} // for each window, write start coordinates
}

export interface State_TripStart {
    lat: number,
    lng: number,
    // later, we can add individual operatingWindow parameters here
}