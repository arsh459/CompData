import {writeOne} from '../utils/firestore/fetchOne';
import {TripObjInterface} from '../models/TripObj/Trip';
import {ListingInterface} from '../models/ListingObj/Listing';
import {insertInWindow} from '../routing/moves';
import {InsertRequestInterface} from './interface';
import {covertTripObjToFormat} from '../models/TripObj/Methods';

export const insertInTripInDb = async (
    trip: TripObjInterface, 
    insertRequest: InsertRequestInterface,
    allTasks: {[name: string]: ListingInterface},
    ) => {

    let plan = trip.trip;
    plan = insertInWindow(trip, insertRequest.windowId, insertRequest.taskId,
        insertRequest.listingId, allTasks, insertRequest.variantId, 
        insertRequest.qty, insertRequest.status, insertRequest.index, insertRequest.timeStart, insertRequest.timeEnd);

    // console.log('plan', plan);

    // update trip
    trip.trip = plan;
    const tmp = covertTripObjToFormat(trip);
    
    // add ISO converted trip
    await writeOne('trips', trip.tripId, tmp);

    return trip
}




