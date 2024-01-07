import {TripObjInterface, statusDictInterface} from '../models/TripObj/Trip';
import {ListingInterface} from '../models/ListingObj/Listing'
import { getTravelTime, getTat } from '../models/ListingObj/Methods';
import { getCurrentTripState } from '../models/TripObj/Methods';
import * as moment from 'moment';


export const insertInWindow = (
    trip: TripObjInterface, 
    windowId: string, 
    taskId: string,
    listingId: string,
    allTasks: {[name: string]: ListingInterface},
    variantId: string,
    qty: number,
    status: statusDictInterface,
    index?: number, 
    timeStart?: moment.Moment,
    timeEnd?: moment.Moment) => {

    if (moment.isMoment(timeStart) && moment.isMoment(timeEnd) && index !== undefined){
        return insertAtIndex(trip, windowId, taskId, listingId, variantId, qty, status, index, timeStart, timeEnd)
    }

    // get travelTime to new destination, insert at end
    return inertAtEnd(trip, windowId, taskId, allTasks, listingId, variantId, qty, status)
}

export const deleteFromWindow = (
    trip: TripObjInterface, 
    windowId: string, 
    taskId: string) => {

    return {
        ...trip.trip,
        [windowId]: trip.trip[windowId].filter((item) => item.taskId !== taskId)
    }
}


const inertAtEnd = (
    trip: TripObjInterface, 
    windowId: string, 
    taskId: string,
    allTasks: {[name: string]: ListingInterface}, 
    listingId: string,
    variantId: string,
    qty: number,
    status: statusDictInterface
    ) => {

    // get the required window
    const window = trip.operatingWindows[windowId];
    const currentState = getCurrentTripState(allTasks, trip, window);
    const travelTime = getTravelTime(allTasks[listingId], currentState.lat, currentState.lng, false);
    const tat = getTat(allTasks[listingId], variantId);

    const newTask = {
        windowId: windowId,
        taskId: taskId,
        timeStart: moment(currentState.timeStart).add(travelTime, 'minutes'),
        timeEnd: moment(currentState.timeStart).add(travelTime+tat, 'minutes'),
        listingId: listingId,
        variantId: variantId,
        qty: qty, 
        status: status
    }

    // console.log('new task', newTask.timeStart.format());
    // console.log('new task', newTask.timeEnd.format());

    return {
        ...trip.trip,
        [windowId]: [
            ...trip.trip[windowId],
            newTask
        ]
    }
}


const insertAtIndex = (
    trip: TripObjInterface, 
    windowId: string, 
    taskId: string,
    listingId: string,
    variantId: string,
    qty: number,
    status: statusDictInterface,
    index: number,
    timeStart: moment.Moment,
    timeEnd: moment.Moment) => {

    const newTask = {
        windowId: windowId,
        taskId: taskId,
        timeStart: timeStart,
        timeEnd: timeEnd,
        listingId: listingId,
        variantId: variantId,
        qty: qty, 
        status: status
    }

    // console.log('newTask', newTask);
    const tmpArray = [...trip.trip[windowId]];
    // console.log('tmpArray', tmpArray);
    tmpArray.splice(index, 0, newTask);
    // console.log('tmpArray NOW', tmpArray);

    return {
        ...trip.trip,
        [windowId]: tmpArray,
    }

}