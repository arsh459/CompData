// import * as t from 'io-ts';
import {ListingInterface} from '../models/ListingObj/Listing';
import * as moment from 'moment';

/*
const RecommendationComp = t.type({
    listingId: t.string,
    feasible: t.boolean,
    finalScore: t.number
});

const RecommendationPartial = t.partial({
    distanceFromCurrent: t.number, // from homebase to be dep
    travelTime: t.number, // from homebase
    journeyTime: t.number, // from homebase
    tagScore: t.number,
    popularityScore: t.number, 
    userAffinity: t.number,
});

export const RecommendationObj = t.intersection([RecommendationComp, RecommendationPartial]);
export type RecommendationObjType = t.Type<typeof RecommendationObj>
*/

export interface FeasibleSlot {
    slotStart: moment.Moment,
    slotEnd: moment.Moment,
}

export interface FeasibleResponseSlot {
    slotStart: string,
    slotEnd: string,
}


export interface RecommendationInterface {
    listingId: string,
    feasible: boolean,
    finalScore: number
    distanceFromCurrent?: number,
    travelTime?: number,
    journeyTime?: number,
    tagScore?: number,
    popularityScore?: number,
    userAffinity?: number,
    feasibleFromCurrent: boolean,
    windowId: string,
    feasibleSlots: FeasibleSlot[],
}

export interface IndividualRecommendationResponseInterface {
    listingId: string,
    feasible: boolean,
    finalScore: number
    distanceFromCurrent?: number,
    travelTime?: number,
    journeyTime?: number,
    tagScore?: number,
    popularityScore?: number,
    userAffinity?: number,
    feasibleFromCurrent: boolean,
    windowId: string,
    feasibleSlots: FeasibleResponseSlot[],
}

export interface RecommendationResponseInterface {
    // feasibleTasks: RecommendationInterface[],
    // infeasibleTasks: RecommendationInterface[],
    circuitPacket?: {
        [listingId: string]: ListingInterface
    },
    recommendations: {
        [windowId: string]: IndividualRecommendationResponseInterface[],
    }
    
}
