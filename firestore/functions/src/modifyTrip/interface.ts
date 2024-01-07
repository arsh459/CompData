import * as t from 'io-ts';
import {MomentFromString} from '../models/CustomTypes/Date';
import * as moment from 'moment';
import {statusDict, statusDictInterface} from '../models/TripObj/Trip';


const InsertRequestMandatory = t.type({
    tripId: t.string,
    uid: t.string,
    listingId: t.string,
    windowId: t.string,
    taskId: t.string,
    qty: t.number,
    variantId: t.string,
    status: statusDict,
});

const InsertRequestPartial = t.partial({
    timeStart: MomentFromString,
    timeEnd: MomentFromString,
    index: t.number,
});

export const InsertRequest = t.intersection([InsertRequestMandatory, InsertRequestPartial]);

export const DeleteRequest = t.type({
    tripId: t.string,
    uid: t.string,
    taskId: t.string,
    windowId: t.string,
});

export const UpdateRequest = t.type({
    tripId: t.string,
    uid: t.string,
    taskId: t.string,
    windowId: t.string,
});

// interface 
export interface InsertRequestInterface {
    tripId: string,
    uid: string,
    listingId: string,
    windowId: string,
    taskId: string,
    qty: number,
    variantId: string,
    status: statusDictInterface,
    index?: number,
    timeStart?: moment.Moment,
    timeEnd?: moment.Moment,
};

export interface DeleteRequestInterface {
    tripId: string,
    uid: string,
    taskId: string,
    windowId: string,
}

export interface UpdateRequestInterface {
    tripId: string,
    uid: string,
    taskId: string,
    windowId: string,
}

