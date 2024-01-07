/*

import {writeOne} from '../utils/firestore/fetchOne';
import {TripObjInterface} from '../models/TripObj/Trip';
import {ListingInterface} from '../models/ListingObj/Listing';
import {deleteFromWindow, insertInWindow} from '../routing/moves';
import {ModifyRequestInterface} from './interface'

export const modifyTripInDb = async (
    trip: TripObjInterface, 
    modifyRequest: ModifyRequestInterface,
    allTasks: {[name: string]: ListingInterface},
    ) => {

    let plan = trip.trip;
    if (modifyRequest.action === 'add'){
        plan = insertInWindow(trip, modifyRequest.windowId, modifyRequest.taskId,
            modifyRequest.listingId, allTasks, modifyRequest.variantId, 
            modifyRequest.qty, modifyRequest.paid);
    } else if (modifyRequest.action === 'remove'){
        plan = deleteFromWindow(trip, modifyRequest.windowId, modifyRequest.taskId)
    } else if (modifyRequest.action === 'update') {

    } else {
        throw new Error ('Unknown modifyRequest action')
    }

    // update trip
    trip.trip = plan;
    await writeOne('trips', trip.tripId, trip);

    return trip
}

*/




