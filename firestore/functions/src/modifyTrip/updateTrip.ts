import {writeOne} from '../utils/firestore/fetchOne';
import {TripObjInterface} from '../models/TripObj/Trip';
import {ListingInterface} from '../models/ListingObj/Listing';
// import {deleteFromWindow, insertInWindow} from '../routing/moves';
import {UpdateRequestInterface} from './interface'

export const modifyTripInDb = async (
    trip: TripObjInterface, 
    modifyRequest: UpdateRequestInterface,
    allTasks: {[name: string]: ListingInterface},
    ) => {

    const plan = trip.trip;
    
    // update plan utils

    // update trip
    trip.trip = plan;
    await writeOne('trips', trip.tripId, trip);

    return trip
}




