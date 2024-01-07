import {writeOne} from '../utils/firestore/fetchOne';
import {TripObjInterface} from '../models/TripObj/Trip';
import {deleteFromWindow} from '../routing/moves';
import {DeleteRequestInterface} from './interface';
import {covertTripObjToFormat} from '../models/TripObj/Methods';

export const deleteInTripInDb = async (
    trip: TripObjInterface, 
    deleteRequest: DeleteRequestInterface,
    ) => {

    let plan = trip.trip;
    plan = deleteFromWindow(trip, deleteRequest.windowId, deleteRequest.taskId);

    trip.trip = plan;
    const tmp = covertTripObjToFormat(trip);

    await writeOne('trips', trip.tripId, tmp);

    return trip
}




